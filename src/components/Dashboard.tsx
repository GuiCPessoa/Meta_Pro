
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Zap, Trophy } from 'lucide-react';
import ChampionCard from './ChampionCard';

const Dashboard = () => {
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
      title: 'Patches Analisados',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Zap,
      description: 'Últimos patches monitorados'
    },
    {
      title: 'Jogadores Ativos',
      value: '2.4M',
      change: '+15%',
      trend: 'up',
      icon: Users,
      description: 'Base de dados atual'
    },
    {
      title: 'Win Rate Médio',
      value: '51.2%',
      change: '+1.1%',
      trend: 'up',
      icon: TrendingUp,
      description: 'Média dos top picks'
    }
  ];

  const topChampions = [
    { name: 'Jinx', role: 'ADC', tier: 'S' as const, winRate: 52.8, pickRate: 18.2, banRate: 15.5, trend: 'up' as const },
    { name: 'Graves', role: 'Jungle', tier: 'S' as const, winRate: 51.9, pickRate: 12.4, banRate: 8.3, trend: 'up' as const },
    { name: 'Yasuo', role: 'Mid', tier: 'A' as const, winRate: 49.7, pickRate: 24.1, banRate: 32.8, trend: 'stable' as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do meta atual do League of Legends
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
          <button className="text-primary hover:text-primary/80 text-sm font-medium">
            Ver todos
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topChampions.map((champion, index) => (
            <ChampionCard key={index} {...champion} />
          ))}
        </div>
      </Card>

      {/* Recent Updates */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Atualizações Recentes</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 bg-secondary/50 rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="text-foreground font-medium">Patch 13.24 Análise</p>
              <p className="text-sm text-muted-foreground">
                Jinx recebeu buffs significativos, subindo para Tier S
              </p>
              <p className="text-xs text-muted-foreground mt-1">2 horas atrás</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-secondary/50 rounded-lg">
            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
            <div>
              <p className="text-foreground font-medium">Meta Shift Detectado</p>
              <p className="text-sm text-muted-foreground">
                ADCs estão dominando o bot lane com 54% de win rate médio
              </p>
              <p className="text-xs text-muted-foreground mt-1">5 horas atrás</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
