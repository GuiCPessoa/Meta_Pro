
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export const useFavoriteBuilds = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: favoriteBuilds, isLoading } = useQuery({
    queryKey: ['favorite-builds', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_favorite_builds')
        .select(`
          id,
          build_id,
          builds (
            id,
            name,
            role,
            items,
            runes,
            win_rate,
            pick_rate,
            tier,
            champions (
              name,
              champion_key
            )
          )
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const addToFavorites = useMutation({
    mutationFn: async (buildId: number) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('user_favorite_builds')
        .insert({ user_id: user.id, build_id: buildId });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite-builds'] });
      toast({
        title: "Build adicionada aos favoritos!",
        description: "A build foi salva na sua lista de favoritos.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao adicionar aos favoritos",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const removeFromFavorites = useMutation({
    mutationFn: async (buildId: number) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('user_favorite_builds')
        .delete()
        .eq('user_id', user.id)
        .eq('build_id', buildId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite-builds'] });
      toast({
        title: "Build removida dos favoritos",
        description: "A build foi removida da sua lista de favoritos.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao remover dos favoritos",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const isFavorite = (buildId: number) => {
    return favoriteBuilds?.some(fav => fav.build_id === buildId) || false;
  };

  return {
    favoriteBuilds,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};
