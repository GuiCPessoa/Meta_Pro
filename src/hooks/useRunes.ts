
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Rune {
  id: number;
  name: string;
  rune_key: string;
  tree: string;
  tier: number;
  image_url?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export const useRunes = () => {
  return useQuery({
    queryKey: ['runes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('runes')
        .select('*')
        .order('tree', { ascending: true })
        .order('tier', { ascending: true });
      
      if (error) throw error;
      return data as Rune[];
    },
  });
};

export const useRunesByTree = (tree: string) => {
  return useQuery({
    queryKey: ['runes', tree],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('runes')
        .select('*')
        .eq('tree', tree)
        .order('tier');
      
      if (error) throw error;
      return data as Rune[];
    },
    enabled: !!tree,
  });
};
