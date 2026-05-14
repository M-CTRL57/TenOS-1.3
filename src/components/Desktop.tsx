import { Trash2, Activity, Skull, Code, Terminal, FileEdit, FileText, RefreshCw, PlayCircle, Folder, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

const initialIcons = [
  { id: 'trash', icon: Trash2, label: 'Çöp Kutusu', type: 'lucide', color: 'text-white/40', bg: 'bg-white/[0.03]', hoverBg: 'hover:bg-white/[0.06]' },
  { id: 'steam', icon: 'Steam', label: 'Steam', type: 'svg', action: 'onOpenSteam' },
  { id: 'resource', icon: Activity, label: 'MKS Kaynak', type: 'lucide', color: 'text-orange-400', bg: 'bg-orange-600/20', hoverBg: 'hover:bg-orange-600/40', border: 'border-orange-500/30' },
  { id: 'hacker', icon: Skull, label: 'HüsnüHacker°', type: 'lucide', color: 'text-red-500', bg: 'bg-black', hoverBg: 'hover:bg-[#111]', border: 'border-red-500/30', shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.1)]', action: 'onOpenHackerBrowser' },
  { id: 'code', icon: Code, label: 'TenOS Code', type: 'lucide', color: 'text-[#007acc]', bg: 'bg-[#1e1e1e]/80', hoverBg: 'hover:bg-[#1e1e1e]', border: 'border-blue-500/30', shadow: 'shadow-lg' },
  { id: 'debug', icon: Terminal, label: 'Debug Konsol', type: 'lucide', color: 'text-[#00ff00]', bg: 'bg-black', hoverBg: 'hover:bg-[#111]', border: 'border-[#00ff00]/30', shadow: 'shadow-[0_0_10px_rgba(0,255,0,0.1)]', action: 'onOpenDebugConsole' },
  { id: 'markdown', icon: FileEdit, label: 'Not Defteri', type: 'lucide', color: 'text-blue-400', bg: 'bg-blue-900/20', hoverBg: 'hover:bg-blue-900/40', border: 'border-blue-500/30', action: 'onOpenMarkdownNotes' },
  { id: 'pdf', icon: FileText, label: 'PDF Grnt.', type: 'lucide', color: 'text-red-400', bg: 'bg-red-900/20', hoverBg: 'hover:bg-red-900/40', border: 'border-red-500/30', action: 'onOpenPdfViewer' },
  { id: 'tplayer', icon: PlayCircle, label: 'Tplayer¿', type: 'lucide', color: 'text-purple-400', bg: 'bg-purple-900/20', hoverBg: 'hover:bg-purple-900/40', border: 'border-purple-500/30', action: 'onOpenTPlayer' },
  { id: 'sypmail', icon: Mail, label: 'SYPmail', type: 'lucide', color: 'text-pink-400', bg: 'bg-pink-900/20', hoverBg: 'hover:bg-pink-900/40', border: 'border-pink-500/30', action: 'onOpenSYPmail' },
];

const funnyNames = [
  "Gizli Planlar", "Kesinlikle Virüs Değil", "Bozuk Kısayol",
  "Kedili Videolar", "Adsız Klasör (42)", "Açma Sakın!",
  "Çok Gizli", "Saçma Sapan Dosya", "Silinmeyen Dosya"
];

