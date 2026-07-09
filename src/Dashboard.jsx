import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Search, Monitor, User, Users, 
  PlayCircle, Building, BookOpen, Fingerprint,
  Sun, Moon, ChevronDown, ArrowRight, X, Sparkles,
  Youtube, Facebook, Instagram
} from 'lucide-react';

// --- DATA STRUCTURE ---
const products = [
  {
    id: 'mind-forge',
    title: 'Mind Forge',
    desc: 'Advanced MCQ testing and assessment platform for teachers and students.',
    fullDesc: 'An MCQ practice platform that forges sharper minds one question at a time — built for students who want real exam pressure and teachers who want instant analytics.',
    status: 'Soon',
    categories: ['Education'],
    url: '#',
    comingSoon: true,
    stats: { audience: 'For Students & Teachers' },
    icon: <BookOpen size={32} />,
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'ccms',
    title: 'CCMS',
    desc: 'Complete Centre Management System for administrators and teachers.',
    fullDesc: 'Centre management software that runs attendance, fees, scheduling, and reporting — so coaching centres spend less time on admin and more on teaching.',
    status: 'Soon',
    categories: ['Management'],
    url: '#',
    comingSoon: true,
    stats: { audience: 'For Admins & Teachers' },
    icon: <Building size={32} />,
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 'sms',
    title: 'SMS',
    desc: 'School Management System – manage students, teachers, and classes.',
    fullDesc: 'A comprehensive school management system covering admissions, attendance, grades, and parent communication.',
    status: 'Soon',
    categories: ['Management'],
    url: '#',
    comingSoon: true,
    stats: { audience: 'For Schools & Admins' },
    icon: <Users size={32} />,
    color: 'from-cyan-400 to-sky-500'
  },
  {
    id: 'little-explorer',
    title: 'Little Explorer',
    desc: 'Android app for kids to learn names of things, animals, birds, and more.',
    fullDesc: 'A delightful Android learning app for kids and toddlers — interactive cards that teach names of animals, birds, fruits, vegetables, and everyday objects through visual and auditory cues.',
    status: 'Soon',
    categories: ['Education'],
    url: '#',
    comingSoon: false,
    stats: { audience: 'For Kids & Toddlers' },
    icon: <User size={32} />,
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 'tuition-centre',
    title: 'The Conceptual Coaching Centre',
    desc: 'Our physical branch in Sita Road — in-person excellence programs.',
    fullDesc: 'Our physical branch in Sita Road — where the whole ecosystem started, one classroom before it became six products. We teach Science, Physics, Chemistry, English, Computer, Programming, AI, and Test Preparation.',
    status: 'Live',
    categories: ['Education'],
    url: 'https://ccc.damsaz.site',
    comingSoon: false,
    stats: { location: 'Sita Road • One Branch' },
    icon: <Users size={32} />,
    color: 'from-orange-400 to-amber-500'
  },
  {
    id: 'lets-decode',
    title: "Let's Decode",
    desc: 'YouTube channel teaching Science, Physics, Chemistry, Programming, AI & more.',
    fullDesc: 'A YouTube channel that decodes Science (6-8), Physics & Chemistry (9-12), English, Computer Science, Programming, Artificial Intelligence, Pedagogy, and Test Preparation — all through storytelling and clear explanations.',
    status: 'Live',
    categories: ['Content'],
    url: 'https://www.youtube.com/@LetsDecodeWithAbii',
    comingSoon: false,
    stats: { audience: 'For Students & Learners' },
    icon: <PlayCircle size={32} />,
    color: 'from-red-400 to-rose-600'
  },
  {
    id: 'about',
    title: 'Abid Damsaz Lakhair',
    desc: 'The story and vision behind the ecosystem.',
    fullDesc: 'The story of the person building all of this — why an EdTech ecosystem, and why it looks the way it does. From teaching in a small classroom to building digital tools for education.',
    status: 'Soon',
    categories: ['Content'],
    url: '#',
    comingSoon: true,
    stats: { since: 'Since 2024', focus: 'Focus: EdTech' },
    icon: <Fingerprint size={32} />,
    color: 'from-purple-400 to-fuchsia-500'
  }
];

