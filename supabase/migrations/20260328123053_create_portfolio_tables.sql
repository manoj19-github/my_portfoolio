/*
  # Portfolio Database Schema
  
  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `tech_stack` (text array)
      - `features` (text array)
      - `live_url` (text, nullable)
      - `github_url` (text, nullable)
      - `image_url` (text, nullable)
      - `display_order` (integer)
      - `is_featured` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `skills`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text)
      - `proficiency` (integer)
      - `display_order` (integer)
      - `created_at` (timestamptz)
    
    - `experience`
      - `id` (uuid, primary key)
      - `company` (text)
      - `position` (text)
      - `description` (text)
      - `start_date` (text)
      - `end_date` (text, nullable)
      - `is_current` (boolean)
      - `achievements` (text array)
      - `created_at` (timestamptz)
    
    - `settings`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `value` (jsonb)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Public read access for all tables
    - Admin-only write access (to be configured)
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  tech_stack text[] DEFAULT '{}',
  features text[] DEFAULT '{}',
  live_url text,
  github_url text,
  image_url text,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  proficiency integer DEFAULT 80,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  description text NOT NULL,
  start_date text NOT NULL,
  end_date text,
  is_current boolean DEFAULT false,
  achievements text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for skills"
  ON skills FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for experience"
  ON experience FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for settings"
  ON settings FOR SELECT
  TO anon, authenticated
  USING (true);
