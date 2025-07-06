import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ChampionCardProps {
  name: string;
  role: string;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  winRate: number;
  pickRate: number;
  banRate: number;
  trend: 'up' | 'down' | 'stable';
  championKey: string; 
}

const ChampionCard: React.FC<ChampionCardProps> = ({
  name,
  role,
  tier,
  winRate,
  pickRate,
  banRate,
  trend,
  championKey 
}) => {
  const getTierClass = (tier: string) => {
    switch (tier) {
      case 'S': return 'tier-s'; 
      case 'A': return 'tier-a'; 
      case 'B': return 'tier-b'; 
      case 'C': return 'tier-c'; 
      case 'D': return 'tier-d'; 
      default: return 'tier-c';
    }
  };

  return (
    <Card className="bg-card border-border hover:border-primary transition-all duration-300 hover:glow-effect cursor-pointer group">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`px-2 py-1 rounded text-white font-bold text-sm ${getTierClass(tier)}`}>
            {tier}
          </div>
          <div className="flex items-center">
            {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
            {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
          </div>
        </div>
        
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-secondary">
            {championKey ? (
              <img
                src={`/champions/${championKey}.png`} 
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : null}
            <span className={`text-primary font-bold`}> 
              {name[0]}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Win Rate</p>
            <p className="font-semibold text-foreground">{winRate}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Pick Rate</p>
            <p className="font-semibold text-foreground">{pickRate}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Ban Rate</p>
            <p className="font-semibold text-foreground">{banRate}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChampionCard;
