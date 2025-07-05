
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import ChampionCard from './ChampionCard';
import ChampionDetails from './ChampionDetails';

const Champions = () => {
  const [selectedChampion, setSelectedChampion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');

  const champions = [
    { name: 'Jinx', role: 'ADC', tier: 'S' as const, winRate: 52.8, pickRate: 18.2, banRate: 15.5, trend: 'up' as const },
    { name: 'Graves', role: 'Jungle', tier: 'S' as const, winRate: 51.9, pickRate: 12.4, banRate: 8.3, trend: 'up' as const },
    { name: 'Yasuo', role: 'Mid', tier: 'A' as const, winRate: 49.7, pickRate: 24.1, banRate: 32.8, trend: 'stable' as const },
    { name: 'Thresh', role: 'Support', tier: 'A' as const, winRate: 50.2, pickRate: 15.6, banRate: 12.1, trend: 'down' as const },
    { name: 'Garen', role: 'Top', tier: 'B' as const, winRate: 51.1, pickRate: 8.9, banRate: 3.2, trend: 'up' as const },
    { name: 'Azir', role: 'Mid', tier: 'C' as const, winRate: 47.3, pickRate: 4.1, banRate: 2.8, trend: 'down' as const },
    { name: 'Caitlyn', role: 'ADC', tier: 'A' as const, winRate: 50.8, pickRate: 14.7, banRate: 8.9, trend: 'stable' as const },
    { name: 'Lee Sin', role: 'Jungle', tier: 'B' as const, winRate: 48.6, pickRate: 16.3, banRate: 5.2, trend: 'down' as const },
  ];

  const filteredChampions = champions.filter(champion => {
    const matchesSearch = champion.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || champion.role === roleFilter;
    const matchesTier = tierFilter === 'all' || champion.tier === tierFilter;
    return matchesSearch && matchesRole && matchesTier;
  });

  if (selectedChampion) {
    return (
      <ChampionDetails
        championName={selectedChampion}
        onBack={() => setSelectedChampion(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Guia de Campeões</h2>
        <p className="text-muted-foreground">
          Explore builds, runas e estratégias para todos os campeões
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar campeão..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Todas as funções" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as funções</SelectItem>
            <SelectItem value="Top">Top</SelectItem>
            <SelectItem value="Jungle">Jungle</SelectItem>
            <SelectItem value="Mid">Mid</SelectItem>
            <SelectItem value="ADC">ADC</SelectItem>
            <SelectItem value="Support">Support</SelectItem>
          </SelectContent>
        </Select>

        <Select value={tierFilter} onValueChange={setTierFilter}>
          <SelectTrigger className="w-full sm:w-[120px]">
            <SelectValue placeholder="Todos os tiers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tiers</SelectItem>
            <SelectItem value="S">Tier S</SelectItem>
            <SelectItem value="A">Tier A</SelectItem>
            <SelectItem value="B">Tier B</SelectItem>
            <SelectItem value="C">Tier C</SelectItem>
            <SelectItem value="D">Tier D</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Champions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredChampions.map((champion, index) => (
          <div key={index} onClick={() => setSelectedChampion(champion.name)}>
            <ChampionCard {...champion} />
          </div>
        ))}
      </div>

      {filteredChampions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum campeão encontrado com os filtros aplicados.</p>
        </div>
      )}
    </div>
  );
};

export default Champions;
