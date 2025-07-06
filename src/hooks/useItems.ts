
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Item {
  id: number;
  name: string;
  item_key: string;
  image_url?: string;
  description?: string;
  stats?: any;
  cost?: number;
  build_path?: any;
  created_at?: string;
  updated_at?: string;
}

export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Item[];
    },
  });
};

export const useItem = (id: number) => {
  return useQuery({
    queryKey: ['item', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Item;
    },
    enabled: !!id,
  });
};
