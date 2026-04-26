/*
  # Fix RLS policies for public read access

  The previous policies restricted read access to authenticated users only.
  Since ScènePrime is a public content platform, all visitors should be able
  to browse scenes and categories without authentication.

  1. Changes
    - Drop existing SELECT policies on categories and scenes
    - Create new SELECT policies allowing unauthenticated (anon) access
    - Keep write policies restricted to authenticated users
*/

-- Drop old restrictive read policies
DROP POLICY IF EXISTS "Public can view categories" ON categories;
DROP POLICY IF EXISTS "Public can view scenes" ON scenes;

-- Create public read policies (anon + authenticated)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view scenes"
  ON scenes FOR SELECT
  USING (true);
