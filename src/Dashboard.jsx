import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { products, taglines, categories } from './data/products';
import { ParticleCanvas } from './components/ParticleCanvas';
import { ProductCard } from './components/ProductCard';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { isSoundEnabled, setSoundEnabled, playSound } from './utils/sound';

const getInitialTheme = () => {
  const saved = localStorage.getItem('damsaz-theme');
  return saved === 'light' || saved === 'dark' ? saved : 'dark';
};

export default function DamsazDashboard() {
  const reducedMotion = useReducedMotion();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');
  const [theme, setTheme] = useState(getInitialTheme);
  const [soundEnabled, setSoundState] = useState(isSoundEnabled);
  const [presenterMode, setPresenterMode] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const rafId = useRef(null);
  const toastTimeoutRef = useRef(null);

  const toggleSound = useCallback(() => {
    setSoundState((prev) => {
      const next = !prev;
      setSoundEnabled(next);
      return next;
    });
  }, []);

  // Show toast notification
  const showToast = useCallback((message) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ visible: true, message });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3500);
  }, []);

  // Theme persistence
  useEffect(() => {
    localStorage.setItem('damsaz-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Typewriter tagline switcher
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const down = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
        playSound('open');
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        setExpandedId(null);
        playSound('close');
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Cleanup
  useEffect(() => () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
  }, []);

  // Computed values
  const coreProducts = useMemo(() => products.filter(p => p.id !== 'about'), []);
  const total = coreProducts.length;
  const liveCount = coreProducts.filter(p => p.status === 'Live').length;
  const betaCount = coreProducts.filter(p => p.status === 'Beta').length;
  const soonCount = coreProducts.filter(p => p.status === 'Soon').length;

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !searchQuery || (
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fullDesc.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchCategory = activeFilter === 'All' || p.categories.includes(activeFilter);
      return matchSearch && matchCategory;
    });
  }, [searchQuery, activeFilter]);

  const sortedFiltered = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.id === 'about') return 1;
      if (b.id === 'about') return -1;
      return 0;
    });
  }, [filtered]);

  const paletteResults = useMemo(() => {
    if (!paletteQuery) return [];
    return products.filter(p =>
      p.title.toLowerCase().includes(paletteQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(paletteQuery.toLowerCase())
    );
  }, [paletteQuery]);

  // Spotlight effect (throttled with rAF)
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current || reducedMotion) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      containerRef.current.style.setProperty('--spot-x', x + '%');
      containerRef.current.style.setProperty('--spot-y', y + '%');
    });
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--spot-x', '50%');
      containerRef.current.style.setProperty('--spot-y', '50%');
    }
  }, []);

  // Callbacks
  const toggleExpand = useCallback((id) => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const handleExploreClick = useCallback(() => {
    playSound('click');
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleCategoryClick = useCallback((filter) => {
    playSound('click');
    setActiveFilter(filter);
    setSearchQuery('');
  }, []);

  const handlePaletteSelect = useCallback((productId) => {
    playSound('open');
    setPaletteOpen(false);
    setActiveFilter('All');
    setSearchQuery('');
    setExpandedId(productId);
    setTimeout(() => {
      const el = document.getElementById(`card-${productId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  }, []);

  const updateDate = new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className={`min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-500 ${
      presenterMode ? 'bg-slate-900' : theme === 'dark' ? 'bg-slate-950' : 'bg-slate-100'
    }`}>
      
      {/* Toast notification */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-999 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl max-w-md w-[90%] text-center"
          >
            <p className="text-white font-medium text-sm">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Cosmic Particle Canvas Background */}
      <ParticleCanvas theme={theme} />

      {/* Background glowing orbs */}
      {!presenterMode && !reducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-[100px] ${
              theme === 'dark' ? 'bg-indigo-600/30' : 'bg-indigo-300/20'
            }`} 
          />
          <motion.div 
            animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-[100px] ${
              theme === 'dark' ? 'bg-rose-600/30' : 'bg-rose-300/20'
            }`} 
          />
          <motion.div 
            animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
            className={`absolute top-1/2 left-1/3 w-64 h-64 rounded-full blur-[80px] ${
              theme === 'dark' ? 'bg-cyan-600/20' : 'bg-cyan-300/15'
            }`} 
          />
        </div>
      )}

      {/* Grid overlay */}
      <div className={`absolute inset-0 pointer-events-none z-0 opacity-5 ${
        theme === 'dark' ? 'bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-size-[40px_40px]' : 'bg-[radial-gradient(#00000033_1px,transparent_1px)] bg-size-[40px_40px]'
      }`} />

      {/* Main glass container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative z-10 w-[95%] max-w-7xl rounded-3xl border transition-all duration-300 backdrop-blur-xl shadow-2xl flex flex-col my-8 ${
          theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/60 border-white/30 shadow-slate-200/50'
        }`}
        style={{
          backgroundImage: `radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.06) 0%, transparent 50%)`
        }}
      >
        {/* Header */}
        <Header
          taglineIndex={taglineIndex}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          toggleTheme={toggleTheme}
          presenterMode={presenterMode}
          setPresenterMode={setPresenterMode}
          setPaletteOpen={setPaletteOpen}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
        />

        {/* Hero block */}
        <div className={`px-8 py-6 border-b ${theme === 'dark' ? 'border-white/5' : 'border-white/20'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                The Ecosystem
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                We build software and teach — helping students, teachers, coaching centres, and institutions learn, manage, and grow.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className={theme === 'dark' ? 'text-white/60' : 'text-slate-600'}>
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{total}</span> Products
              </span>
              <span className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}>
                <span className="font-bold">{liveCount}</span> Live
              </span>
              <span className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}>
                <span className="font-bold">{betaCount}</span> Beta
              </span>
              <span className={theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}>
                <span className="font-bold">{soonCount}</span> Soon
              </span>
            </div>
          </div>

          <div className={`mt-3 flex items-center gap-2 text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
            <Sparkles size={12} className="text-indigo-400" />
            <span>Latest Update: Personal Finance Tracker entered Beta • {updateDate}</span>
          </div>

          <div className="mt-4 flex justify-center md:justify-start">
            <button
              onClick={handleExploreClick}
              className="px-6 py-2.5 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium hover:bg-indigo-500/30 transition-colors border border-indigo-500/20"
            >
              Explore Ecosystem ↓
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="px-8 py-3 flex justify-center gap-2 flex-wrap border-b border-white/5">
          {categories.map(filter => (
            <button
              key={filter}
              onClick={() => handleCategoryClick(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium uppercase transition-all relative focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                activeFilter === filter 
                  ? `text-white bg-indigo-500` 
                  : `bg-transparent ${theme === 'dark' ? 'text-white/50 hover:text-white' : 'text-slate-600 hover:text-slate-800'}`
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <main ref={gridRef} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto min-h-100">
          <AnimatePresence mode="wait">
            {sortedFiltered.length > 0 ? (
              sortedFiltered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isExpanded={expandedId === product.id}
                  onToggle={toggleExpand}
                  theme={theme}
                  presenterMode={presenterMode}
                  showToast={showToast}
                />
              ))
            ) : (
              <div className={`col-span-full text-center py-12 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                No products match your filters.
              </div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer theme={theme} />
      </div>

      {/* Command palette */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        paletteQuery={paletteQuery}
        setPaletteQuery={setPaletteQuery}
        paletteResults={paletteResults}
        onSelectProduct={handlePaletteSelect}
        theme={theme}
      />
    </div>
  );
}