
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Monitor, Globe, Database, Shield, Loader2 } from 'lucide-react';
import { useUserSettings } from '@/hooks/useUserSettings';
import { Skeleton } from '@/components/ui/skeleton';

const Settings = () => {
  const { 
    settings, 
    isLoading, 
    updateSettings, 
    isUpdating,
    clearCache,
    isClearing,
    syncData,
    isSyncing 
  } = useUserSettings();

  const handleSwitchChange = (key: string, value: boolean) => {
    updateSettings({ [key]: value });
  };

  const handleSelectChange = (key: string, value: string) => {
    updateSettings({ [key]: value });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="bg-card border-border p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <Skeleton className="h-4 w-48 mb-2" />
                    <Skeleton className="h-3 w-64" />
                  </div>
                  <Skeleton className="h-6 w-11 ml-4" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const settingsSections = [
    {
      title: 'Notificações',
      icon: Bell,
      settings: [
        { 
          id: 'notifications_enabled', 
          label: 'Notificações Ativadas', 
          description: 'Receber notificações gerais do aplicativo',
          type: 'switch',
          value: settings?.notifications_enabled ?? true 
        },
        { 
          id: 'patch-updates', 
          label: 'Atualizações de Patch', 
          description: 'Receber notificações sobre mudanças no meta',
          type: 'switch',
          value: true 
        },
        { 
          id: 'meta-shifts', 
          label: 'Mudanças de Meta', 
          description: 'Alertas quando campeões sobem/descem de tier',
          type: 'switch',
          value: true 
        },
      ]
    },
    {
      title: 'Interface',
      icon: Monitor,
      settings: [
        { 
          id: 'overlay_enabled', 
          label: 'Modo Overlay', 
          description: 'Ativar interface flutuante durante o jogo',
          type: 'switch',
          value: settings?.overlay_enabled ?? true 
        },
        { 
          id: 'auto_update_builds', 
          label: 'Recomendações Automáticas', 
          description: 'Sugestões automáticas baseadas no jogo atual',
          type: 'switch',
          value: settings?.auto_update_builds ?? true 
        },
        { 
          id: 'compact-view', 
          label: 'Visualização Compacta', 
          description: 'Interface mais compacta para telas menores',
          type: 'switch',
          value: false 
        },
      ]
    },
    {
      title: 'Região e Dados',
      icon: Globe,
      settings: [
        { 
          id: 'region', 
          label: 'Região', 
          description: 'Região para estatísticas e meta', 
          type: 'select', 
          value: 'BR1' 
        },
        { 
          id: 'rank-filter', 
          label: 'Filtro por Elo', 
          description: 'Filtrar dados por faixa de elo', 
          type: 'select', 
          value: 'ALL' 
        },
        { 
          id: 'patch-version', 
          label: 'Versão do Patch', 
          description: 'Patch para análise de dados', 
          type: 'select', 
          value: '13.24' 
        },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Configurações</h2>
        <p className="text-muted-foreground">
          Personalize sua experiência no MetaCompanion
        </p>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <Card key={sectionIndex} className="bg-card border-border p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{section.title}</h3>
              </div>

              <div className="space-y-4">
                {section.settings.map((setting, settingIndex) => (
                  <div key={settingIndex} className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <Label htmlFor={setting.id} className="text-foreground font-medium">
                        {setting.label}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {setting.description}
                      </p>
                    </div>
                    
                    <div className="ml-4">
                      {setting.type === 'select' ? (
                        <Select 
                          defaultValue={setting.value?.toString()} 
                          onValueChange={(value) => handleSelectChange(setting.id, value)}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {setting.id === 'region' && (
                              <>
                                <SelectItem value="BR1">Brasil</SelectItem>
                                <SelectItem value="NA1">América do Norte</SelectItem>
                                <SelectItem value="EUW1">Europa Oeste</SelectItem>
                                <SelectItem value="KR">Coreia</SelectItem>
                              </>
                            )}
                            {setting.id === 'rank-filter' && (
                              <>
                                <SelectItem value="ALL">Todos</SelectItem>
                                <SelectItem value="IRON_BRONZE">Iron - Bronze</SelectItem>
                                <SelectItem value="SILVER_GOLD">Silver - Gold</SelectItem>
                                <SelectItem value="PLAT_DIAMOND">Plat - Diamond</SelectItem>
                                <SelectItem value="MASTER_PLUS">Master+</SelectItem>
                              </>
                            )}
                            {setting.id === 'patch-version' && (
                              <>
                                <SelectItem value="13.24">Patch 13.24</SelectItem>
                                <SelectItem value="13.23">Patch 13.23</SelectItem>
                                <SelectItem value="13.22">Patch 13.22</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Switch
                          id={setting.id}
                          checked={setting.value}
                          onCheckedChange={(checked) => handleSwitchChange(setting.id, checked)}
                          disabled={isUpdating}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}

        {/* Cache e Dados */}
        <Card className="bg-card border-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Database className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Cache e Dados</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Limpar Cache</p>
                <p className="text-sm text-muted-foreground">Remove dados temporários e força atualização</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => clearCache()}
                disabled={isClearing}
              >
                {isClearing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Limpando...
                  </>
                ) : (
                  'Limpar'
                )}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Sincronizar Dados</p>
                <p className="text-sm text-muted-foreground">Força sincronização com servidores da Riot</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => syncData()}
                disabled={isSyncing}
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sincronizando...
                  </>
                ) : (
                  'Sincronizar'
                )}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-card border-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <Shield className="w-5 h-5 text-destructive" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Privacidade</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                O MetaCompanion não coleta dados pessoais. Todas as estatísticas são baseadas em dados públicos da API da Riot Games.
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Compartilhamento de Dados</p>
                <p className="text-sm text-muted-foreground">Permitir análise anônima para melhorar o serviço</p>
              </div>
              <Switch 
                defaultChecked={false} 
                onCheckedChange={(checked) => handleSwitchChange('data_sharing', checked)}
                disabled={isUpdating}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
