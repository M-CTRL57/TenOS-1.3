
import { Folder, Settings, Power, Monitor, User, X, RefreshCw, AlertTriangle, Cpu, RotateCcw, Camera, Image as ImageIcon, Smartphone, Chrome, Code, Terminal, FileEdit, FileText, PlayCircle, Mail } from 'lucide-react';
import { motion } from 'motion/react';
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
}: { 
  onClose: () => void;
  onOpenFiles: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  onOpenBrowser: () => void;
  onOpenCamera: () => void;
  onOpenGallery: () => void;
  onOpenSteam: () => void;
  onOpenResourceMonitor: () => void;
  onOpenHackerBrowser?: () => void;
  onOpenCodeEditor?: () => void;
  onOpenDebugConsole?: () => void;
  onOpenMarkdownNotes?: () => void;
  onOpenPdfViewer?: () => void;
  onOpenTPlayer?: () => void;
  onOpenSYPmail?: () => void;
  onShutdown: () => void;
  userProfile: { name: string, photo: string };
  setUserProfile: (prev: any) => void;
}) {
  const [view, setView] = useState<'home' | 'user' | 'photo'>('home');
  const [newName, setNewName] = useState(userProfile.name);

  if (view === 'photo') return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl z-50 flex flex-col p-8">
          <button onClick={() => setView('user')} className="self-start text-white/50">Geri</button>
          <div className="grid grid-cols-3 gap-4 mt-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                  <button key={i} onClick={() => { setUserProfile({...userProfile, photo: `https://picsum.photos/200?random=${i}`}); setView('user'); }} className="h-40 bg-white/5 rounded-none overflow-hidden">
                      <img src={`https://picsum.photos/200?random=${i}`} className="w-full h-full object-cover" />
                  </button>
              ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
              <button className="p-4 bg-white/5 rounded-none flex flex-col items-center hover:bg-white/10 transition-colors"><Smartphone size={32} className="mb-2"/>Cihaz</button>
              <button onClick={() => { onOpenCamera(); onClose(); }} className="p-4 bg-white/5 rounded-none flex flex-col items-center hover:bg-white/10 transition-colors"><Camera size={32} className="mb-2"/>Kamera</button>
              <button onClick={() => { onOpenGallery(); onClose(); }} className="p-4 bg-white/5 rounded-none flex flex-col items-center hover:bg-white/10 transition-colors"><ImageIcon size={32} className="mb-2"/>Galeri</button>
          </div>
      </motion.div>
  );

  if (view === 'user') return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl z-50 flex flex-col p-8">
        <button onClick={() => setView('home')} className="self-start text-white/50">Geri</button>
        <div className="flex flex-col items-center mt-8 gap-4">
            <img src={userProfile.photo} className="w-32 h-32 rounded-full" />
            <button onClick={() => setView('photo')} className="text-sm text-blue-400">Fotoğrafı Değiştir</button>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} className="bg-white/5 p-2 rounded text-center w-64" />
            <button onClick={() => setUserProfile({...userProfile, name: newName})} className="bg-blue-600 px-4 py-2 rounded">İsmi Kaydet</button>
            <button className="text-white/50 text-sm mt-4">Şifreyi Değiştir</button>
        </div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl z-50 flex flex-col p-8"
    >
      <div className="flex justify-between items-start mb-8 text-white relative">
        <h1 className="text-5xl font-light tracking-[0.2em] uppercase ml-4 mt-4 select-none">BAŞLANGIÇ</h1>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-none transition-colors"><X size={32} /></button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 w-full max-w-4xl mx-auto flex-1 auto-rows-min mt-4">
        <button onClick={onClose} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-white/[0.05] hover:bg-white/20 transition-all text-left rounded-none">
          <Monitor size={24} className="mb-2" />
          <span className="text-sm">Masaüstü</span>
        </button>
        <button onClick={() => { onOpenFiles(); onClose(); }} className="col-span-1 row-span-2 flex flex-col justify-end p-6 bg-[#ff0000] hover:bg-[#cc0000] transition-all text-left rounded-none">
          <Folder size={32} className="mb-2" />
          <span className="text-xl font-semibold">Dosyalar</span>
        </button>
        <button onClick={() => { onOpenSettings(); onClose(); }} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-gray-600/80 hover:bg-gray-600 transition-all text-left rounded-none">
          <Settings size={24} className="mb-2" />
          <span className="text-sm">Ayarlar</span>
        </button>
        <button onClick={() => { onOpenBrowser(); onClose(); }} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-white/10 hover:bg-white/20 transition-all text-left rounded-none">
          <Chrome size={24} className="mb-2 text-blue-400" />
          <span className="text-sm">Chrome</span>
        </button>
        <button onClick={() => { onOpenCamera(); onClose(); }} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-[#ff6e00] hover:bg-[#cc5800] transition-all text-left rounded-none">
          <Camera size={24} className="mb-2" />
          <span className="text-sm">Kamera</span>
        </button>
        <button onClick={() => { onOpenGallery(); onClose(); }} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-purple-600/80 hover:bg-purple-600 transition-all text-left rounded-none">
          <ImageIcon size={24} className="mb-2" />
          <span className="text-sm">Galeri</span>
        </button>
        <button onClick={() => { onOpenResourceMonitor(); onClose(); }} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-orange-600/80 hover:bg-orange-600 transition-all text-left rounded-none">
          <Cpu size={24} className="mb-2" />
          <span className="text-sm">Kaynak İzleyicisi</span>
        </button>
        <button onClick={() => { onOpenCodeEditor?.(); onClose(); }} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-[#1e1e1e]/90 hover:bg-[#1e1e1e] border border-blue-500/50 transition-all text-left rounded-none">
          <Code size={24} className="mb-2 text-[#007acc]" />
          <span className="text-sm">TenOS Code</span>
        </button>
        <button onClick={() => { onOpenHackerBrowser?.(); onClose(); }} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-black/80 hover:bg-[#111] border border-red-500/50 transition-all text-left rounded-none">
          <Terminal size={24} className="mb-2 text-red-500" />
          <span className="text-sm text-red-500 font-bold uppercase tracking-widest">HüsnüHacker°</span>
        </button>
        <button onClick={() => { onOpenSteam(); onClose(); }} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-[#1b2838]/90 hover:bg-[#2a475e] transition-all text-left rounded-none">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="mb-2 text-[#66c0f4]">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 4.968 3.013 9.23 7.378 11.026l2.365-3.447c-.125-.333-.186-.684-.159-1.042l-3.32-1.378c-.01.127-.03.247-.03.385 0 2.228 1.808 4.038 4.036 4.038 2.23 0 4.04-1.81 4.04-4.038 0-2.228-1.81-4.04-4.04-4.04-.337 0-.66.04-.967.118l-1.39-3.355c1.472-.378 2.505-1.743 2.505-3.38 0-1.92-1.558-3.48-3.48-3.48S2.99 4.966 2.99 6.887c0 1.92 1.558 3.478 3.48 3.478 1.135 0 2.143-.547 2.766-1.39l3.353 1.39c-.078.307-.117.63-.117.967 0 2.228 1.807 4.036 4.035 4.036 2.228 0 4.038-1.808 4.038-4.036s-1.81-4.038-4.038-4.038c-1.636 0-3.003 1.033-3.38 2.505l-3.45-2.365C8.01 1.77 12 0 12 0zm-8.52 6.886c0-1.764 1.432-3.197 3.197-3.197 1.765 0 3.2 1.433 3.2 3.197 0 1.765-1.435 3.198-3.2 3.198-1.765 0-3.197-1.433-3.197-3.198zm11.758 7.37c-.328 0-.64-.066-.928-.182l-2.094 5.045c.99.308 2.062.308 3.053 0l-2.094-5.044c-.287.115-.6.18-.928.18zm-2.096-2.144l-2.05-4.94c-.22.185-.482.327-.77.412l3.208 4.414c-.13.036-.263.054-.398.054.12 0 .238-.01.355-.03l-3.207-4.41c.216-.184.4-.413.542-.676l4.908 2.036c-.083.29-.226.55-.41.77l-4.912-2.035c.184.215.412.398.674.54l4.412 3.207c-.02-.117-.03-.235-.03-.355 0-.135.018-.268.055-.398l-4.415-3.208c.185-.224.327-.487.41-.774l4.94 2.05c.002.046.007.09.007.135 0 .807-.655 1.464-1.464 1.464-.808 0-1.464-.657-1.464-1.464z" />
          </svg>
          <span className="text-sm">Steam</span>
        </button>
        <button onClick={() => { onOpenDebugConsole?.(); onClose(); }} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-black/80 hover:bg-[#111] border border-[#00ff00] transition-all text-left rounded-none">
          <Terminal size={24} className="mb-2 text-[#00ff00]" />
          <span className="text-sm text-[#00ff00]">Debug</span>
        </button>
        <button onClick={() => { onOpenMarkdownNotes?.(); onClose(); }} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-blue-900/80 hover:bg-blue-900 transition-all text-left rounded-none">
          <FileEdit size={24} className="mb-2 text-blue-300" />
          <span className="text-sm">Not Defteri</span>
        </button>
        <button onClick={() => { onOpenPdfViewer?.(); onClose(); }} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-red-900/80 hover:bg-red-900 transition-all text-left rounded-none">
          <FileText size={24} className="mb-2 text-red-300" />
          <span className="text-sm">PDF Görüntüleyici</span>
        </button>
        <button onClick={() => { onOpenTPlayer?.(); onClose(); }} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-purple-900/80 hover:bg-purple-900 transition-all text-left rounded-none">
          <PlayCircle size={24} className="mb-2 text-purple-300" />
          <span className="text-sm">Tplayer¿</span>
        </button>
        <button onClick={() => { onOpenSYPmail?.(); onClose(); }} className="col-span-1 row-span-1 flex flex-col justify-end p-4 bg-[#7a1b38]/90 hover:bg-[#a62b4e] transition-all text-left rounded-none">
          <Mail size={24} className="mb-2 text-[#fcb1c7]" />
          <span className="text-sm">SYPmail</span>
        </button>
        <button onClick={() => { onOpenAbout(); onClose(); }} className="col-span-2 row-span-1 flex flex-col justify-end p-6 bg-green-600/80 hover:bg-green-600 transition-all text-left relative rounded-none">
          <div className="absolute top-4 right-4 flex items-center">
            <Monitor size={20} />
            <span className="ml-1 text-xs font-bold">i</span>
          </div>
          <span className="text-lg font-semibold mt-auto">Bilgisayar Hakkında</span>
        </button>
        <button onClick={onShutdown} className="col-span-2 row-span-1 flex flex-col justify-end p-6 bg-red-600/80 hover:bg-red-600 transition-all text-left rounded-none">
          <Power size={24} className="mb-2" />
          <span className="text-lg">Kapat / Yeniden Başlat</span>
        </button>
      </div>

      <div className="mt-auto flex justify-start items-center p-4">
        <button onClick={() => setView('user')} className="flex items-center gap-4 p-4 bg-white/[0.03] hover:bg-white/[0.08] transition-all rounded-none ring-1 ring-white/10 uppercase tracking-wider text-sm font-bold">
          <div className="bg-white/10 p-2 rounded-none">
            <img src={userProfile.photo} className="w-8 h-8 object-cover rounded-none" />
          </div>
          <span className="font-semibold text-lg">{userProfile.name}</span>
        </button>
      </div>
    </motion.div>
  );
}
