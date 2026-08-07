import { useState } from 'react';
import { HardDrive, Smartphone, Folder, Image as ImageIcon, Video, FileText, Music, Download, AlertCircle, Home as HomeIcon } from 'lucide-react';

export default function FilesApp({ onCrash, onClose }: { onCrash?: () => void; onClose?: () => void }) {
  const [currentPath, setCurrentPath] = useState<'home' | 'pc' | 'downloads' | 'pictures' | 'documents' | 'videos' | 'music' | 'gdrive'>('home');

  const renderHome = () => (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-white/50 text-sm mb-4 uppercase tracking-wider font-semibold">Klasörler</h3>
        <div className="grid grid-cols-4 gap-4">
          <button onClick={() => setCurrentPath('downloads')} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5">
            <Download size={40} className="text-blue-400" />
            <span className="text-sm font-medium">İndirilenler</span>
          </button>
          <button onClick={() => setCurrentPath('pictures')} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5">
            <ImageIcon size={40} className="text-purple-400" />
            <span className="text-sm font-medium">Fotoğraflar</span>
          </button>
          <button onClick={() => setCurrentPath('videos')} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5">
            <Video size={40} className="text-red-400" />
            <span className="text-sm font-medium">Videolar</span>
          </button>
          <button onClick={() => setCurrentPath('documents')} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5">
            <FileText size={40} className="text-green-400" />
            <span className="text-sm font-medium">Belgeler</span>
          </button>
          <button onClick={() => setCurrentPath('music')} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5">
            <Music size={40} className="text-yellow-400" />
            <span className="text-sm font-medium">Müzikler</span>
          </button>
          <button onClick={() => alert('İzin reddedildi.')} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5">
            <div className="w-10 h-10 flex justify-center items-center rounded-lg bg-white">
               <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5M9.73 3.5h13.12l-3.43 6H6.3M22.85 15l-3.43-6-6.56 11.5h13.12" fill="#FFC107"/>
                  <path d="M16.3 21H3.17l3.43-6h13.13" fill="#1976D2"/>
                  <path d="M22.85 15l-3.43-6-6.56 11.5h13.12" fill="#4CAF50"/>
               </svg>
            </div>
            <span className="text-sm font-medium">Google Drive</span>
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-white/50 text-sm mb-4 uppercase tracking-wider font-semibold">Son Kullanılanlar</h3>
        <div className="flex flex-col gap-2">
           <button onClick={() => onCrash?.()} className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg group text-left">
             <AlertCircle size={24} className="text-red-500" />
             <div className="flex-1">
               <div className="text-sm">Hackerlık Baba Pro.exe</div>
               <div className="text-xs text-white/50">İndirilenler</div>
             </div>
             <span className="text-xs text-white/30 hidden group-hover:block">10 dk önce</span>
           </button>
           <button className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg group text-left">
             <FileText size={24} className="text-white/80" />
             <div className="flex-1">
               <div className="text-sm">Not Defteri.txt</div>
               <div className="text-xs text-white/50">Belgeler</div>
             </div>
             <span className="text-xs text-white/30 hidden group-hover:block">1 saat önce</span>
           </button>
           <button className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg group text-left">
             <ImageIcon size={24} className="text-purple-400" />
             <div className="flex-1">
               <div className="text-sm">IMG_921.jpg</div>
               <div className="text-xs text-white/50">Fotoğraflar</div>
             </div>
             <span className="text-xs text-white/30 hidden group-hover:block">Dün</span>
           </button>
        </div>
      </div>
    </div>
  );

  const renderPC = () => (
    <div className="p-6 space-y-6">
      <button className="w-full bg-white/[0.03] border border-white/5 p-4 rounded-xl flex items-center gap-4 hover:bg-white/[0.08] text-left transition">
        <Smartphone size={40} className="text-blue-400" />
        <div className="flex-1">
          <h3 className="text-md font-semibold mb-1">Güvenli Depolama Birimi (SD)</h3>
          <div className="w-full bg-black/50 h-3 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full" style={{ width: '4.8%' }}></div>
          </div>
          <p className="text-xs text-white/50 mt-1">24 GB kullanılıyor / 500 GB</p>
        </div>
      </button>
      <button 
        onClick={() => {
          alert('Sistem dosyalarını yükleyemiyor... Neden bu kadar saçma bir şey dedim ben?');
          onClose?.();
        }}
        className="w-full bg-white/[0.03] border border-white/5 p-4 rounded-xl flex items-center gap-4 hover:bg-white/[0.08] text-left transition"
      >
        <HardDrive size={40} className="text-green-400" />
        <div className="flex-1">
          <h3 className="text-md font-semibold mb-1">C: Yerel Disk (SSD)</h3>
          <div className="w-full bg-black/50 h-3 rounded-full overflow-hidden">
            <div className="bg-green-600 h-full" style={{ width: '0%' }}></div>
          </div>
          <p className="text-xs text-white/50 mt-1">0 GB kullanılıyor / 1000 GB</p>
        </div>
      </button>
    </div>
  );

  const renderFolderContent = () => {
    switch (currentPath) {
      case 'downloads':
        return (
          <div className="flex flex-col items-start gap-4 p-6">
            <button onDoubleClick={() => onCrash?.()} className="flex flex-col items-center gap-2 w-24 p-2 hover:bg-white/10 rounded">
              <AlertCircle size={48} className="text-red-500" />
              <span className="text-xs text-center break-words">Hackerlık Baba Pro.exe</span>
            </button>
          </div>
        );
      case 'pictures':
        return (
          <div className="flex gap-4 p-6 flex-wrap">
            <div className="w-24 h-24 bg-cover bg-center rounded cursor-pointer" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1542385151-efd9000785a0?w=200)'}}></div>
            <div className="w-24 h-24 bg-cover bg-center rounded cursor-pointer" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=200)'}}></div>
            <div className="w-24 h-24 bg-cover bg-center rounded cursor-pointer" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=200)'}}></div>
          </div>
        );
      case 'documents':
        return (
          <div className="flex flex-col items-start gap-4 p-6">
            <button className="flex flex-col items-center gap-2 w-24 p-2 hover:bg-white/10 rounded">
              <FileText size={48} className="text-white/80" />
              <span className="text-xs text-center break-words">Not Defteri.txt</span>
            </button>
          </div>
        );
      default:
        return (
          <div className="flex justify-center items-center h-full text-white/40">
            Klasör boş
          </div>
        );
    }
  };

  return (
    <div className="h-full flex bg-[#111] text-[#e0e0e0] font-sans">
      <div className="w-48 bg-[#0a0a0a] border-r border-white/10 flex flex-col p-2 space-y-1" style={{ height: '550px', width: '193px' }}>
        <button 
          onClick={() => setCurrentPath('home')}
          className={`flex items-center gap-3 p-2 rounded w-full text-left transition ${currentPath === 'home' ? 'bg-white/10' : 'hover:bg-white/5'}`}
        >
          <HomeIcon size={18} /> Ana Menü
        </button>
        <button 
          onClick={() => setCurrentPath('pc')}
          className={`flex items-center gap-3 p-2 rounded w-full text-left transition ${currentPath === 'pc' ? 'bg-white/10' : 'hover:bg-white/5'}`}
        >
          <HardDrive size={18} /> Bu Bilgisayar
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="h-10 border-b border-white/10 flex items-center px-4 bg-[#151515]">
          <span className="text-xs text-white/50">{currentPath === 'home' ? 'Masaüstü > Ana Menü' : currentPath === 'pc' ? 'Masaüstü > Bu Bilgisayar' : `Masaüstü > ${currentPath}`}</span>
        </div>
        {currentPath === 'home' && renderHome()}
        {currentPath === 'pc' && renderPC()}
        {['downloads', 'pictures', 'documents', 'videos', 'music', 'gdrive'].includes(currentPath) && renderFolderContent()}
      </div>
    </div>
  );
}
