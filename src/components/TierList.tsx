
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ChampionCard from './ChampionCard';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface Champion {
  id: number;
  name: string;
  role: string;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  win_rate: number;
  pick_rate: number;
  ban_rate: number;
  trend: 'up' | 'down' | 'stable';
  patch_version: string;
}

const TierList = () => {
  const { data: champions, isLoading, error } = useQuery({
    queryKey: ['champions'],
    queryFn: async () => {
      console.log('Fetching champions from Supabase...');
      const { data, error } = await supabase
        .from('champions')
        .select('*')
        .order('tier', { ascending: true })
        .order('win_rate', { ascending: false });
      
      if (error) {
        console.error('Error fetching champions:', error);
        throw error;
      }
      
      console.log('Champions fetched:', data);
      return data as Champion[];
    },
  });

  const groupByTier = (champions: Champion[]) => {
    return champions.reduce((acc, champion) => {
      if (!acc[champion.tier]) {
        acc[champion.tier] = [];
      }
      acc[champion.tier].push(champion);
      return acc;
    }, {} as Record<string, Champion[]>);
  };

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Tier List - Meta Atual</h2>
        <div className="text-center py-8">
          <p className="text-red-500">Erro ao carregar dados dos campeões</p>
          <p className="text-sm text-muted-foreground mt-2">
            Certifique-se de que está autenticado para visualizar os dados
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Tier List - Meta Atual</h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Skeleton className="h-4 w-20" />
            <span>•</span>
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        
        {['S', 'A', 'B', 'C', 'D'].map((tier) => (
          <div key={tier} className="space-y-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-32 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const groupedChampions = champions ? groupByTier(champions) : {};
  const tiers = ['S', 'A', 'B', 'C', 'D'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Tier List - Meta Atual</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Patch 13.24</span>
          <span>•</span>
          <span>Atualizado há 2h</span>
        </div>
      </div>

      {tiers.map((tier) => {
        const championsInTier = groupedChampions[tier] || [];
        if (championsInTier.length === 0) return null;

        return (
          <div key={tier} className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`px-4 py-2 rounded font-bold text-white tier-${tier.toLowerCase()}`}>
                Tier {tier}
              </div>
              <span className="text-muted-foreground">({championsInTier.length} campeões)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {championsInTier.map((champion) => (
                <ChampionCard key={champion.id} {...champion} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TierList;
