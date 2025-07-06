
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Star, TrendingUp, Loader2 } from 'lucide-react';
import { useChampion } from '@/hooks/useChampions';
import { useBuilds } from '@/hooks/useBuilds';
import { useMatchups } from '@/hooks/useMatchups';
import { useItems } from '@/hooks/useItems';
import { useRunes } from '@/hooks/useRunes';
import { Skeleton } from '@/components/ui/skeleton';

interface ChampionDetailsProps {
  championId: number;
  onBack: () => void;
}

const ChampionDetails: React.FC<ChampionDetailsProps> = ({ championId, onBack }) => {
  const { data: champion, isLoading: championLoading } = useChampion(championId);
  const { data: builds, isLoading: buildsLoading } = useBuilds(championId);
  const { data: matchups, isLoading: matchupsLoading } = useMatchups(championId);
  const { data: items } = useItems();
  const { data: runes } = useRunes();

  if (championLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!champion) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <p className="text-muted-foreground">Campeão não encontrado.</p>
        </div>
      </div>
    );
  }

  const getTierClass = (tier: string) => {
    switch (tier) {
      case 'S': return 'bg-tier-s';
      case 'A': return 'bg-tier-a';
      case 'B': return 'bg-tier-b';
      case 'C': return 'bg-tier-c';
      case 'D': return 'bg-tier-d';
      default: return 'bg-tier-c';
    }
  };

  const getItemById = (itemId: number) => {
    return items?.find(item => item.id === itemId);
  };

  const getRuneById = (runeId: number) => {
    return runes?.find(rune => rune.id === runeId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden bg-secondary">
            {champion.image_url ? (
              <img 
                src={champion.image_url} 
                alt={champion.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <span className={`text-primary font-bold text-xl ${champion.image_url ? 'hidden' : ''}`}>
              {champion.name[0]}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{champion.name}</h1>
            <div className="flex items-center space-x-4 mt-1">
              <span className={`px-3 py-1 text-white rounded font-bold ${getTierClass(champion.tier)}`}>
                Tier {champion.tier}
              </span>
              <span className="text-muted-foreground">{champion.role}</span>
              <div className="flex items-center space-x-1">
                {champion.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                {champion.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                <span className={`text-sm ${
                  champion.trend === 'up' ? 'text-green-500' : 
                  champion.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'
                }`}>
                  {champion.trend === 'up' ? '+2.3%' : champion.trend === 'down' ? '-1.8%' : '0%'}
                </span>
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
          {buildsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4">
              {builds?.map((build, index) => (
                <Card key={build.id} className="bg-card border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-bold text-foreground">{build.name}</h3>
                      {build.is_featured && <Star className="w-4 h-4 text-primary" />}
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-green-500">Win Rate: {build.win_rate}%</span>
                      <span className="text-muted-foreground">Pick Rate: {build.pick_rate}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {build.item_ids && build.item_ids.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Items:</p>
                        <div className="flex flex-wrap gap-2">
                          {build.item_ids.map((itemId, itemIndex) => {
                            const item = getItemById(itemId);
                            return (
                              <div key={itemId} className="flex items-center space-x-2 px-3 py-1 bg-secondary text-foreground rounded text-sm">
                                {item?.image_url && (
                                  <img 
                                    src={item.image_url} 
                                    alt={item.name} 
                                    className="w-4 h-4 object-cover rounded"
                                  />
                                )}
                                <span>{itemIndex + 1}. {item?.name || `Item ${itemId}`}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {build.rune_ids && build.rune_ids.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Runas:</p>
                        <div className="flex flex-wrap gap-2">
                          {build.rune_ids.map((runeId) => {
                            const rune = getRuneById(runeId);
                            return (
                              <div key={runeId} className="flex items-center space-x-2 px-2 py-1 bg-primary/20 text-primary rounded text-sm">
                                {rune?.image_url && (
                                  <img 
                                    src={rune.image_url} 
                                    alt={rune.name} 
                                    className="w-3 h-3 object-cover rounded"
                                  />
                                )}
                                <span>{rune?.name || `Runa ${runeId}`}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
              {builds?.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma build encontrada para este campeão.
                </p>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="runes" className="space-y-4">
          <Card className="bg-card border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Configuração de Runas Recomendada</h3>
            {runes && runes.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary mb-3">Precision (Primária)</h4>
                  <div className="space-y-2">
                    {runes.filter(rune => rune.tree === 'Precision').map((rune) => (
                      <div key={rune.id} className={`p-3 rounded flex items-center space-x-2 ${
                        rune.tier === 0 ? 'bg-primary/20' : 'bg-secondary'
                      }`}>
                        {rune.image_url && (
                          <img 
                            src={rune.image_url} 
                            alt={rune.name} 
                            className="w-6 h-6 object-cover rounded"
                          />
                        )}
                        <span className={rune.tier === 0 ? 'font-medium text-primary' : 'text-foreground'}>
                          {rune.name}
                        </span>
                        {rune.tier === 0 && (
                          <span className="text-sm text-muted-foreground ml-2">(Keystone)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-accent mb-3">Inspiration (Secundária)</h4>
                  <div className="space-y-2">
                    {runes.filter(rune => rune.tree === 'Inspiration').map((rune) => (
                      <div key={rune.id} className="p-2 bg-secondary rounded flex items-center space-x-2">
                        {rune.image_url && (
                          <img 
                            src={rune.image_url} 
                            alt={rune.name} 
                            className="w-5 h-5 object-cover rounded"
                          />
                        )}
                        <span className="text-foreground">{rune.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma runa disponível no momento.
              </p>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="matchups" className="space-y-4">
          {matchupsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4">
              {matchups?.map((matchup) => (
                <Card key={matchup.id} className="bg-card border-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
                        {matchup.opponent?.image_url ? (
                          <img 
                            src={matchup.opponent.image_url} 
                            alt={matchup.opponent.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-primary font-bold">
                            {matchup.opponent?.name?.[0] || '?'}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {matchup.opponent?.name || 'Campeão desconhecido'}
                        </h4>
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
                        Win Rate: {matchup.win_rate}%
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
              {matchups?.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum matchup encontrado para este campeão.
                </p>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Estatísticas Gerais</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Win Rate</span>
                  <span className="text-green-500 font-semibold">{champion.win_rate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pick Rate</span>
                  <span className="text-foreground font-semibold">{champion.pick_rate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ban Rate</span>
                  <span className="text-red-500 font-semibold">{champion.ban_rate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Patch Version</span>
                  <span className="text-foreground font-semibold">{champion.patch_version}</span>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Performance por Elo</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Iron - Bronze</span>
                  <span className="text-green-500 font-semibold">{(champion.win_rate + 2.4).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Silver - Gold</span>
                  <span className="text-green-500 font-semibold">{(champion.win_rate + 0.3).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platinum - Diamond</span>
                  <span className="text-green-500 font-semibold">{champion.win_rate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Master+</span>
                  <span className="text-yellow-500 font-semibold">{(champion.win_rate - 2.9).toFixed(1)}%</span>
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
