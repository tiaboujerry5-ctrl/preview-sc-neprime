import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Hero from '../components/Hero';
import SceneCard from '../components/SceneCard';
import SceneCardSkeleton from '../components/SceneCardSkeleton';
import type { Scene } from '../types';

export default function HomePage() {
  const [featured, setFeatured] = useState<Scene[]>([]);
  const [recent, setRecent] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [featuredRes, recentRes] = await Promise.all([
        supabase.from('scenes').select('*').eq('featured', true).order('rating', { ascending: false }).limit(4),
        supabase.from('scenes').select('*').order('created_at', { ascending: false }).limit(6),
      ]);

      setFeatured(featuredRes.data || []);
      setRecent(recentRes.data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-surface-50 mb-2">
            Scènes vedettes
          </h2>
          <p className="text-surface-400">
            Les spectacles les mieux notés, sélectionnés pour vous.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SceneCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((scene, i) => (
              <SceneCard key={scene.id} scene={scene} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-surface-800/50">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-surface-50 mb-2">
            Dernières scènes
          </h2>
          <p className="text-surface-400">
            Les nouveautés et les ajouts récents.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SceneCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map((scene, i) => (
              <SceneCard key={scene.id} scene={scene} index={i} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
