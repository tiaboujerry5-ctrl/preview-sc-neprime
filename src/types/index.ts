export interface Scene {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  rating: number;
  duration: string;
  artist: string;
  featured: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
}
