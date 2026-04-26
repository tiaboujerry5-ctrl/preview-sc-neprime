import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SceneCard from '../components/SceneCard';
import SceneCardSkeleton from '../components/SceneCardSkeleton';
import CategoryFilter from '../components/CategoryFilter';
import { Search } from 'lucide-react';
import type { Scene, Category } from '../types';

export default function ScenesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const activeCategory = searchParams.get('category') || 'all';

  const setActiveCategory = (slug: string) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    async function fetchData() {
      const [scenesRes, categoriesRes] = await Promise.all([
        supabase.from('scenes').select('*').order('rating', { ascending: false }),
        supabase.from('categories').select('*').order('name'),
      ]);

      setScenes(scenesRes.data || []);
      setCategories(categoriesRes.data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let result = scenes;

    if (activeCategory !== 'all') {
      const cat = categories.find((c) => c.slug === activeCategory);
      if (cat) {
        result = result.filter((s) => s.category === cat.name);
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q)
      );
    }

    return result;
  }, [scenes, categories, activeCategory, search]);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-surface-50 mb-2">
            Toutes les scènes
          </h1>
          <p className="text-surface-400">
            Parcourez notre collection complète de spectacles.
          </p>
        </div>

        <div className="mb-8 space-y-4 animate-fade-in stagger-1">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500"
            />
            <input
              type="text"
              placeholder="Rechercher un spectacle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-800/50 border border-surface-700 text-surface-100 placeholder-surface-500 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all duration-200"
            />
          </div>

          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SceneCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-surface-400 text-lg">Aucun spectacle trouvé.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearch('');
              }}
              className="mt-4 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((scene, i) => (
              <SceneCard key={scene.id} scene={scene} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
