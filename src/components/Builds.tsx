
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Star } from 'lucide-react';

const Builds = () => {
  const builds = [
    {
      champion: 'Jinx',
      name: 'Crit Build Meta',
      role: 'ADC',
      items: ['Kraken Slayer', 'Phantom Dancer', 'Infinity Edge', 'Lord Dominik\'s Regards', 'Guardian Angel'],
      runes: ['Lethal Tempo', 'Presence of Mind', 'Legend: Alacrity', 'Cut Down'],
      winRate: 54.2,
      games: 1243,
      tier: 'S',
      lastUpdated: '2h ago',
      featured: true
    },
    {
      champion: 'Graves',
      name: 'Lethality Carry',
      role: 'Jungle',
      items: ['Eclipse', 'Collector', 'Lord Dominik\'s Regards', 'Edge of Night', 'Guardian Angel'],
      runes: ['Dark Harvest', 'Sudden Impact', 'Eyeball Collection', 'Ultimate Hunter'],
      winRate: 52.8,
      games: 987,
      tier: 'S',
      lastUpdated: '4h ago',
      featured: false
    },
    {
      champion: 'Yasuo',
      name: 'Shieldbow Standard',
      role: 'Mid',
      items: ['Immortal Shieldbow', 'Berserker\'s Greaves', 'Infinity Edge', 'Bloodthirster', 'Guardian Angel'],
      runes: ['Lethal Tempo', 'Triumph', 'Legend: Alacrity', 'Last Stand'],
      winRate: 49.7,
      games: 2156,
      tier: 'A',
      lastUpdated: '1h ago',
      featured: false
    },
    {
      champion: 'Thresh',
      name: 'Tank Support',
      role: 'Support',
      items: ['Relic Shield', 'Locket of the Iron Solari', 'Knight\'s Vow', 'Thornmail', 'Gargoyle Stoneplate'],
      runes: ['Aftershock', 'Demolish', 'Bone Plating', 'Unflinching'],
      winRate: 50.2,
      games: 1876,
      tier: 'A',
      lastUpdated: '3h ago',
      featured: false
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S': return 'bg-red-500';
      case 'A': return 'bg-orange-500';
      case 'B': return 'bg-yellow-500';
      case 'C': return 'bg-green-500';
      case 'D': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Builds Recomendadas</h2>
        <p className="text-muted-foreground">
          As melhores builds baseadas no meta atual e estatísticas de alta elo
        </p>
      </div>

      <div className="grid gap-6">
        {builds.map((build, index) => (
          <Card key={index} className={`bg-card border-border p-6 transition-all duration-300 hover:border-primary hover:glow-effect ${build.featured ? 'border-primary/50' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">{build.champion[0]}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-xl font-bold text-foreground">{build.name}</h3>
                    {build.featured && <Star className="w-4 h-4 text-primary fill-current" />}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">{build.champion}</span>
                    <span className="text-muted-foreground">•</span>
                    <Badge variant="outline" className="text-xs">{build.role}</Badge>
                    <Badge className={`${getTierColor(build.tier)} text-white text-xs`}>
                      Tier {build.tier}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 font-semibold">{build.winRate}%</span>
                </div>
                <p className="text-sm text-muted-foreground">{build.games} jogos</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Build Order</h4>
                <div className="flex flex-wrap gap-2">
                  {build.items.map((item, itemIndex) => (
                    <span key={itemIndex} className="px-3 py-1 bg-secondary text-foreground rounded text-sm">
                      {itemIndex + 1}. {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Runas Principais</h4>
                <div className="flex flex-wrap gap-2">
                  {build.runes.map((rune, runeIndex) => (
                    <span key={runeIndex} className={`px-2 py-1 rounded text-sm ${
                      runeIndex === 0 ? 'bg-primary/20 text-primary' : 'bg-secondary/50 text-foreground'
                    }`}>
                      {rune}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Atualizado {build.lastUpdated}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors">
                    Ver Detalhes
                  </button>
                  <button className="px-3 py-1 bg-secondary text-foreground rounded text-sm hover:bg-secondary/80 transition-colors">
                    Copiar Build
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Builds;
