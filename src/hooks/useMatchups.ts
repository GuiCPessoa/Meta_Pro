
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Matchup {
  id: number;
  champion_id?: number;
  opponent_champion_id?: number;
  win_rate: number;
  difficulty: string;
  tips?: string;
  patch_version: string;
  created_at?: string;
}

export const useMatchups = (championId?: number) => {
  return useQuery({
    queryKey: ['matchups', championId],
    queryFn: async () => {
      let query = supabase
        .from('matchups')
        .select(`
          *,
          opponent:champions!matchups_opponent_champion_id_fkey(name, image_url)
        `)
        .order('win_rate', { ascending: false });
      
      if (championId) {
        query = query.eq('champion_id', championId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
    enabled: !!championId,
  });
};
