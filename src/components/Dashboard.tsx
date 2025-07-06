
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Zap, Trophy } from 'lucide-react';
import { useChampions } from '@/hooks/useChampions';
import ChampionCard from './ChampionCard';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { data: champions, isLoading } = useChampions();

  // Pegar os top 3 campeões por tier e win rate
  const topChampions = champions
    ?.filter(c => c.tier === 'S' || c.tier === 'A')
    .sort((a, b) => {
      if (a.tier !== b.tier) {
        return a.tier === 'S' ? -1 : 1;
      }
      return b.win_rate - a.win_rate;
    })
    .slice(0, 3) || [];

  // Calcular estatísticas gerais
  const avgWinRate = champions ? 
    (champions.reduce((sum, c) => sum + c.win_rate, 0) / champions.length).toFixed(1) : '0';
  
  const tierSChampions = champions?.filter(c => c.tier === 'S').length || 0;
  
  const stats = [
    {
      title: 'Meta Score',
      value: '8.7/10',
      change: '+0.3',
      trend: 'up',
      icon: Trophy,
      description: 'Estabilidade do meta atual'
    },
    {
      title: 'Patch Atual',
      value: '14.1',
      change: 'Novo',
      trend: 'up',
      icon: Zap,
      description: 'Versão mais recente'
    },
    {
      title: 'Campeões Tier S',
      value: tierSChampions.toString(),
      change: '+2',
      trend: 'up',
      icon: Users,
      description: 'Picks mais fortes'
    },
    {
      title: 'Win Rate Médio',
      value: `${avgWinRate}%`,
      change: '+1.1%',
      trend: 'up',
      icon: TrendingUp,
      description: 'Média geral dos campeões'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do meta atual do League of Legends - Patch 14.1
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-card border-border p-6 hover:border-primary transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500">{stat.change}</span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">{stat.description}</p>
            </Card>
          );
        })}
      </div>

      {/* Top Champions Section */}
      <Card className="bg-card border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">Top Picks do Meta</h3>
          <span className="text-primary text-sm font-medium">
            Patch 14.1
          </span>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topChampions.map((champion) => (
              <ChampionCard 
                key={champion.id} 
                name={champion.name}
                role={champion.role}
                tier={champion.tier}
                winRate={champion.win_rate}
                pickRate={champion.pick_rate}
                banRate={champion.ban_rate}
                trend={champion.trend}
                image={champion.image_url}
              />
            ))}
          </div>
        )}
      </Card>

      {/* Recent Updates */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Atualizações Recentes</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 bg-secondary/50 rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="text-foreground font-medium">Patch 14.1 Análise</p>
              <p className="text-sm text-muted-foreground">
                Novos dados de campeões atualizados com base no meta atual
              </p>
              <p className="text-xs text-muted-foreground mt-1">Atualizado agora</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-secondary/50 rounded-lg">
            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
            <div>
              <p className="text-foreground font-medium">Sistema de Busca Ativo</p>
              <p className="text-sm text-muted-foreground">
                Agora você pode buscar por qualquer campeão e ver builds, runas e matchups
              </p>
              <p className="text-xs text-muted-foreground mt-1">Recurso adicionado</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
