/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  ChevronRight, 
  ArrowLeft, 
  Settings, 
  Users, 
  Phone, 
  MapPin, 
  Clock,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface PortalUser {
  id: string;
  name: string;
  password: string;
  embedUrl: string;
  color: string;
}

const USERS: PortalUser[] = [
  { 
    id: 'samith', 
    name: 'Samith', 
    password: 'samith112', 
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ25Q6HUMdOdKlQbyxoxgacFVm6lcyzTutkIBZAK9rXOHG_4hOFv3DBILmPyjhBQfsuNhavmfNGfVCb/pubhtml?gid=1039984560&single=true&widget=true&headers=false',
    color: 'from-blue-600 to-blue-400'
  },
  { 
    id: 'uthpala', 
    name: 'Uthpala', 
    password: 'uthpala113', 
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ25Q6HUMdOdKlQbyxoxgacFVm6lcyzTutkIBZAK9rXOHG_4hOFv3DBILmPyjhBQfsuNhavmfNGfVCb/pubhtml?gid=377087300&single=true&widget=true&headers=false',
    color: 'from-indigo-600 to-indigo-400'
  },
  { 
    id: 'prasanna', 
    name: 'Prasanna', 
    password: 'prasanna114', 
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ25Q6HUMdOdKlQbyxoxgacFVm6lcyzTutkIBZAK9rXOHG_4hOFv3DBILmPyjhBQfsuNhavmfNGfVCb/pubhtml?gid=209574589&single=true&widget=true&headers=false',
    color: 'from-purple-600 to-purple-400'
  },
  { 
    id: 'aloka', 
    name: 'Aloka', 
    password: 'aloka115', 
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ25Q6HUMdOdKlQbyxoxgacFVm6lcyzTutkIBZAK9rXOHG_4hOFv3DBILmPyjhBQfsuNhavmfNGfVCb/pubhtml?gid=767932679&single=true&widget=true&headers=false',
    color: 'from-cyan-600 to-cyan-400'
  },
  { 
    id: 'sudesh', 
    name: 'Sudesh', 
    password: 'sudesh116', 
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ25Q6HUMdOdKlQbyxoxgacFVm6lcyzTutkIBZAK9rXOHG_4hOFv3DBILmPyjhBQfsuNhavmfNGfVCb/pubhtml?gid=1655107500&single=true&widget=true&headers=false',
    color: 'from-teal-600 to-teal-400'
  },
  { 
    id: 'nadeesha', 
    name: 'Nadeesha', 
    password: 'nadeesha117', 
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ25Q6HUMdOdKlQbyxoxgacFVm6lcyzTutkIBZAK9rXOHG_4hOFv3DBILmPyjhBQfsuNhavmfNGfVCb/pubhtml?gid=1850378778&single=true&widget=true&headers=false',
    color: 'from-emerald-600 to-emerald-400'
  },
  { 
    id: 'rashmika', 
    name: 'Rashmika', 
    password: 'rashmika118', 
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ25Q6HUMdOdKlQbyxoxgacFVm6lcyzTutkIBZAK9rXOHG_4hOFv3DBILmPyjhBQfsuNhavmfNGfVCb/pubhtml?gid=1218926011&single=true&widget=true&headers=false',
    color: 'from-orange-600 to-orange-400'
  },
  { 
    id: 'mangala', 
    name: 'Mr. Mangala', 
    password: 'mangala119', 
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ25Q6HUMdOdKlQbyxoxgacFVm6lcyzTutkIBZAK9rXOHG_4hOFv3DBILmPyjhBQfsuNhavmfNGfVCb/pubhtml?gid=1778797280&single=true&widget=true&headers=false',
    color: 'from-red-600 to-red-400'
  },
  { 
    id: 'automation', 
    name: 'Automation', 
    password: 'auto110', 
    embedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ25Q6HUMdOdKlQbyxoxgacFVm6lcyzTutkIBZAK9rXOHG_4hOFv3DBILmPyjhBQfsuNhavmfNGfVCb/pubhtml?gid=1068632364&single=true&widget=true&headers=false',
    color: 'from-slate-700 to-slate-500'
  }
];

