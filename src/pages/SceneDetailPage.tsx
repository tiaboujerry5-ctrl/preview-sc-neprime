import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Star, Clock, User, ArrowLeft, Calendar } from 'lucide-react';
import type { Scene } from '../types';

export default function SceneDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [scene, setScene] = useState<Scene | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('scenes')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => {
        setScene(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-32 rounded skeleton mb-8" />
          <div className="aspect-video rounded-2xl skeleton mb-8" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 rounded skeleton" />
            <div className="h-4 w-full rounded skeleton" />
            <div className="h-4 w-5/6 rounded skeleton" />
          </div>
        </div>
      </main>
    );
  }

  if (!scene) {
    return (
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h2 className="text-2xl font-display font-bold text-surface-50 mb-4">
            Spectacle introuvable
          </h2>
          <p className="text-surface-400 mb-8">
            Ce spectacle n'existe pas ou a été retiré.
          </p>
          <Link
            to="/scenes"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-all duration-200"
          >
            <ArrowLeft size={18} />
            Retour aux scènes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/scenes"
          className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-primary-400 transition-colors duration-200 mb-6 animate-fade-in"
        >
          <ArrowLeft size={16} />
          Retour aux scènes
        </Link>

        <div className="animate-scale-in">
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
            <img
              src={scene.image_url}
              alt={scene.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-950/60 via-transparent to-transparent" />
          </div>
        </div>

        <div className="animate-fade-in stagger-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-medium uppercase tracking-wider">
              {scene.category}
            </span>
            {scene.featured && (
              <span className="px-3 py-1 rounded-full bg-accent-400/10 border border-accent-400/20 text-accent-400 text-xs font-medium">
                Vedette
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-bold text-surface-50 mb-4">
            {scene.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-surface-300 mb-8">
            <span className="inline-flex items-center gap-2">
              <Star size={16} className="fill-accent-400 text-accent-400" />
              <span className="font-semibold text-surface-100">{Number(scene.rating).toFixed(1)}</span>
              /5
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={16} />
              {scene.duration}
            </span>
            <span className="inline-flex items-center gap-2">
              <User size={16} />
              {scene.artist}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar size={16} />
              {new Date(scene.created_at).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-surface-300 text-base leading-relaxed whitespace-pre-line">
              {scene.description}
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-surface-800">
            <h3 className="text-lg font-semibold text-surface-100 mb-4">
              Informations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-900 border border-surface-800">
                <div className="text-xs text-surface-500 mb-1">Artiste / Compagnie</div>
                <div className="text-sm font-medium text-surface-200">{scene.artist}</div>
              </div>
              <div className="p-4 rounded-xl bg-surface-900 border border-surface-800">
                <div className="text-xs text-surface-500 mb-1">Durée</div>
                <div className="text-sm font-medium text-surface-200">{scene.duration}</div>
              </div>
              <div className="p-4 rounded-xl bg-surface-900 border border-surface-800">
                <div className="text-xs text-surface-500 mb-1">Catégorie</div>
                <div className="text-sm font-medium text-surface-200">{scene.category}</div>
              </div>
              <div className="p-4 rounded-xl bg-surface-900 border border-surface-800">
                <div className="text-xs text-surface-500 mb-1">Note</div>
                <div className="text-sm font-medium text-surface-200">
                  {Number(scene.rating).toFixed(1)} / 5
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
