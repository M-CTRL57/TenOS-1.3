import { Folder, Settings, Power, Box, Search, Chrome } from 'lucide-react';

export default function Taskbar({ 
  onToggleStart,
  onOpenFiles, 
  onOpenSettings,
  onOpenAbout,
  onOpenBrowser,
  onShutdown,
  searchMode,
  setSearchMode
}: { 
  onToggleStart: () => void;
  onOpenFiles: () => void; 
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  onOpenBrowser: () => void;
  onShutdown: () => void; 
  searchMode: 'app' | 'internet';
  setSearchMode: (mode: 'app' | 'internet') => void;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#1a1a1a]/90 backdrop-blur-md border-t border-white/10 flex items-center px-2 gap-2 text-white z-50">
      <button onClick={onToggleStart} className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded flex items-center justify-center font-black text-xl hover:opacity-90">T</button>
      
      <div className="relative flex items-center w-64">
        <Search size={16} className="absolute left-3 text-white/50" />
        <input type="text" placeholder={searchMode === 'app' ? "Ara (Uygulama)..." : "Ara (İnternet)..."} className="bg-white/5 w-full h-9 rounded px-10 text-sm focus:outline-none focus:bg-white/10" />
        <button onClick={() => setSearchMode(searchMode === 'app' ? 'internet' : 'app')} className="absolute right-3 text-[10px] bg-white/10 px-1 rounded">{searchMode}</button>
      </div>

      <button onClick={onOpenFiles} className="hover:bg-white/10 p-2 rounded"><Folder size={20} /></button>
      <button onClick={onOpenSettings} className="hover:bg-white/10 p-2 rounded"><Settings size={20} /></button>
      <button onClick={onOpenAbout} className="hover:bg-white/10 p-2 rounded"><Box size={20} /></button>
      <button onClick={onOpenBrowser} className="hover:bg-white/10 p-2 rounded"><Chrome size={20} /></button>
      <div className="flex-1" />
      <button onClick={onShutdown} className="hover:bg-red-500/50 p-2 rounded text-red-400"><Power size={20} /></button>
    </div>
  );
}
