
-- Adicionar colunas para imagens nos campeões
ALTER TABLE public.champions ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.champions ADD COLUMN IF NOT EXISTS splash_art_url TEXT;

-- Adicionar tabela para itens
CREATE TABLE IF NOT EXISTS public.items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  item_key TEXT NOT NULL UNIQUE,
  image_url TEXT,
  description TEXT,
  stats JSONB,
  cost INTEGER,
  build_path JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Adicionar RLS para itens
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view items" 
  ON public.items 
  FOR SELECT 
  USING (true);

-- Adicionar tabela para runas
CREATE TABLE IF NOT EXISTS public.runes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  rune_key TEXT NOT NULL UNIQUE,
  tree TEXT NOT NULL,
  tier INTEGER NOT NULL,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Adicionar RLS para runas
ALTER TABLE public.runes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view runes" 
  ON public.runes 
  FOR SELECT 
  USING (true);

-- Atualizar tabela de builds para referenciar itens e runas por ID
ALTER TABLE public.builds ADD COLUMN IF NOT EXISTS item_ids INTEGER[];
ALTER TABLE public.builds ADD COLUMN IF NOT EXISTS rune_ids INTEGER[];

-- Adicionar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_champions_name ON public.champions(name);
CREATE INDEX IF NOT EXISTS idx_champions_role ON public.champions(role);
CREATE INDEX IF NOT EXISTS idx_builds_champion_id ON public.builds(champion_id);
CREATE INDEX IF NOT EXISTS idx_matchups_champion_id ON public.matchups(champion_id);

-- Inserir alguns dados de exemplo para demonstração
INSERT INTO public.items (name, item_key, image_url, description, cost) VALUES
('Kraken Slayer', 'kraken-slayer', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=64&h=64&fit=crop', 'Mythic ADC Item', 3400),
('Phantom Dancer', 'phantom-dancer', 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop', 'Attack Speed and Crit Item', 2600),
('Infinity Edge', 'infinity-edge', 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=64&h=64&fit=crop', 'High Damage Crit Item', 3400),
('Lord Dominiks Regards', 'lord-dominiks-regards', 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=64&h=64&fit=crop', 'Armor Penetration Item', 3000),
('Guardian Angel', 'guardian-angel', 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=64&h=64&fit=crop', 'Defensive Revive Item', 2800)
ON CONFLICT (item_key) DO NOTHING;

INSERT INTO public.runes (name, rune_key, tree, tier, image_url, description) VALUES
('Lethal Tempo', 'lethal-tempo', 'Precision', 0, 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=32&h=32&fit=crop', 'Keystone Rune'),
('Presence of Mind', 'presence-of-mind', 'Precision', 1, 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=32&h=32&fit=crop', 'Mana Sustain Rune'),
('Legend: Alacrity', 'legend-alacrity', 'Precision', 2, 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=32&h=32&fit=crop', 'Attack Speed Rune'),
('Cut Down', 'cut-down', 'Precision', 3, 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=32&h=32&fit=crop', 'Damage vs High HP Rune'),
('Magical Footwear', 'magical-footwear', 'Inspiration', 1, 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=32&h=32&fit=crop', 'Free Boots Rune'),
('Biscuit Delivery', 'biscuit-delivery', 'Inspiration', 2, 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=32&h=32&fit=crop', 'Sustain Rune')
ON CONFLICT (rune_key) DO NOTHING;

-- Atualizar alguns campeões com imagens de exemplo
UPDATE public.champions SET 
  image_url = 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=120&h=120&fit=crop',
  splash_art_url = 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop'
WHERE name = 'Jinx';

UPDATE public.champions SET 
  image_url = 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=120&h=120&fit=crop',
  splash_art_url = 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
WHERE name = 'Graves';

UPDATE public.champions SET 
  image_url = 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=120&h=120&fit=crop',
  splash_art_url = 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop'
WHERE name = 'Yasuo';
