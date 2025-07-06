
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Loader2 } from 'lucide-react';
import { useChampions } from '@/hooks/useChampions';
import ChampionCard from './ChampionCard';
import ChampionDetails from './ChampionDetails';
import { Skeleton } from '@/components/ui/skeleton';

const Champions = () => {
  const [selectedChampion, setSelectedChampion] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  
  const { data: champions, isLoading, error } = useChampions();

  const filteredChampions = champions?.filter(champion => {
    const matchesSearch = champion.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || champion.role === roleFilter;
    const matchesTier = tierFilter === 'all' || champion.tier === tierFilter;
    return matchesSearch && matchesRole && matchesTier;
  }) || [];

  if (selectedChampion) {
    return (
      <ChampionDetails
        championId={selectedChampion}
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

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">Erro ao carregar campeões. Tente novamente.</p>
        </div>
      )}

      {/* Champions Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredChampions.map((champion) => (
            <div key={champion.id} onClick={() => setSelectedChampion(champion.id)}>
              <ChampionCard 
                name={champion.name}
                role={champion.role}
                tier={champion.tier}
                winRate={champion.win_rate}
                pickRate={champion.pick_rate}
                banRate={champion.ban_rate}
                trend={champion.trend}
                image={champion.image_url}
              />
            </div>
          ))}
        </div>
      )}

      {!isLoading && !error && filteredChampions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum campeão encontrado com os filtros aplicados.</p>
        </div>
      )}
    </div>
  );
};

export default Champions;
