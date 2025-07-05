
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Auth from '@/components/Auth';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import TierList from '@/components/TierList';
import Champions from '@/components/Champions';
import Builds from '@/components/Builds';
import Settings from '@/components/Settings';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, loading } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'tierlist':
        return <TierList />;
      case 'champions':
        return <Champions />;
      case 'builds':
        return <Builds />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-20 border-b flex items-center px-6">
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="flex h-[calc(100vh-80px)]">
          <div className="w-64 border-r p-4 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
          <div className="flex-1 p-6">
            <Skeleton className="h-8 w-64 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-80px)]">
        <div className="w-64 flex-shrink-0">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
