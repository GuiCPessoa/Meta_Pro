import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type Matchup = Database['public']['Tables']['matchups']['Row'] & {
  champions: {
    name: string;
    champion_key: string;
  };
};

export const useMatchups = (championId: number) => {
  return useQuery<Matchup[], Error>({
    queryKey: ['matchups', championId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matchups')
        .select('*, champions!matchups_opponent_champion_id_fkey(name, champion_key)')
        .eq('champion_id', championId);

      if (error) throw error;

      return data as Matchup[];
    },
    enabled: !!championId,
  });
};
