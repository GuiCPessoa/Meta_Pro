
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Star, TrendingUp } from 'lucide-react';

interface ChampionDetailsProps {
  championName: string;
  onBack: () => void;
}

const ChampionDetails: React.FC<ChampionDetailsProps> = ({ championName, onBack }) => {
  const builds = [
    {
      name: 'Crit Build (Recomendado)',
      items: ['Kraken Slayer', 'Phantom Dancer', 'Infinity Edge', 'Lord Dominik\'s Regards', 'Guardian Angel'],
      winRate: 54.2,
      pickRate: 68.3,
      keystone: 'Lethal Tempo'
    },
    {
      name: 'Lethality Build',
      items: ['Galeforce', 'Collector', 'Lord Dominik\'s Regards', 'Infinity Edge', 'Bloodthirster'],
      winRate: 51.8,
      pickRate: 22.1,
      keystone: 'Lethal Tempo'
    }
  ];

  const runes = {
    primary: {
      tree: 'Precision',
      keystone: 'Lethal Tempo',
      runes: ['Presence of Mind', 'Legend: Alacrity', 'Cut Down']
    },
    secondary: {
      tree: 'Inspiration',
      runes: ['Magical Footwear', 'Biscuit Delivery']
    }
  };

  const matchups = [
    { champion: 'Caitlyn', difficulty: 'Easy', winRate: 58.2, tips: 'Abuse seu range superior no early game' },
    { champion: 'Draven', difficulty: 'Hard', winRate: 44.1, tips: 'Jogue safe e espere por ganks' },
    { champion: 'Vayne', difficulty: 'Medium', winRate: 52.3, tips: 'Poke early, cuidado com all-ins' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-xl">{championName[0]}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{championName}</h1>
            <div className="flex items-center space-x-4 mt-1">
              <span className="px-3 py-1 bg-tier-s text-white rounded font-bold">Tier S</span>
              <span className="text-muted-foreground">ADC</span>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500 text-sm">+2.3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="builds" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card">
          <TabsTrigger value="builds">Builds</TabsTrigger>
          <TabsTrigger value="runes">Runas</TabsTrigger>
          <TabsTrigger value="matchups">Matchups</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="builds" className="space-y-4">
          <div className="grid gap-4">
            {builds.map((build, index) => (
              <Card key={index} className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-foreground">{build.name}</h3>
                    {index === 0 && <Star className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-green-500">Win Rate: {build.winRate}%</span>
                    <span className="text-muted-foreground">Pick Rate: {build.pickRate}%</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Keystone:</p>
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded text-sm">
                      {build.keystone}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Build Order:</p>
                    <div className="flex flex-wrap gap-2">
                      {build.items.map((item, itemIndex) => (
                        <span key={itemIndex} className="px-3 py-1 bg-secondary text-foreground rounded text-sm">
                          {itemIndex + 1}. {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="runes" className="space-y-4">
          <Card className="bg-card border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Configuração de Runas Recomendada</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-primary mb-3">{runes.primary.tree} (Primária)</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-primary/20 rounded">
                    <span className="font-medium text-primary">{runes.primary.keystone}</span>
                    <span className="text-sm text-muted-foreground ml-2">(Keystone)</span>
                  </div>
                  {runes.primary.runes.map((rune, index) => (
                    <div key={index} className="p-2 bg-secondary rounded">
                      <span className="text-foreground">{rune}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-accent mb-3">{runes.secondary.tree} (Secundária)</h4>
                <div className="space-y-2">
                  {runes.secondary.runes.map((rune, index) => (
                    <div key={index} className="p-2 bg-secondary rounded">
                      <span className="text-foreground">{rune}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="matchups" className="space-y-4">
          <div className="grid gap-4">
            {matchups.map((matchup, index) => (
              <Card key={index} className="bg-card border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">{matchup.champion[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{matchup.champion}</h4>
                      <p className="text-sm text-muted-foreground">{matchup.tips}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      matchup.difficulty === 'Easy' ? 'bg-green-500/20 text-green-500' :
                      matchup.difficulty === 'Hard' ? 'bg-red-500/20 text-red-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {matchup.difficulty}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Win Rate: {matchup.winRate}%
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Estatísticas Gerais</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Win Rate</span>
                  <span className="text-green-500 font-semibold">52.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pick Rate</span>
                  <span className="text-foreground font-semibold">18.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ban Rate</span>
                  <span className="text-red-500 font-semibold">15.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average KDA</span>
                  <span className="text-foreground font-semibold">2.1 / 3.8 / 7.2</span>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Performance por Elo</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Iron - Bronze</span>
                  <span className="text-green-500 font-semibold">55.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Silver - Gold</span>
                  <span className="text-green-500 font-semibold">53.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platinum - Diamond</span>
                  <span className="text-green-500 font-semibold">52.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Master+</span>
                  <span className="text-yellow-500 font-semibold">49.9%</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChampionDetails;
