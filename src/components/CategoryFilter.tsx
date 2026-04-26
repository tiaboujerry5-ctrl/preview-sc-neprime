import { Drama, Music, Mic, Sparkles, Laugh } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  drama: <Drama size={20} />,
  music: <Music size={20} />,
  'music-2': <Music size={20} />,
  mic: <Mic size={20} />,
  sparkles: <Sparkles size={20} />,
  laugh: <Laugh size={20} />,
};

interface CategoryFilterProps {
  categories: { name: string; slug: string; icon: string; count: number }[];
  active: string;
  onChange: (slug: string) => void;
}

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
          active === 'all'
            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
            : 'bg-surface-800/50 text-surface-300 hover:bg-surface-700/50 hover:text-surface-100 border border-surface-700'
        }`}
      >
        Toutes
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            active === cat.slug
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
              : 'bg-surface-800/50 text-surface-300 hover:bg-surface-700/50 hover:text-surface-100 border border-surface-700'
          }`}
        >
          {iconMap[cat.icon] || <Sparkles size={20} />}
          {cat.name}
          <span className="text-xs opacity-60">({cat.count})</span>
        </button>
      ))}
    </div>
  );
}
