import { memo } from 'react';
import { Youtube, Facebook, Instagram, ShieldCheck } from 'lucide-react';
import { playSound } from '../utils/sound';

export const Footer = memo(({ theme, onOpenPrivacy }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`p-8 border-t text-center ${
      theme === 'dark' ? 'border-white/10' : 'border-white/20'
    }`}>
      <p className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
        &copy; {currentYear} Damsaz Technologies — All Rights Reserved
      </p>
      <div className={`text-xs mt-2 flex flex-wrap items-center justify-center gap-4 ${
        theme === 'dark' ? 'text-white/60' : 'text-slate-400'
      }`}>
        <a 
          href="mailto:info@damsaz.site" 
          className="underline hover:text-indigo-400 transition-colors"
          title="Contact via Email"
        >
          info@damsaz.site
        </a>

        <span>•</span>

        <button
          onClick={() => { playSound('click'); onOpenPrivacy(); }}
          className="inline-flex items-center gap-1 hover:text-indigo-400 transition-colors underline"
          title="Open Privacy Policy Modal"
        >
          <ShieldCheck size={14} className="text-emerald-400" />
          Privacy Policy
        </button>

        <span>•</span>

        <a
          href="/privacy.html"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400 transition-colors font-mono"
          title="Google Play Privacy Policy Page"
        >
          privacy.html ↗
        </a>
      </div>

      <div className="flex justify-center gap-6 mt-4">
        <a 
          href="https://www.youtube.com/@LetsDecodeWithAbii" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}
          aria-label="YouTube Channel"
          title="Let's Decode on YouTube"
        >
          <Youtube size={18} />
        </a>
        <a 
          href="https://facebook.com/damsaztech" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}
          aria-label="Facebook Page"
          title="Damsaz Technologies on Facebook"
        >
          <Facebook size={18} />
        </a>
        <a 
          href="https://instagram.com/damsaztech" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}
          aria-label="Instagram Profile"
          title="Damsaz Technologies on Instagram"
        >
          <Instagram size={18} />
        </a>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
