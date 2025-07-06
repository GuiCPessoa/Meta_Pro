
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Build {
  id: number;
  champion_id: number;
  name: string;
  role: string;
  items: string[];
  runes: string[];
  item_ids?: number[];
  rune_ids?: number[];
  skill_order?: string[];
  win_rate: number;
  pick_rate: number;
  games_played: number;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  is_featured: boolean;
  patch_version: string;
  created_at?: string;
  updated_at?: string;
}

export const useBuilds = (championId?: number) => {
  return useQuery({
    queryKey: ['builds', championId],
    queryFn: async () => {
      let query = supabase
        .from('builds')
        .select('*')
        .order('win_rate', { ascending: false });
      
      if (championId) {
        query = query.eq('champion_id', championId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Build[];
    },
  });
};

export const useFeaturedBuilds = () => {
  return useQuery({
    queryKey: ['featured-builds'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('builds')
        .select('*, champions(name, champion_key)')
        .eq('is_featured', true)
        .order('win_rate', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};
