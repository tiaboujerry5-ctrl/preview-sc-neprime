/*
  # Create ScènePrime Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, category display name)
      - `slug` (text, URL-friendly identifier, unique)
      - `icon` (text, icon identifier)
      - `count` (integer, number of scenes in category, default 0)
      - `created_at` (timestamp)
    - `scenes`
      - `id` (uuid, primary key)
      - `title` (text, scene title)
      - `description` (text, scene description)
      - `category` (text, scene category)
      - `image_url` (text, scene cover image URL)
      - `rating` (numeric, scene rating 0-5, default 0)
      - `duration` (text, scene duration display string)
      - `artist` (text, performing artist name)
      - `featured` (boolean, whether scene is featured, default false)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Public read access for both tables (content is publicly viewable)
    - Only authenticated users can insert/update/delete

  3. Indexes
    - Index on scenes.category for filtering
    - Index on scenes.featured for featured queries
    - Index on scenes.created_at for sorting

  4. Seed Data
    - 6 categories with scene counts
    - 12 sample scenes across categories
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text NOT NULL DEFAULT '',
  count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create scenes table
CREATE TABLE IF NOT EXISTS scenes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL,
  image_url text NOT NULL DEFAULT '',
  rating numeric(3,2) NOT NULL DEFAULT 0,
  duration text NOT NULL DEFAULT '',
  artist text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenes ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Public can view scenes"
  ON scenes FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated write policies
CREATE POLICY "Authenticated users can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert scenes"
  ON scenes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update scenes"
  ON scenes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_scenes_category ON scenes(category);
CREATE INDEX IF NOT EXISTS idx_scenes_featured ON scenes(featured);
CREATE INDEX IF NOT EXISTS idx_scenes_created_at ON scenes(created_at DESC);

-- Seed categories
INSERT INTO categories (name, slug, icon, count) VALUES
  ('Theatre', 'theatre', 'drama', 3),
  ('Danse', 'danse', 'music', 2),
  ('Musique', 'musique', 'music-2', 2),
  ('Opera', 'opera', 'mic', 2),
  ('Cirque', 'cirque', 'sparkles', 1),
  ('Comedie', 'comedie', 'laugh', 2)
ON CONFLICT (slug) DO NOTHING;

-- Seed scenes
INSERT INTO scenes (title, description, category, image_url, rating, duration, artist, featured) VALUES
  ('Les Lumières de Paris', 'Un spectacle envoûtant qui transporte le public dans le Paris du XIXe siècle, mêlant théâtre classique et innovations visuelles modernes.', 'Theatre', 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800', 4.80, '2h 15min', 'Compagnie Lumière', true),
  ('Symphonie Nocturne', 'Une performance musicale immersive où les mélodies se mêlent aux projections lumineuses pour créer une expérience sensorielle unique.', 'Musique', 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800', 4.65, '1h 45min', 'Orchestre Étoile', true),
  ('Danse des Étoiles', 'Un ballet contemporain qui explore la relation entre le corps humain et le cosmos à travers des mouvements fluides et aériens.', 'Danse', 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800', 4.90, '1h 30min', 'Ballet Céleste', true),
  ('La Traviata Reimaginée', 'Une réinterprétation audacieuse de l''opéra classique de Verdi, avec des décors numériques et une direction artistique contemporaine.', 'Opera', 'https://images.pexels.com/photos/7099063/pexels-photo-7099063.jpeg?auto=compress&cs=tinysrgb&w=800', 4.75, '2h 30min', 'Opéra National', false),
  ('Cirque des Rêves', 'Un cirque contemporain sans animaux où acrobaties, contorsions et performances aériennes créent un monde onirique.', 'Cirque', 'https://images.pexels.com/photos/2602287/pexels-photo-2602287.jpeg?auto=compress&cs=tinysrgb&w=800', 4.50, '1h 20min', 'Cirque Onirique', true),
  ('Le Masque de Fer', 'Un drame historique captivant sur les mystères du Masque de Fer, avec des décors somptueux et une mise en scène époustouflante.', 'Theatre', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800', 4.40, '2h 00min', 'Théâtre Royal', false),
  ('Jazz sous les Étoiles', 'Une soirée jazz en plein air avec des musiciens de renommée internationale, créant une atmosphère intime sous le ciel étoilé.', 'Musique', 'https://images.pexels.com/photos/1676711/pexels-photo-1676711.jpeg?auto=compress&cs=tinysrgb&w=800', 4.55, '2h 00min', 'Quintet Jazz', false),
  ('Flamenco Nouveau', 'Une fusion de flamenco traditionnel et de danse contemporaine, où la passion espagnole rencontre l''avant-garde.', 'Danse', 'https://images.pexels.com/photos/2853469/pexels-photo-2853469.jpeg?auto=compress&cs=tinysrgb&w=800', 4.70, '1h 15min', 'Compañía Fuego', false),
  ('Carmen 2025', 'L''opéra de Bizet réinventé pour le XXIe siècle, avec des voix puissantes et une chorégraphie révolutionnaire.', 'Opera', 'https://images.pexels.com/photos/7679861/pexels-photo-7679861.jpeg?auto=compress&cs=tinysrgb&w=800', 4.85, '2h 45min', 'Opéra Bastille', true),
  ('Les Fous du Roi', 'Une comédie satirique qui dénonce les absurdités du pouvoir à travers un humour noir et des répliques ciselées.', 'Comedie', 'https://images.pexels.com/photos/3755761/pexels-photo-3755761.jpeg?auto=compress&cs=tinysrgb&w=800', 4.30, '1h 50min', 'Troupe Molière', false),
  ('Stand-Up Parisien', 'Les meilleurs humoristes parisiens se produisent sur scène pour une soirée de rires et de répartie.', 'Comedie', 'https://images.pexels.com/photos/7135306/pexels-photo-7135306.jpeg?auto=compress&cs=tinysrgb&w=800', 4.20, '1h 30min', 'Le Point Virgule', false),
  ('L''Illusion Comique', 'Une pièce de Corneille revisitée, où les frontières entre réalité et illusion se brouillent dans un jeu de miroirs fascinant.', 'Theatre', 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800', 4.60, '2h 10min', 'Compagnie Miroir', false)
ON CONFLICT DO NOTHING;
