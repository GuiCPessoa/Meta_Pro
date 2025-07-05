
-- Criar tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE,
  summoner_name TEXT,
  preferred_role TEXT,
  rank_tier TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Criar tabela de campeões
CREATE TABLE public.champions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  champion_key TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('S', 'A', 'B', 'C', 'D')),
  win_rate DECIMAL(5,2) NOT NULL,
  pick_rate DECIMAL(5,2) NOT NULL,
  ban_rate DECIMAL(5,2) NOT NULL,
  trend TEXT NOT NULL CHECK (trend IN ('up', 'down', 'stable')),
  patch_version TEXT NOT NULL DEFAULT '13.24',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de builds
CREATE TABLE public.builds (
  id SERIAL PRIMARY KEY,
  champion_id INTEGER REFERENCES public.champions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  items JSONB NOT NULL,
  runes JSONB NOT NULL,
  skill_order JSONB,
  win_rate DECIMAL(5,2) NOT NULL,
  pick_rate DECIMAL(5,2) NOT NULL,
  games_played INTEGER DEFAULT 0,
  tier TEXT NOT NULL CHECK (tier IN ('S', 'A', 'B', 'C', 'D')),
  is_featured BOOLEAN DEFAULT FALSE,
  patch_version TEXT NOT NULL DEFAULT '13.24',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de matchups
CREATE TABLE public.matchups (
  id SERIAL PRIMARY KEY,
  champion_id INTEGER REFERENCES public.champions(id) ON DELETE CASCADE,
  opponent_champion_id INTEGER REFERENCES public.champions(id) ON DELETE CASCADE,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  win_rate DECIMAL(5,2) NOT NULL,
  tips TEXT,
  patch_version TEXT NOT NULL DEFAULT '13.24',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(champion_id, opponent_champion_id)
);

-- Criar tabela de builds favoritas dos usuários
CREATE TABLE public.user_favorite_builds (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  build_id INTEGER REFERENCES public.builds(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, build_id)
);

-- Criar tabela de configurações do usuário
CREATE TABLE public.user_settings (
  id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  auto_update_builds BOOLEAN DEFAULT TRUE,
  preferred_language TEXT DEFAULT 'pt-BR',
  theme TEXT DEFAULT 'dark' CHECK (theme IN ('dark', 'light')),
  overlay_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Habilitar RLS (Row Level Security) nas tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.champions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.builds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matchups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorite_builds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para dados públicos (campeões, builds, matchups)
CREATE POLICY "Anyone can view champions" ON public.champions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can view builds" ON public.builds
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can view matchups" ON public.matchups
  FOR SELECT TO authenticated USING (true);

-- Políticas para dados pessoais do usuário
CREATE POLICY "Users can view their own favorite builds" ON public.user_favorite_builds
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorite builds" ON public.user_favorite_builds
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own settings" ON public.user_settings
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own settings" ON public.user_settings
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own settings" ON public.user_settings
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  
  INSERT INTO public.user_settings (id)
  VALUES (new.id);
  
  RETURN new;
END;
$$;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Inserir dados de exemplo para campeões
INSERT INTO public.champions (name, champion_key, role, tier, win_rate, pick_rate, ban_rate, trend) VALUES
('Jinx', 'jinx', 'ADC', 'S', 52.8, 18.2, 15.5, 'up'),
('Graves', 'graves', 'Jungle', 'S', 51.9, 12.4, 8.3, 'up'),
('Yasuo', 'yasuo', 'Mid', 'A', 49.7, 24.1, 32.8, 'stable'),
('Thresh', 'thresh', 'Support', 'A', 50.2, 15.6, 12.1, 'down'),
('Garen', 'garen', 'Top', 'B', 51.1, 8.9, 3.2, 'up'),
('Azir', 'azir', 'Mid', 'C', 47.3, 4.1, 2.8, 'down'),
('Caitlyn', 'caitlyn', 'ADC', 'A', 50.8, 14.7, 8.9, 'stable'),
('Lee Sin', 'leesin', 'Jungle', 'B', 48.6, 16.3, 5.2, 'down');

-- Inserir builds de exemplo
INSERT INTO public.builds (champion_id, name, role, items, runes, win_rate, pick_rate, games_played, tier, is_featured) VALUES
(1, 'Crit Build Meta', 'ADC', '["Kraken Slayer", "Phantom Dancer", "Infinity Edge", "Lord Dominik''s Regards", "Guardian Angel"]', '["Lethal Tempo", "Presence of Mind", "Legend: Alacrity", "Cut Down"]', 54.2, 68.3, 1243, 'S', true),
(2, 'Lethality Carry', 'Jungle', '["Eclipse", "Collector", "Lord Dominik''s Regards", "Edge of Night", "Guardian Angel"]', '["Dark Harvest", "Sudden Impact", "Eyeball Collection", "Ultimate Hunter"]', 52.8, 45.2, 987, 'S', false),
(3, 'Shieldbow Standard', 'Mid', '["Immortal Shieldbow", "Berserker''s Greaves", "Infinity Edge", "Bloodthirster", "Guardian Angel"]', '["Lethal Tempo", "Triumph", "Legend: Alacrity", "Last Stand"]', 49.7, 78.9, 2156, 'A', false),
(4, 'Tank Support', 'Support', '["Relic Shield", "Locket of the Iron Solari", "Knight''s Vow", "Thornmail", "Gargoyle Stoneplate"]', '["Aftershock", "Demolish", "Bone Plating", "Unflingling"]', 50.2, 82.1, 1876, 'A', false);

-- Inserir matchups de exemplo
INSERT INTO public.matchups (champion_id, opponent_champion_id, difficulty, win_rate, tips) VALUES
(1, 7, 'Easy', 58.2, 'Abuse seu range superior no early game'),
(1, 2, 'Hard', 44.1, 'Jogue safe e espere por ganks'),
(1, 3, 'Medium', 52.3, 'Poke early, cuidado com all-ins');