const taglines = [
  "Building Software • Teaching Minds",
  "Educate. Innovate. Inspire.",
  "From Classrooms to Code — We Teach & Build.",
  "Where Teaching Meets Technology",
  "Science • Physics • Chemistry • Programming • AI",
  "Empowering Students • Supporting Teachers"
];

const categories = ['All', 'Education', 'Management', 'Content'];

const getInitialTheme = () => {
  const saved = localStorage.getItem('damsaz-theme');
  return saved === 'light' || saved === 'dark' ? saved : 'dark';
};

// --- SUBCOMPONENT: PRODUCT CARD ---
const ProductCard = ({ product, isExpanded, onToggle, theme, presenterMode, showToast }) => {
  const reducedMotion = useReducedMotion();
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(product.id);
    }
  };

  const handleVisit = (e) => {
    e.stopPropagation();
    if (product.comingSoon) {
      showToast(`🚀 ${product.title} is coming soon! Stay tuned.`);
    } else {
      window.open(product.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      id={`card-${product.id}`}
      layout={!reducedMotion}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={isExpanded ? 'col-span-full' : ''}
    >
      <Tilt
        tiltMaxAngleX={presenterMode ? 0 : 5}
        tiltMaxAngleY={presenterMode ? 0 : 5}
        glareEnable={!presenterMode && !reducedMotion}
        glareMaxOpacity={0.15}
        glarePosition="all"
        className="h-full"
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => onToggle(product.id)}
          onKeyDown={handleKeyDown}
          className={`h-full relative group cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
            theme === 'dark' 
              ? `bg-white/5 border-white/10 ${isExpanded ? 'bg-white/10 border-indigo-500/30' : 'hover:bg-white/10'}`
              : `bg-white/60 border-white/40 ${isExpanded ? 'bg-white/80 border-indigo-400/50 shadow-lg' : 'hover:bg-white/80 hover:shadow-lg'}`
          } border hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.3)] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none`}
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
            {product.icon}
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
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                  <button
                    onClick={handleVisit}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      product.comingSoon
                        ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30'
                    }`}
                  >
                    {product.comingSoon ? 'Coming Soon 🚀' : `Visit ${product.title}`}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tilt>
    </motion.div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
export default function DamsazDashboard() {
  const reducedMotion = useReducedMotion();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');
  const [theme, setTheme] = useState(getInitialTheme);
  const [presenterMode, setPresenterMode] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [stars, setStars] = useState([]);
  
  // --- Toast notification state ---
  const [toast, setToast] = useState({ visible: false, message: '' });
  
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const rafId = useRef(null);
  const toastTimeoutRef = useRef(null);

  // --- Show toast notification (replaces alert) ---
  const showToast = useCallback((message) => {
    // Clear any existing timeout
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    
    setToast({ visible: true, message });
    
    // Auto-hide after 3.5 seconds
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3500);
  }, []);

  // --- GENERATE STARS ONCE AFTER MOUNT ---
  useEffect(() => {
    const generated = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setStars(generated);
    
    // Cleanup toast timeout on unmount
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // --- THEME PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem('damsaz-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // --- TYPEWRITER EFFECT ---
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // --- COMPUTED VALUES ---
  const coreProducts = useMemo(() => products.filter(p => p.id !== 'about'), []);
  const total = coreProducts.length;
  const liveCount = coreProducts.filter(p => p.status === 'Live').length;
  const betaCount = coreProducts.filter(p => p.status === 'Beta').length;
  const soonCount = coreProducts.filter(p => p.status === 'Soon').length;

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.fullDesc.toLowerCase().includes(searchQuery.toLowerCase());
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
    return products.filter(p =>
      p.title.toLowerCase().includes(paletteQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(paletteQuery.toLowerCase())
    );
  }, [paletteQuery]);

  // --- SPOTLIGHT (Throttled) ---
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    
    rafId.current = requestAnimationFrame(() => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      containerRef.current.style.setProperty('--spot-x', x + '%');
      containerRef.current.style.setProperty('--spot-y', y + '%');
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (containerRef.current) {
      containerRef.current.style.setProperty('--spot-x', '50%');
      containerRef.current.style.setProperty('--spot-y', '50%');
    }
  }, []);

  // --- KEYBOARD & NAVIGATION ---
  useEffect(() => {
    const down = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        setExpandedId(null);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const toggleExpand = useCallback((id) => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const handleExploreClick = useCallback(() => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Dynamic update date
  const updateDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // --- PALETTE SELECT (resets filters so the card is always visible) ---
  const handlePaletteSelect = useCallback((productId) => {
    setPaletteOpen(false);
    setActiveFilter('All');
    setSearchQuery('');
    setExpandedId(productId);
    setTimeout(() => {
      const el = document.getElementById(`card-${productId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }, []);

  return (
    <div className={`min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-500 ${
      presenterMode ? 'bg-slate-900' : theme === 'dark' ? 'bg-slate-950' : 'bg-slate-100'
    }`}>
      
      {/* GLOBAL TWINKLE CSS */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(20px) scale(0.95); }
        }
      `}</style>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl max-w-md w-[90%] text-center"
          >
            <p className="text-white font-medium text-sm">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REACT-WAY STAR BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {stars.map(star => (
          <div 
            key={star.id} 
            className={`absolute rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-slate-800'}`}
            style={{
              width: star.size,
              height: star.size,
              left: star.left,
              top: star.top,
              opacity: star.opacity,
              animation: `twinkle ${star.animationDuration} infinite`,
              animationDelay: star.animationDelay
            }}
          />
        ))}
      </div>

      {/* BACKGROUND ORBS */}
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

      {/* FAINT GRID OVERLAY */}
      <div className={`absolute inset-0 pointer-events-none z-0 opacity-5 ${
        theme === 'dark' ? 'bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-size-[40px_40px]' : 'bg-[radial-gradient(#00000033_1px,transparent_1px)] bg-size-[40px_40px]'
      }`} />

      {/* MAIN GLASS CONTAINER */}
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
        {/* HEADER */}
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

          {/* UTILITIES */}
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
            
            <button
              onClick={toggleTheme}
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

            <button 
              onClick={() => setPresenterMode(!presenterMode)}
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

            <button
              onClick={() => setPaletteOpen(true)}
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

        {/* HERO BLOCK */}
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

          {/* DYNAMIC Latest Update Ticker */}
          <div className={`mt-3 flex items-center gap-2 text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
            <Sparkles size={12} className="text-indigo-400" />
            <span>Latest Update: Little Explorer entered Beta • {updateDate}</span>
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

        {/* CATEGORY FILTER */}
        <div className="px-8 py-3 flex justify-center gap-2 flex-wrap border-b border-white/5">
          {categories.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium uppercase transition-all relative focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                activeFilter === filter 
                  ? `text-white` 
                  : `bg-transparent ${theme === 'dark' ? 'text-white/50 hover:text-white' : 'text-slate-600 hover:text-slate-800'}`
              }`}
            >
              {filter}
              {activeFilter === filter && (
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full ${
                  theme === 'dark' ? 'bg-white' : 'bg-slate-800'
                }`} />
              )}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
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

        {/* FOOTER - Updated: YouTube, Facebook, Instagram */}
        <footer className={`p-8 border-t text-center ${
          theme === 'dark' ? 'border-white/10' : 'border-white/20'
        }`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
            &copy; {new Date().getFullYear()} Damsaz Technologies — All Rights Reserved
          </p>
          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-white/60' : 'text-slate-400'}`}>
            info@damsaz.site
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a 
              href="https://www.youtube.com/@LetsDecodeWithAbii" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
            <a 
              href="#" 
              className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a 
              href="#" 
              className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </footer>
      </div>

      {/* COMMAND PALETTE */}
      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-20"
            onClick={() => setPaletteOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className={`w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl ${
                theme === 'dark' ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              } border`}
              onClick={e => e.stopPropagation()}
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
                  aria-label="Search products"
                />
                <button
                  onClick={() => setPaletteOpen(false)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                    theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                  }`}
                  aria-label="Close palette"
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
                  paletteResults.map(p => (
                    <div
                      key={p.id}
                      onClick={() => handlePaletteSelect(p.id)}
                      className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                        theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handlePaletteSelect(p.id);
                        }
                      }}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-linear-to-br ${p.color} text-white`}>
                        {p.icon}
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
    </div>
  );
}
