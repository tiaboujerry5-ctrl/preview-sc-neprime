import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-surface-800 bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm font-display">S</span>
              </div>
              <span className="text-lg font-display font-bold text-surface-50">
                Scène<span className="text-primary-400">Prime</span>
              </span>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed">
              Votre porte d'entrée vers les spectacles les plus captivants de la scène francophone.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-surface-200 mb-4">Explorer</h4>
            <ul className="space-y-2">
              {['Theatre', 'Danse', 'Musique', 'Opera', 'Cirque', 'Comedie'].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/scenes"
                    className="text-sm text-surface-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-surface-200 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/scenes', label: 'Scènes' },
                { to: '/categories', label: 'Catégories' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-surface-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-surface-200 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-surface-400">
              <li>contact@sceneprime.fr</li>
              <li>+33 1 23 45 67 89</li>
              <li>Paris, France</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-500">
            &copy; 2025 ScènePrime. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-surface-500">
            <span className="hover:text-surface-300 cursor-pointer transition-colors">Confidentialité</span>
            <span className="hover:text-surface-300 cursor-pointer transition-colors">Conditions</span>
            <span className="hover:text-surface-300 cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
