
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Champion {
  id: number;
  name: string;
  champion_key: string;
  role: string;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  win_rate: number;
  pick_rate: number;
  ban_rate: number;
  trend: 'up' | 'down' | 'stable';
  patch_version: string;
  created_at?: string;
  updated_at?: string;
}

export const useChampions = () => {
  return useQuery({
    queryKey: ['champions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('champions')
        .select('*')
        .order('tier', { ascending: true })
        .order('win_rate', { ascending: false });
      
      if (error) throw error;
      return data as Champion[];
    },
  });
};

export const useChampion = (id: number) => {
  return useQuery({
    queryKey: ['champion', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('champions')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Champion;
    },
    enabled: !!id,
  });
};
