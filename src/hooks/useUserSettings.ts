
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserSettings {
  id: string;
  notifications_enabled: boolean;
  auto_update_builds: boolean;
  preferred_language: string;
  theme: string;
  overlay_enabled: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useUserSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['user-settings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user settings:', error);
        throw error;
      }
      
      return data as UserSettings;
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: Partial<UserSettings>) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('user_settings')
        .update({ ...newSettings, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating user settings:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-settings'] });
      toast({
        title: "Configurações atualizadas",
        description: "Suas configurações foram salvas com sucesso.",
      });
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar suas configurações. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const clearCacheMutation = useMutation({
    mutationFn: async () => {
      // Limpar cache do React Query
      await queryClient.clear();
      
      // Limpar localStorage se necessário
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('supabase') || key.includes('cache'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    },
    onSuccess: () => {
      toast({
        title: "Cache limpo",
        description: "Todos os dados temporários foram removidos.",
      });
      // Recarregar dados essenciais
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast({
        title: "Erro ao limpar cache",
        description: "Não foi possível limpar o cache. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const syncDataMutation = useMutation({
    mutationFn: async () => {
      // Forçar refresh de todos os dados
      await queryClient.invalidateQueries({ queryKey: ['champions'] });
      await queryClient.invalidateQueries({ queryKey: ['builds'] });
      await queryClient.invalidateQueries({ queryKey: ['user-settings'] });
      
      // Refetch dados essenciais
      await queryClient.refetchQueries({ queryKey: ['champions'] });
      await queryClient.refetchQueries({ queryKey: ['builds'] });
    },
    onSuccess: () => {
      toast({
        title: "Dados sincronizados",
        description: "Todos os dados foram atualizados com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro na sincronização",
        description: "Não foi possível sincronizar os dados. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  return {
    settings,
    isLoading,
    error,
    updateSettings: updateSettingsMutation.mutate,
    isUpdating: updateSettingsMutation.isPending,
    clearCache: clearCacheMutation.mutate,
    isClearing: clearCacheMutation.isPending,
    syncData: syncDataMutation.mutate,
    isSyncing: syncDataMutation.isPending,
  };
};
