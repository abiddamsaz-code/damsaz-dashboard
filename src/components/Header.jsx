import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sun, Moon, Monitor, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { taglines } from '../data/products';
import { playSound } from '../utils/sound';

export const Header = memo(({
  taglineIndex,
  searchQuery,
  setSearchQuery,
  theme,
  toggleTheme,
  presenterMode,
  setPresenterMode,
  setPaletteOpen,
  soundEnabled,
  toggleSound,
  onOpenPrivacy
}) => {
  return (
    <header className={`p-8 border-b flex flex-col md:flex-row justify-between items-center gap-6 ${
      theme === 'dark' ? 'border-white/10' : 'border-white/20'
    }`}>
      <div className="text-center md:text-left">
        <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight uppercase ${
          theme === 'dark' 
            ? 'text-transparent bg-clip-text bg-linear-to-r from-white to-white/60' 
            : 'text-slate-800'
        }`}>
          Damsaz Technologies
        </h1>
        <div className="h-10 mt-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className={`text-lg font-medium ${
                theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'
              }`}
            >
              {taglines[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative group flex-1 md:w-64">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${
            theme === 'dark' ? 'text-white/40' : 'text-slate-400'
          }`} size={18} />
          <input 
            type="text" 
            placeholder="Search products... ⌘K" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full rounded-full py-2 pl-10 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10 text-white placeholder-white/40'
                : 'bg-white/60 border-slate-200/60 text-slate-800 placeholder-slate-500'
            } border`}
            aria-label="Search products"
          />
        </div>

        {/* Privacy Policy Trigger */}
        <button
          onClick={() => { playSound('click'); onOpenPrivacy(); }}
          className={`p-2 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
            theme === 'dark' 
              ? 'bg-white/5 text-emerald-400 hover:bg-white/10' 
              : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
          }`}
          title="Privacy Policy"
          aria-label="Privacy Policy"
        >
          <ShieldCheck size={20} />
        </button>

        {/* Audio Toggle */}
        <button
          onClick={() => { toggleSound(); playSound('click'); }}
          className={`p-2 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
            soundEnabled
              ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
              : theme === 'dark'
                ? 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                : 'bg-slate-200/50 text-slate-500 hover:bg-slate-200 hover:text-slate-900'
          }`}
          title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        
        {/* Theme Toggle */}
        <button
          onClick={() => { toggleTheme(); playSound('click'); }}
          className={`p-2 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
            theme === 'dark' 
              ? 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white' 
              : 'bg-slate-200/50 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
          }`}
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Presenter Mode Toggle */}
        <button 
          onClick={() => { setPresenterMode(!presenterMode); playSound('click'); }}
          className={`p-2 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
            presenterMode 
              ? 'bg-indigo-500 text-white' 
              : theme === 'dark'
                ? 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                : 'bg-slate-200/50 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
          }`}
          title="Toggle Presenter Mode"
          aria-label="Toggle Presenter Mode"
        >
          <Monitor size={20} />
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={() => { setPaletteOpen(true); playSound('open'); }}
          className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
            theme === 'dark'
              ? 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
          }`}
          aria-label="Open command palette"
        >
          <span>⌘K</span>
        </button>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
