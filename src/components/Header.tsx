
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, Bell, BellOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserSettings } from '@/hooks/useUserSettings';

const Header = () => {
  const { user, signOut } = useAuth();
  const { settings } = useUserSettings();
  
  const handleSignOut = async () => {
    await signOut();
  };

  const getUserInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="h-20 border-b bg-card/50 backdrop-blur-sm px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">MC</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">MetaCompanion</h1>
            <p className="text-xs text-muted-foreground">League of Legends</p>
          </div>
        </div>
        
        <Badge variant="secondary" className="ml-4">
          Patch 14.1
        </Badge>
      </div>

      <div className="flex items-center space-x-4">
        {/* Indicador de notificações */}
        <div className="flex items-center space-x-2">
          {settings?.notifications_enabled ? (
            <Bell className="w-4 h-4 text-primary" />
          ) : (
            <BellOff className="w-4 h-4 text-muted-foreground" />
          )}
        </div>

        {/* Menu do usuário */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.email ? getUserInitials(user.email) : 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">{user?.email}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {settings?.preferred_language === 'pt-BR' ? 'Brasileiro' : 'International'}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
