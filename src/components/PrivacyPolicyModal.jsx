import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, Lock, Baby, BookOpen, Building } from 'lucide-react';
import { playSound } from '../utils/sound';

export const PrivacyPolicyModal = memo(({ isOpen, onClose, theme }) => {
  const [activeTab, setActiveTab] = useState('hisaab');

  const tabs = [
    { id: 'hisaab', label: '💳 HiSaab (Finance)', icon: Lock },
    { id: 'little-explorer', label: '🐥 Little Explorer (Kids)', icon: Baby },
    { id: 'mind-forge', label: '📚 Mind Forge', icon: BookOpen },
    { id: 'ccms', label: '🏢 CCMS & SMS', icon: Building },
    { id: 'general', label: '🛡️ General & Rights', icon: ShieldCheck },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 pt-12"
          onClick={() => { playSound('close'); onClose(); }}
          role="dialog"
          aria-modal="true"
          aria-label="Privacy Policy Modal"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className={`w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col ${
              theme === 'dark' ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            } border`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-6 border-b flex items-center justify-between ${
              theme === 'dark' ? 'border-white/10' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Privacy Policy & Data Security</h2>
                  <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-slate-500'}`}>
                    Damsaz Technologies Ecosystem • Google Play Console Compliant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/privacy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-block text-xs font-mono text-indigo-400 underline hover:text-indigo-300"
                >
                  Direct Page Link ↗
                </a>
                <button
                  onClick={() => { playSound('close'); onClose(); }}
                  className={`p-2 rounded-full transition-colors ${
                    theme === 'dark' ? 'hover:bg-white/10 text-white/60 hover:text-white' : 'hover:bg-slate-100 text-slate-500'
                  }`}
                  aria-label="Close Privacy Policy"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Sub-tabs Navigation */}
            <div className={`px-6 py-3 border-b flex gap-2 overflow-x-auto ${
              theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-slate-100 bg-slate-50'
            }`}>
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { playSound('click'); setActiveTab(t.id); }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeTab === t.id
                      ? 'bg-indigo-500 text-white shadow-md'
                      : theme === 'dark'
                        ? 'text-white/60 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">

              {activeTab === 'hisaab' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                    <span>💳</span> HiSaab – Personal Finance Tracker
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                    ✓ 100% Offline-First Financial Ledger • Zero Unrequested Cloud Transmission
                  </div>
                  <p>
                    <strong className="text-indigo-400">1. Local SQLite Storage:</strong> All account balances, transactions (paisa/rupee values), expense tags, and cash logs remain 100% stored inside your device SQLite database (Room ORM).
                  </p>
                  <p>
                    <strong className="text-indigo-400">2. Biometric Security:</strong> Biometric unlock (PIN and Fingerprint) uses official Android BiometricPrompt APIs. Fingerprints are authenticated locally by your device security chip. Your PIN and biometrics are never transmitted to any external server.
                  </p>
                  <p>
                    <strong className="text-indigo-400">3. Optional Background Sync:</strong> Cloud sync is optional. If enabled, transactions are encrypted over HTTPS. Sync can be disabled at any time in Settings.
                  </p>
                </div>
              )}

              {activeTab === 'little-explorer' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-pink-400 font-bold text-base">
                    <span>🐥</span> Little Explorer – Toddler Flashcards
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold flex items-center gap-2">
                    <CheckCircle2 size={16} /> COPPA & GOOGLE PLAY FAMILIES POLICY COMPLIANT
                  </div>
                  <p>
                    <strong className="text-emerald-400">1. Zero Data Collection:</strong> Little Explorer collects 0 personal data from toddlers or children. No names, device IDs, location, or telemetry are ever recorded.
                  </p>
                  <p>
                    <strong className="text-emerald-400">2. No Advertisements or Tracking:</strong> Contains 0 third-party ad networks, 0 analytics SDKs, and 0 in-app purchases. It is a 100% safe, distraction-free educational environment.
                  </p>
                </div>
              )}

              {activeTab === 'mind-forge' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-base">
                    <span>📚</span> Mind Forge – MCQ Assessment Platform
                  </div>
                  <p>
                    <strong className="text-blue-400">1. Account Data:</strong> Teacher and student account emails and bcrypt password hashes are stored securely to manage testing access.
                  </p>
                  <p>
                    <strong className="text-blue-400">2. Scoring Analytics:</strong> Test scores, time per question, and subject analytics are used exclusively for automated grading and report cards. Data is never sold to third parties.
                  </p>
                </div>
              )}

              {activeTab === 'ccms' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                    <span>🏢</span> CCMS & SMS – Institution Software
                  </div>
                  <p>
                    <strong className="text-emerald-400">1. Administrative Data:</strong> Student enrolments, attendance logs, fee receipts, and report cards belong to subscribing schools/centres and are protected via role-based access control.
                  </p>
                </div>
              )}

              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
                    <span>🛡️</span> General Data Rights & Contact
                  </div>
                  <p>
                    You have the right to request access, rectification, export, or total erasure of any data stored with Damsaz Technologies.
                  </p>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs">
                    <p><strong className="text-white">Developer:</strong> Abid Damsaz Lakhair (HST Sindh Govt)</p>
                    <p><strong class="text-white">Contact Email:</strong> <a href="mailto:info@damsaz.site" className="text-indigo-400 underline">info@damsaz.site</a></p>
                    <p><strong className="text-white">Standalone Policy URL:</strong> <a href="https://damsaz.site/privacy.html" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">https://damsaz.site/privacy.html</a></p>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className={`p-4 border-t flex justify-between items-center text-xs ${
              theme === 'dark' ? 'border-white/10 text-white/40' : 'border-slate-200 text-slate-500'
            }`}>
              <span>Google Play Console Ready</span>
              <button
                onClick={() => { playSound('close'); onClose(); }}
                className="px-4 py-1.5 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
              >
                Close Policy
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

PrivacyPolicyModal.displayName = 'PrivacyPolicyModal';
