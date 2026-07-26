import { memo, useCallback } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, useReducedMotion } from 'framer-motion';
import {
  BookOpen,
  Building,
  Users,
  User,
  PlayCircle,
  Fingerprint,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  BookOpen: <BookOpen size={32} />,
  Building: <Building size={32} />,
  Users: <Users size={32} />,
  User: <User size={32} />,
  PlayCircle: <PlayCircle size={32} />,
  Fingerprint: <Fingerprint size={32} />,
};

export const ProductCard = memo(({ product, isExpanded, onToggle, theme, presenterMode, showToast }) => {
  const reducedMotion = useReducedMotion();

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(product.id);
    }
  }, [onToggle, product.id]);

  const handleVisit = useCallback((e) => {
    e.stopPropagation();
    if (product.comingSoon) {
      showToast(`🚀 ${product.title} is coming soon! Stay tuned.`);
    } else {
      window.open(product.url, '_blank', 'noopener,noreferrer');
    }
  }, [product, showToast]);

  const iconComponent = iconMap[product.iconName] || <BookOpen size={32} />;

  return (
    <motion.div
      id={`card-${product.id}`}
      layout={!reducedMotion}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className={isExpanded ? 'col-span-full' : ''}
    >
      <Tilt
        tiltMaxAngleX={presenterMode ? 0 : 5}
        tiltMaxAngleY={presenterMode ? 0 : 5}
        glareEnable={!presenterMode && !reducedMotion}
        glareMaxOpacity={0.1}
        glarePosition="all"
        className="h-full"
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => onToggle(product.id)}
          onKeyDown={handleKeyDown}
          aria-expanded={isExpanded}
          className={`h-full relative group cursor-pointer rounded-2xl p-6 transition-all duration-200 ${
            theme === 'dark'
              ? `bg-white/5 border-white/10 ${isExpanded ? 'bg-white/10 border-indigo-500/30' : 'hover:bg-white/10'}`
              : `bg-white/60 border-white/40 ${isExpanded ? 'bg-white/80 border-indigo-400/50 shadow-lg' : 'hover:bg-white/80 hover:shadow-lg'}`
          } border hover:shadow-[0_15px_30px_-10px_rgba(99,102,241,0.3)] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none`}
        >
          {/* Status Badge */}
          <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
            product.status === 'Live'
              ? theme === 'dark' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
              : product.status === 'Beta'
              ? theme === 'dark' ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700'
              : theme === 'dark' ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-100 text-rose-700'
          }`}>
            {product.status.toUpperCase()}
          </span>

          {/* Icon & Title */}
          <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center bg-linear-to-br ${product.color} text-white shadow-lg
                          transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
            {iconComponent}
          </div>
          <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
            {product.title}
          </h3>
          <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
            {isExpanded ? product.fullDesc : product.desc}
          </p>

          {/* Stats / Audience */}
          {product.stats && (
            <div className="mt-3 flex flex-wrap gap-3 text-xs">
              {Object.entries(product.stats).map(([key, value]) => (
                <span key={key} className={`px-2 py-1 rounded-full ${
                  theme === 'dark'
                    ? 'bg-white/5 text-white/40'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {value}
                </span>
              ))}
            </div>
          )}

          {/* Expand indicator */}
          <div className={`mt-4 flex items-center gap-1 text-xs font-medium transition-colors ${
            theme === 'dark' ? 'text-white/40 group-hover:text-white/70' : 'text-slate-400 group-hover:text-slate-700'
          }`}>
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
            <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>

          {/* Expanded extra content */}
          {isExpanded && (
            <div className="overflow-hidden">
              <motion.div
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ maxHeight: 300, opacity: 1 }}
                exit={{ maxHeight: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <button
                  onClick={handleVisit}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    product.comingSoon
                      ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                      : product.isDownload
                      ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30'
                  }`}
                >
                  {product.comingSoon ? 'Coming Soon 🚀' : product.isDownload ? `Download APK 📱` : `Visit ${product.title}`}
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </Tilt>
    </motion.div>
  );
}, (prev, next) => {
  return (
    prev.product.id === next.product.id &&
    prev.isExpanded === next.isExpanded &&
    prev.theme === next.theme &&
    prev.presenterMode === next.presenterMode
  );
});

ProductCard.displayName = 'ProductCard';