export default function App() {
  const [selectedUser, setSelectedUser] = useState<PortalUser | null>(null);
  const [activeViewUser, setActiveViewUser] = useState<PortalUser | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);

  const handlePasswordSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (selectedUser && passwordInput === selectedUser.password) {
      // Save authenticated state to localStorage
      const verified = JSON.parse(localStorage.getItem('portal_verified_users') || '[]');
      if (!verified.includes(selectedUser.id)) {
        localStorage.setItem('portal_verified_users', JSON.stringify([...verified, selectedUser.id]));
      }

      setActiveViewUser(selectedUser);
      setSelectedUser(null);
      setPasswordInput('');
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleUserClick = (user: PortalUser) => {
    const verified = JSON.parse(localStorage.getItem('portal_verified_users') || '[]');
    if (verified.includes(user.id)) {
      setActiveViewUser(user);
    } else {
      setSelectedUser(user);
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setPasswordInput('');
    setError(false);
  };

  if (activeViewUser) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-white flex flex-col"
      >
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveViewUser(null)}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors group"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h2 className="font-bold text-lg">{activeViewUser.name}'s Dashboard</h2>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Live Sheet View</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono bg-emerald-400/10 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            SECURE ACCESS GRANTED
          </div>
        </div>
        <div className="flex-1 w-full bg-slate-100 relative overflow-hidden">
          <iframe 
            src={activeViewUser.embedUrl} 
            className="w-full h-full border-none"
            title={`${activeViewUser.name} Sheet`}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Hero Background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <img 
          src="/src/assets/images/industrial_background_1777014635319.png" 
          alt="Industrial Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-600/20"
          >
            <Settings className="w-10 h-10 text-white animate-spin-slow" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white"
          >
            Missing Items <span className="text-blue-500">Estimation Portal</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-slate-300 mb-2">
              ELECTRO METAL PRESSINGS (PVT) LTD
            </h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-400 text-sm md:text-base">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Lot No. 26, Templeburg Industrial Estate, Panagoda</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> +94 11 4442497 / 4442329</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 inline-flex items-center gap-3 bg-slate-900/50 backdrop-blur-md border border-slate-800 px-6 py-3 rounded-2xl"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <p className="text-slate-300 text-sm font-medium">
              <Clock className="w-4 h-4 inline mr-2 text-blue-400" />
              Sheets update every 10 minutes • Daily trigger schedule active
            </p>
          </motion.div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {USERS.map((user, index) => (
            <motion.button
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleUserClick(user)}
              className="group relative overflow-hidden rounded-3xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 text-left transition-all hover:border-blue-500/50 hover:bg-slate-900/60"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${user.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
              
              <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${user.color} shadow-lg shadow-black/20`}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <Lock className="w-3 h-3" /> Protected
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {user.name}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Access estimation worksheets for {user.name}'s Jobs Missing Item List.
              </p>

              <div className="flex items-center text-blue-400 text-sm font-bold gap-2">
                Launch Portal <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-slate-900 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} ELECTRO METAL PRESSINGS (PVT) LTD. All Rights Reserved.</p>
        </footer>
      </main>

      {/* Password Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 rounded-[32px] border border-slate-800 p-8 shadow-2xl"
            >
              <div className="text-center mb-8">
                <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${selectedUser.color} rounded-3xl flex items-center justify-center mb-6 shadow-xl`}>
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Security Challenge</h2>
                <p className="text-slate-400">Enter access key for <strong>{selectedUser.name}</strong></p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    autoFocus
                    type="password"
                    placeholder="Enter Password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className={`w-full bg-slate-950 border-2 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none transition-all ${
                      error ? 'border-red-500 animate-shake' : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 -bottom-8 flex items-center gap-2 text-red-500 text-xs font-bold"
                    >
                      <AlertCircle className="w-4 h-4" /> Incorrect password. Please try again.
                    </motion.div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-4 rounded-2xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-4 rounded-2xl font-black text-white shadow-lg transition-all ${
                      passwordInput.length > 0 
                      ? `bg-gradient-to-r ${selectedUser.color} hover:scale-[1.02] active:scale-[0.98]` 
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    UNLOCK
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-slate-800 flex items-center justify-center gap-3 text-slate-500 text-xs uppercase tracking-widest font-bold">
                <ExternalLink className="w-3 h-3" />
                Authorized Personnel Only
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
}
