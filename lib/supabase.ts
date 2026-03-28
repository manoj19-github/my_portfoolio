import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  features: string[];
  live_url?: string;
  github_url?: string;
  image_url?: string;
  display_order: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  display_order: number;
  created_at: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  achievements: string[];
  created_at: string;
}

export interface Settings {
  id: string;
  key: string;
  value: any;
  updated_at: string;
}
