import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { useChampion } from '@/hooks/useChampions';
import { useBuilds } from '@/hooks/useBuilds';
import { useMatchups } from '@/hooks/useMatchups';

interface ChampionDetailsProps {
  championId: number; 
  onBack: () => void;
}

const ChampionDetails: React.FC<ChampionDetailsProps> = ({ championId, onBack }) => {
  const { data: champion, isLoading: isLoadingChampion, error: championError } = useChampion(championId);
  const { data: builds, isLoading: isLoadingBuilds, error: buildsError } = useBuilds(championId);
  const { data: matchups, isLoading: isLoadingMatchups, error: matchupsError } = useMatchups(championId);

  if (isLoadingChampion || isLoadingBuilds || isLoadingMatchups) {
    return <div>Carregando detalhes do campeão...</div>;
  }

  if (championError || buildsError || matchupsError) {
    return <div>Erro ao carregar detalhes do campeão: {championError?.message || buildsError?.message || matchupsError?.message}</div>;
  }

  if (!champion) {
    return <div>Campeão não encontrado.</div>;
  }

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
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-xl">{champion.name[0]}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{champion.name}</h1>
            <div className="flex items-center space-x-4 mt-1">
              <span className={`px-3 py-1 text-white rounded font-bold ${getTierClass(champion.tier)}`}>{champion.tier}</span>
              <span className="text-muted-foreground">{champion.role}</span>
              <div className="flex items-center space-x-1">
                {champion.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                {champion.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                {champion.trend === 'stable' && <span className="text-muted-foreground text-sm">Estável</span>}
                <span className={`text-sm ${champion.trend === 'up' ? 'text-green-500' : champion.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {champion.trend === 'up' && ' (tendência de alta)'}
                  {champion.trend === 'down' && ' (tendência de baixa)'}
                  {champion.trend === 'stable' && ' (estável)'}
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
          <div className="grid gap-4">
            {builds && builds.length > 0 ? (
              builds.map((build, index) => (
                <Card key={index} className="bg-card border-border p-6">
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
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Keystone:</p>
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-sm">
                        {build.runes?.primary?.keystone || 'N/A'}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Build Order:</p>
                      <div className="flex flex-wrap gap-2">
                        {build.items && build.items.length > 0 ? (
                          build.items.map((item, itemIndex) => (
                            <span key={itemIndex} className="px-3 py-1 bg-secondary text-foreground rounded text-sm">
                              {itemIndex + 1}. {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted-foreground">Nenhum item na build.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">Nenhuma build disponível para este campeão.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="runes" className="space-y-4">
          <Card className="bg-card border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Configuração de Runas Recomendada</h3>
            {builds && builds.length > 0 && builds[0].runes ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary mb-3">{builds[0].runes.primary.tree} (Primária)</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-primary/20 rounded">
                      <span className="font-medium text-primary">{builds[0].runes.primary.keystone}</span>
                      <span className="text-sm text-muted-foreground ml-2">(Keystone)</span>
                    </div>
                    {builds[0].runes.primary.runes.map((rune, index) => (
                      <div key={index} className="p-2 bg-secondary rounded">
                        <span className="text-foreground">{rune}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-accent mb-3">{builds[0].runes.secondary.tree} (Secundária)</h4>
                  <div className="space-y-2">
                    {builds[0].runes.secondary.runes.map((rune, index) => (
                      <div key={index} className="p-2 bg-secondary rounded">
                        <span className="text-foreground">{rune}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Nenhuma configuração de runas disponível.</p>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="matchups" className="space-y-4">
          <div className="grid gap-4">
            {matchups && matchups.length > 0 ? (
              matchups.map((matchup, index) => (
                <Card key={index} className="bg-card border-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold">{matchup.champions.name[0]}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{matchup.champions.name}</h4>
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
              ))
            ) : (
              <p className="text-muted-foreground">Nenhum matchup disponível para este campeão.</p>
            )}
          </div>
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
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Performance por Elo</h3>
              <p className="text-muted-foreground">Dados de performance por elo não disponíveis.</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChampionDetails;
