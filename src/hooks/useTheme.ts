
import { useEffect } from 'react';
import { useUserSettings } from './useUserSettings';

export const useTheme = () => {
  const { settings } = useUserSettings();

  useEffect(() => {
    if (settings?.theme) {
      const root = window.document.documentElement;
      
      // Remove classes de tema existentes
      root.classList.remove('light', 'dark');
      
      // Aplica o tema selecionado
      if (settings.theme === 'light') {
        root.classList.add('light');
      } else {
        root.classList.add('dark');
      }
    }
  }, [settings?.theme]);

  const toggleTheme = () => {
    const currentTheme = settings?.theme || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Esta função será implementada através do useUserSettings
    return newTheme;
  };

  return {
    theme: settings?.theme || 'dark',
    toggleTheme,
  };
};
