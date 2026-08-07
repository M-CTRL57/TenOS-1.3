import { Folder, Settings, Power, Monitor, User, X, Camera, Image as ImageIcon, Chrome, Code, Terminal, FileEdit, FileText, PlayCircle, Mail, Activity, ShoppingBag, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function StartMenu({ 
  onClose,
  onOpenFiles,
  onOpenSettings,
  onOpenAbout,
  onOpenBrowser,
  onOpenCamera,
  onOpenGallery,
  onOpenSteam,
  onOpenResourceMonitor,
  onOpenHackerBrowser,
  onOpenCodeEditor,
  onOpenDebugConsole,
  onOpenMarkdownNotes,
  onOpenPdfViewer,
  onOpenTPlayer,
  onOpenSYPmail,
  onShutdown,
  userProfile,
  setUserProfile
}: any) {
  const [view, setView] = useState<'home' | 'user' | 'photo'>('home');
  const [newName, setNewName] = useState(userProfile.name);

  const appsList = [
    { name: 'Ayarlar', icon: <Settings size={20} />, action: onOpenSettings },
    { name: 'Bilgisayar Hakkında', icon: <Monitor size={20} />, action: onOpenAbout },
    { name: 'BitMail', icon: <Mail size={20} className="text-pink-400" />, action: onOpenSYPmail },
    { name: 'blue', icon: <ShoppingBag size={20} className="text-blue-400" />, action: () => {} },
    { name: 'Chrome', icon: <Chrome size={20} className="text-blue-400" />, action: onOpenBrowser },
    { name: 'Debug Konsol', icon: <Terminal size={20} className="text-green-400" />, action: onOpenDebugConsole },
    { name: 'Dosyalar', icon: <Folder size={20} className="text-yellow-400" />, action: onOpenFiles },
    { name: 'Evrakın', icon: <FileText size={20} className="text-red-400" />, action: onOpenPdfViewer },
    { name: 'Galeri', icon: <ImageIcon size={20} className="text-purple-400" />, action: onOpenGallery },
    { name: 'HüsnüHacker°', icon: <Terminal size={20} className="text-red-500" />, action: onOpenHackerBrowser },
    { name: 'Kamera', icon: <Camera size={20} />, action: onOpenCamera },
    { name: 'Kanka AI', icon: <Bot size={20} className="text-indigo-400" />, action: () => {} },
    { name: 'Kaynak İzleyicisi', icon: <Activity size={20} className="text-orange-400" />, action: onOpenResourceMonitor },
    { name: 'Not Defteri', icon: <FileEdit size={20} className="text-blue-300" />, action: onOpenMarkdownNotes },
    { name: 'OynatBunu', icon: <PlayCircle size={20} className="text-purple-300" />, action: onOpenTPlayer },
    { name: 'TenOS Code', icon: <Code size={20} className="text-blue-500" />, action: onOpenCodeEditor },
  ];

  const groupedApps = appsList.reduce((acc, app) => {
    const firstLetter = app.name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(app);
    return acc;
  }, {} as Record<string, typeof appsList>);

  if (view === 'photo') return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="absolute bottom-16 left-4 w-[400px] h-[600px] bg-black/40 backdrop-blur-3xl border border-white/20 rounded-[32px] z-50 flex flex-col p-8 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_15px_40px_rgba(0,0,0,0.5)]">
          <button onClick={() => setView('user')} className="self-start text-white/50 hover:text-white transition-colors">Geri</button>
          <div className="grid grid-cols-3 gap-4 mt-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} key={i} onClick={() => { setUserProfile({...userProfile, photo: `https://picsum.photos/200?random=${i}`}); setView('user'); }} className="h-24 bg-white/5 rounded-2xl overflow-hidden shadow-lg border border-white/10">
                      <img src={`https://picsum.photos/200?random=${i}`} className="w-full h-full object-cover" />
                  </motion.button>
              ))}
          </div>
      </motion.div>
  );

  if (view === 'user') return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="absolute bottom-16 left-4 w-[400px] h-[600px] bg-black/40 backdrop-blur-3xl border border-white/20 rounded-[32px] z-50 flex flex-col p-8 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_15px_40px_rgba(0,0,0,0.5)]">
        <button onClick={() => setView('home')} className="self-start text-white/50 hover:text-white transition-colors">Geri</button>
        <div className="flex flex-col items-center mt-8 gap-4">
            <img src={userProfile.photo} className="w-32 h-32 rounded-[2rem] border-2 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
            <button onClick={() => setView('photo')} className="text-sm text-blue-400 hover:text-blue-300">Fotoğrafı Değiştir</button>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} className="bg-black/30 border border-white/10 p-2 rounded-xl text-center w-64 text-white outline-none focus:border-white/30 transition-all" />
            <button onClick={() => setUserProfile({...userProfile, name: newName})} className="bg-blue-500/80 hover:bg-blue-400 px-4 py-2 rounded-xl text-white shadow-lg transition-colors">İsmi Kaydet</button>
        </div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 20, opacity: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="absolute bottom-16 left-4 w-[850px] h-[650px] bg-black/20 saturate-[1.2] backdrop-blur-3xl border border-white/20 rounded-[32px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.5),0_15px_40px_rgba(0,0,0,0.5)] z-50 flex overflow-hidden text-white"
    >
      <div className="w-16 flex flex-col justify-end items-center py-4 gap-4 bg-white/5 border-r border-white/10 shadow-[inset_1px_0_2px_rgba(255,255,255,0.1)]">
        <div className="mt-auto flex flex-col gap-2">
          <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.9 }} onClick={() => setView('user')} className="p-3 rounded-2xl transition-colors">
            <img src={userProfile.photo} className="w-8 h-8 rounded-full border border-white/30" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.9 }} onClick={() => { onOpenSettings(); onClose(); }} className="p-3 rounded-2xl transition-colors text-white/80 hover:text-white">
            <Settings size={22} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(239,68,68,0.2)' }} whileTap={{ scale: 0.9 }} onClick={onShutdown} className="p-3 rounded-2xl transition-colors text-red-400 hover:text-red-300">
            <Power size={22} />
          </motion.button>
        </div>
      </div>

      <div className="w-[300px] flex flex-col px-4 py-6 overflow-y-auto custom-scrollbar border-r border-white/10 relative">
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none"></div>
        <h2 className="text-xl font-semibold mb-6 px-4 drop-shadow-md text-white/90">Uygulamalar</h2>
        <div className="flex flex-col gap-6">
          {Object.keys(groupedApps).sort().map(letter => (
            <div key={letter} className="flex flex-col gap-1">
              <div className="px-4 py-1 text-sm font-bold text-white/40">{letter}</div>
              {groupedApps[letter].map(app => (
                <motion.button 
                  key={app.name} 
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { if(app.action) app.action(); onClose(); }}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                    {app.icon}
                  </div>
                  <span className="text-sm font-medium">{app.name}</span>
                </motion.button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <h2 className="text-xl font-semibold mb-6 drop-shadow-md text-white/90">Bir Bakışta</h2>
        <div className="grid grid-cols-4 gap-4 auto-rows-[100px]">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => { onOpenAbout(); onClose(); }} className="col-span-4 row-span-2 rounded-[28px] p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute inset-0 bg-blue-500/10 blur-xl group-hover:bg-blue-500/20 transition-all"></div>
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <h3 className="text-3xl font-light text-left">TenOS 5</h3>
                <p className="text-sm text-blue-200 mt-1 text-left">BlueGlass</p>
              </div>
              <Monitor size={32} className="text-blue-300 drop-shadow-lg" />
            </div>
            <div className="relative z-10 text-sm font-medium text-white/70 text-left">Lüks Tabanı TenOS 1.0</div>
          </motion.button>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { onOpenGallery(); onClose(); }} className="col-span-2 row-span-2 rounded-[28px] p-0 bg-white/5 border border-white/20 overflow-hidden relative shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] group">
            <img src="https://picsum.photos/400?random=10" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute bottom-4 left-4 z-10 font-medium drop-shadow-lg flex items-center gap-2">
              <ImageIcon size={16} /> Galeri
            </div>
          </motion.button>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { onOpenFiles(); onClose(); }} className="col-span-2 row-span-1 rounded-[24px] p-4 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border border-white/20 flex items-center gap-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]">
            <Folder size={24} className="text-yellow-200 drop-shadow-lg" />
            <span className="font-medium text-sm">Dosyalar</span>
          </motion.button>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="col-span-2 row-span-1 rounded-[24px] p-4 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 border border-white/20 flex items-center gap-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
            <Bot size={24} className="text-indigo-200 relative z-10 drop-shadow-lg" />
            <span className="font-medium text-sm relative z-10 text-left">Kanka AI</span>
          </motion.button>
          
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="col-span-2 row-span-2 rounded-[28px] p-4 bg-white/10 border border-white/20 flex flex-col justify-center items-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] group">
            <div className="w-16 h-16 rounded-[1.5rem] bg-blue-500/30 border border-blue-400/50 flex items-center justify-center mb-3 shadow-lg group-hover:bg-blue-500/40 transition-colors">
              <ShoppingBag size={32} className="text-blue-200 drop-shadow-md" />
            </div>
            <span className="font-medium text-sm tracking-wide">blue</span>
          </motion.button>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { onOpenSYPmail(); onClose(); }} className="col-span-2 row-span-1 rounded-[24px] p-4 bg-pink-500/20 border border-white/20 flex items-center gap-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]">
            <Mail size={24} className="text-pink-300 drop-shadow-lg" />
            <span className="font-medium text-sm">BitMail</span>
          </motion.button>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { onOpenResourceMonitor(); onClose(); }} className="col-span-2 row-span-1 rounded-[24px] p-4 bg-orange-500/20 border border-white/20 flex items-center gap-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]">
            <Activity size={24} className="text-orange-300 drop-shadow-lg" />
            <span className="font-medium text-sm text-left leading-tight">Kaynak<br/>İzleyicisi</span>
          </motion.button>

        </div>
      </div>
    </motion.div>
  );
}
