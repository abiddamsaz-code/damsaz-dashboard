import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  BookOpen,
  Building,
  Users,
  User,
  PlayCircle,
  Fingerprint
} from 'lucide-react';

const iconMap = {
  BookOpen: <BookOpen size={20} />,
  Building: <Building size={20} />,
  Users: <Users size={20} />,
  User: <User size={20} />,
  PlayCircle: <PlayCircle size={20} />,
  Fingerprint: <Fingerprint size={20} />,
};

export const CommandPalette = memo(({
  isOpen,
  onClose,
  paletteQuery,
  setPaletteQuery,
  paletteResults,
  onSelectProduct,
  theme
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-20"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette Modal"
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            className={`w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl ${
              theme === 'dark' ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
            } border`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                theme === 'dark' ? 'text-white/40' : 'text-slate-400'
              }`} size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={paletteQuery}
                onChange={(e) => setPaletteQuery(e.target.value)}
                className={`w-full py-4 pl-12 pr-4 outline-none text-lg ${
                  theme === 'dark' ? 'bg-transparent text-white' : 'bg-transparent text-slate-900'
                }`}
                autoFocus
                aria-label="Search products in command palette"
              />
              <button
                onClick={onClose}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                  theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                }`}
                aria-label="Close command palette"
              >
                <X size={18} className={theme === 'dark' ? 'text-white/40' : 'text-slate-500'} />
              </button>
            </div>
            <div className={`max-h-80 overflow-y-auto p-2 border-t ${
              theme === 'dark' ? 'border-white/5' : 'border-slate-200'
            }`}>
              {paletteResults.length === 0 ? (
                <div className={`text-center py-8 text-sm ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                  No results found.
                </div>
              ) : (
                paletteResults.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct(p.id)}
                    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                      theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                    }`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectProduct(p.id);
                      }
                    }}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-linear-to-br ${p.color} text-white`}>
                      {iconMap[p.iconName] || <BookOpen size={20} />}
                    </div>
                    <div>
                      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{p.title}</div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{p.status}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

CommandPalette.displayName = 'CommandPalette';