export default function Desktop({ ...props }: any) {
  const [icons, setIcons] = useState(initialIcons);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setIcons(prev => {
           const newIcons = [...prev];
           // Only rename non-trash, non-static major icons if possible, or just any random icon except 0
           const randomIndex = Math.floor(Math.random() * (newIcons.length - 1)) + 1;
           newIcons[randomIndex] = {
             ...newIcons[randomIndex],
             label: funnyNames[Math.floor(Math.random() * funnyNames.length)]
           };
           return newIcons;
        });
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('iconIndex', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('iconIndex'));
    if(isNaN(dragIndex) || dragIndex === dropIndex) return;
    
    if (icons[dropIndex].id === 'trash') {
       props.onTrashDrop?.();
       // don't actually remove so they can keep playing
       return;
    }

    const newIcons = [...icons];
    const dragItem = newIcons[dragIndex];
    newIcons.splice(dragIndex, 1);
    newIcons.splice(dropIndex, 0, dragItem);
    setIcons(newIcons);
  };

  return (
    <div 
      className="w-full h-full text-[#e0e0e0] p-6 pt-12 relative bg-cover bg-center"
      style={{ backgroundImage: props.wallpaper ? `url(${props.wallpaper})` : 'none', backgroundColor: '#050505' }}
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenu(null)}
    >
      <div className="flex flex-col flex-wrap h-full content-start gap-6">
        {icons.map((item, index) => (
          <div 
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDoubleClick={() => item.action && props[item.action]?.()}
            className="flex flex-col items-center gap-2 cursor-pointer group w-24 active:opacity-50"
          >
            {item.type === 'svg' ? (
              <div className="p-3.5 bg-gradient-to-br from-[#1b2838] to-[#2a475e] rounded-xl group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(27,40,56,0.3)] group-hover:shadow-[0_0_20px_rgba(102,192,244,0.5)]">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="white" className="text-white drop-shadow">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 4.968 3.013 9.23 7.378 11.026l2.365-3.447c-.125-.333-.186-.684-.159-1.042l-3.32-1.378c-.01.127-.03.247-.03.385 0 2.228 1.808 4.038 4.036 4.038 2.23 0 4.04-1.81 4.04-4.038 0-2.228-1.81-4.04-4.04-4.04-.337 0-.66.04-.967.118l-1.39-3.355c1.472-.378 2.505-1.743 2.505-3.38 0-1.92-1.558-3.48-3.48-3.48S2.99 4.966 2.99 6.887c0 1.92 1.558 3.478 3.48 3.478 1.135 0 2.143-.547 2.766-1.39l3.353 1.39c-.078.307-.117.63-.117.967 0 2.228 1.807 4.036 4.035 4.036 2.228 0 4.038-1.808 4.038-4.036s-1.81-4.038-4.038-4.038c-1.636 0-3.003 1.033-3.38 2.505l-3.45-2.365C8.01 1.77 12 0 12 0zm-8.52 6.886c0-1.764 1.432-3.197 3.197-3.197 1.765 0 3.2 1.433 3.2 3.197 0 1.765-1.435 3.198-3.2 3.198-1.765 0-3.197-1.433-3.197-3.198zm11.758 7.37c-.328 0-.64-.066-.928-.182l-2.094 5.045c.99.308 2.062.308 3.053 0l-2.094-5.044c-.287.115-.6.18-.928.18zm-2.096-2.144l-2.05-4.94c-.22.185-.482.327-.77.412l3.208 4.414c-.13.036-.263.054-.398.054.12 0 .238-.01.355-.03l-3.207-4.41c.216-.184.4-.413.542-.676l4.908 2.036c-.083.29-.226.55-.41.77l-4.912-2.035c.184.215.412.398.674.54l4.412 3.207c-.02-.117-.03-.235-.03-.355 0-.135.018-.268.055-.398l-4.415-3.208c.185-.224.327-.487.41-.774l4.94 2.05c.002.046.007.09.007.135 0 .807-.655 1.464-1.464 1.464-.808 0-1.464-.657-1.464-1.464z" />
                </svg>
              </div>
            ) : (
              <div className={`p-4 rounded-xl transition-all border border-transparent ${item.bg} ${item.hoverBg} ${item.border || ''} ${item.shadow || ''}`}>
                {item.type === 'lucide' && item.icon && (
                   <item.icon size={36} className={`${item.color}`} />
                )}
              </div>
            )}
            <span className={`text-xs tracking-wider font-semibold text-center drop-shadow-md line-clamp-2 leading-tight ${item.color && item.color.includes('text-[#') ? item.color : ''}`}>{item.label}</span>
          </div>
        ))}
      </div>

      {contextMenu && (
        <div 
          className="absolute bg-[#1e1e1e] border border-[#333] shadow-lg rounded-md py-1 min-w-[150px] z-50 text-sm select-none"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 cursor-pointer"
            onClick={() => {
              props.onRefresh?.();
              setContextMenu(null);
            }}
          >
            <RefreshCw size={14} />
            Ekrani Yenile
          </div>
          <div className="h-px bg-[#333] my-1 mx-2"></div>
          <div className="px-4 py-1 text-xs text-gray-500 uppercase">Yeni</div>
          <div 
            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 cursor-pointer"
            onClick={() => {
              setIcons(prev => [...prev, { id: `folder-${Date.now()}`, icon: Folder, label: 'Yeni Klasör', type: 'lucide', color: 'text-yellow-400', bg: 'bg-yellow-900/20', hoverBg: 'hover:bg-yellow-900/40' }]);
              setContextMenu(null);
            }}
          >
            <Folder size={14} />
            Klasör Oluştur
          </div>
          <div 
            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 cursor-pointer"
            onClick={() => {
              setIcons(prev => [...prev, { id: `note-${Date.now()}`, icon: FileEdit, label: 'Yeni Not', type: 'lucide', color: 'text-blue-400', bg: 'bg-blue-900/20', hoverBg: 'hover:bg-blue-900/40', border: 'border-blue-500/30', action: 'onOpenMarkdownNotes' }]);
              setContextMenu(null);
            }}
          >
            <FileEdit size={14} />
            Not Defteri Oluştur
          </div>
        </div>
      )}
    </div>
  );
}
