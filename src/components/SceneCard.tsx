import { Link } from 'react-router-dom';
import { Star, Clock, User } from 'lucide-react';
import type { Scene } from '../types';

interface SceneCardProps {
  scene: Scene;
  index?: number;
}

export default function SceneCard({ scene, index = 0 }: SceneCardProps) {
  const staggerClass = `stagger-${Math.min(index + 1, 6)}`;

  return (
    <Link
      to={`/scenes/${scene.id}`}
      className={`group block animate-slide-up ${staggerClass}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-surface-900 border border-surface-800 transition-all duration-300 hover:border-surface-600 hover:shadow-xl hover:shadow-primary-900/10 hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={scene.image_url}
            alt={scene.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />

          {scene.featured && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-accent-400/90 text-surface-950 text-xs font-semibold backdrop-blur-sm">
              Vedette
            </span>
          )}

          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 text-xs text-surface-200">
            <span className="inline-flex items-center gap-1">
              <Clock size={12} />
              {scene.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <User size={12} />
              {scene.artist}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-semibold text-surface-50 group-hover:text-primary-400 transition-colors duration-200 line-clamp-1">
              {scene.title}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star size={14} className="fill-accent-400 text-accent-400" />
              <span className="text-sm font-medium text-surface-200">
                {Number(scene.rating).toFixed(1)}
              </span>
            </div>
          </div>

          <p className="text-sm text-surface-400 line-clamp-2 leading-relaxed">
            {scene.description}
          </p>

          <div className="mt-3 pt-3 border-t border-surface-800">
            <span className="text-xs font-medium text-primary-400/80 uppercase tracking-wider">
              {scene.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
