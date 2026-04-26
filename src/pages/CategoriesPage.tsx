import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Drama, Music, Mic, Sparkles, Laugh, ArrowRight } from 'lucide-react';
import type { Category } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  drama: <Drama size={28} />,
  music: <Music size={28} />,
  'music-2': <Music size={28} />,
  mic: <Mic size={28} />,
  sparkles: <Sparkles size={28} />,
  laugh: <Laugh size={28} />,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .order('name')
      .then(({ data }) => {
        setCategories(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-surface-50 mb-2">
            Catégories
          </h1>
          <p className="text-surface-400">
            Explorez les spectacles par genre et discipline.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 rounded-2xl skeleton" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/scenes?category=${cat.slug}`}
                className={`group p-6 rounded-2xl bg-surface-900 border border-surface-800 hover:border-primary-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-900/10 hover:-translate-y-1 animate-slide-up stagger-${Math.min(i + 1, 6)}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 mb-4 group-hover:bg-primary-500/20 transition-colors duration-200">
                  {iconMap[cat.icon] || <Sparkles size={28} />}
                </div>
                <h3 className="text-lg font-semibold text-surface-50 group-hover:text-primary-400 transition-colors duration-200 mb-1">
                  {cat.name}
                </h3>
                <p className="text-sm text-surface-400 mb-4">
                  {cat.count} spectacle{cat.count !== 1 ? 's' : ''}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-400 group-hover:gap-2 transition-all duration-200">
                  Explorer
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
