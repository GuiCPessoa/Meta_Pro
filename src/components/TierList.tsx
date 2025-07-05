
import React from 'react';
import ChampionCard from './ChampionCard';

interface Champion {
  name: string;
  role: string;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  winRate: number;
  pickRate: number;
  banRate: number;
  trend: 'up' | 'down' | 'stable';
}

const TierList = () => {
  const champions: Champion[] = [
    { name: 'Jinx', role: 'ADC', tier: 'S' as const, winRate: 52.8, pickRate: 18.2, banRate: 15.5, trend: 'up' as const },
    { name: 'Graves', role: 'Jungle', tier: 'S' as const, winRate: 51.9, pickRate: 12.4, banRate: 8.3, trend: 'up' as const },
    { name: 'Yasuo', role: 'Mid', tier: 'A' as const, winRate: 49.7, pickRate: 24.1, banRate: 32.8, trend: 'stable' as const },
    { name: 'Thresh', role: 'Support', tier: 'A' as const, winRate: 50.2, pickRate: 15.6, banRate: 12.1, trend: 'down' as const },
    { name: 'Garen', role: 'Top', tier: 'B' as const, winRate: 51.1, pickRate: 8.9, banRate: 3.2, trend: 'up' as const },
    { name: 'Azir', role: 'Mid', tier: 'C' as const, winRate: 47.3, pickRate: 4.1, banRate: 2.8, trend: 'down' as const },
  ];

  const groupBytier = (champions: Champion[]) => {
    return champions.reduce((acc, champion) => {
      if (!acc[champion.tier]) {
        acc[champion.tier] = [];
      }
      acc[champion.tier].push(champion);
      return acc;
    }, {} as Record<string, Champion[]>);
  };

  const groupedChampions = groupBytier(champions);
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
              {championsInTier.map((champion, index) => (
                <ChampionCard key={`${champion.name}-${index}`} {...champion} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TierList;
