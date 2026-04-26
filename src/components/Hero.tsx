import { Link } from 'react-router-dom';
import { Play, ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-950 via-surface-950/90 to-surface-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-surface-950/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-medium mb-6">
              <Star size={12} className="fill-primary-400" />
              Nouvelle saison 2025
            </span>
          </div>

          <h1 className="animate-fade-in stagger-1 text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-surface-50 leading-tight mb-6">
            Vivez la magie
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-300">
              de la scène
            </span>
          </h1>

          <p className="animate-fade-in stagger-2 text-lg sm:text-xl text-surface-300 leading-relaxed mb-8 max-w-lg">
            Découvrez les spectacles les plus captivants. Théâtre, danse, musique,
            opéra — votre prochaine expérience inoubliable vous attend.
          </p>

          <div className="animate-fade-in stagger-3 flex flex-wrap gap-4">
            <Link
              to="/scenes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-600/25 hover:-translate-y-0.5"
            >
              <Play size={18} className="fill-white" />
              Explorer les scènes
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-800/50 hover:bg-surface-700/50 border border-surface-700 text-surface-200 font-medium transition-all duration-200 hover:-translate-y-0.5"
            >
              Parcourir
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="animate-fade-in stagger-4 mt-12 flex items-center gap-8">
            <div>
              <div className="text-2xl font-bold text-surface-50">150+</div>
              <div className="text-sm text-surface-400">Spectacles</div>
            </div>
            <div className="w-px h-10 bg-surface-700" />
            <div>
              <div className="text-2xl font-bold text-surface-50">50K+</div>
              <div className="text-sm text-surface-400">Spectateurs</div>
            </div>
            <div className="w-px h-10 bg-surface-700" />
            <div>
              <div className="text-2xl font-bold text-surface-50">4.8</div>
              <div className="text-sm text-surface-400">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
