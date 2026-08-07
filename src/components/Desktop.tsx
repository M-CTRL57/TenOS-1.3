import { 
  Trash2, Activity, Skull, Code, Terminal, FileEdit, FileText, 
  RefreshCw, PlayCircle, Folder, Mail, Info, CloudSun, Calendar, Cpu 
} from 'lucide-react';
import { useState, useEffect } from 'react';

const initialIcons = [
  { id: 'trash', icon: Trash2, label: 'Çöp Kutusu', type: 'lucide', color: 'text-white/40', bg: 'bg-white/[0.03]', hoverBg: 'hover:bg-white/[0.06]', action: 'onTrashDrop' },
  { id: 'info', icon: Info, label: 'Hakkında', type: 'lucide', color: 'text-blue-400', bg: 'bg-blue-500/10', hoverBg: 'hover:bg-blue-500/20', action: 'onOpenInfo' },
  { id: 'steam', icon: 'Steam', label: 'Steam', type: 'svg', action: 'onOpenSteam' },
  { id: 'resource', icon: Activity, label: 'MKS Kaynak', type: 'lucide', color: 'text-orange-400', bg: 'bg-orange-600/20', hoverBg: 'hover:bg-orange-600/40', border: 'border-orange-500/30', action: 'onOpenResourceMonitor' },
  { id: 'hacker', icon: Skull, label: 'HüsnüHacker°', type: 'lucide', color: 'text-red-500', bg: 'bg-black', hoverBg: 'hover:bg-[#111]', border: 'border-red-500/30', shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.1)]', action: 'onOpenHackerBrowser' },
  { id: 'code', icon: Code, label: 'TenOS Code', type: 'lucide', color: 'text-[#007acc]', bg: 'bg-[#1e1e1e]/80', hoverBg: 'hover:bg-[#1e1e1e]', border: 'border-blue-500/30', shadow: 'shadow-lg', action: 'onOpenCodeEditor' },
  { id: 'debug', icon: Terminal, label: 'Debug Konsol', type: 'lucide', color: 'text-[#00ff00]', bg: 'bg-black', hoverBg: 'hover:bg-[#111]', border: 'border-[#00ff00]/30', shadow: 'shadow-[0_0_10px_rgba(0,255,0,0.1)]', action: 'onOpenDebugConsole' },
  { id: 'markdown', icon: FileEdit, label: 'Not Defteri', type: 'lucide', color: 'text-blue-400', bg: 'bg-blue-900/20', hoverBg: 'hover:bg-blue-900/40', border: 'border-blue-500/30', action: 'onOpenMarkdownNotes' },
  { id: 'kanka', icon: 'Bot', label: 'Kanka AI', type: 'custom', action: 'onOpenKankaAI', 
    render: () => (
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.3)] backdrop-blur-md flex items-center justify-center transition-all group-hover:scale-105">
        <span className="text-3xl leading-none">🤖</span>
      </div>
    ) 
  },
  { id: 'pdf', icon: FileText, label: 'Evrakın', type: 'lucide', color: 'text-red-400', bg: 'bg-red-900/20', hoverBg: 'hover:bg-red-900/40', border: 'border-red-500/30', action: 'onOpenPdfViewer' },
  { id: 'tplayer', icon: PlayCircle, label: 'OynatBunu', type: 'lucide', color: 'text-purple-400', bg: 'bg-purple-900/20', hoverBg: 'hover:bg-purple-900/40', border: 'border-purple-500/30', action: 'onOpenTPlayer' },
  { id: 'sypmail', icon: Mail, label: 'BitMail', type: 'lucide', color: 'text-pink-400', bg: 'bg-pink-900/20', hoverBg: 'hover:bg-pink-900/40', border: 'border-pink-500/30', action: 'onOpenSYPmail' },
];

const funnyNames = [
  "Gizli Planlar", "Kesinlikle Virüs Değil", "Bozuk Kısayol",
  "Kedili Videolar", "Adsız Klasör (42)", "Açma Sakın!",
  "Çok Gizli", "Saçma Sapan Dosya", "Silinmeyen Dosya"
];

export default function Desktop({ installedApps = [], customApps = [], ...props }: any) {
  const [icons, setIcons] = useState<any[]>(initialIcons);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);

  useEffect(() => {
    // When installedApps changes, add new icons
    const newIcons = [...initialIcons];
    
    if (installedApps.includes('store')) {
      newIcons.push({ 
        id: 'store', 
        icon: 'ShoppingBag', 
        label: 'blue', 
        type: 'custom', 
        action: 'onOpenStore',
        render: () => (
          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-md flex items-center justify-center transition-all group-hover:bg-blue-500/30">
            <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
        )
      });
    }
    if (installedApps.includes('calculator')) {
      newIcons.push({ id: 'calculator', icon: '🧮', label: 'Hesap Makinesi', type: 'emoji', action: 'onOpenCalculator' });
    }
    if (installedApps.includes('texteditor')) {
      newIcons.push({ id: 'texteditor', icon: '📝', label: 'Metin Editörü', type: 'emoji', action: 'onOpenTextEditor' });
    }
    if (installedApps.includes('snake')) {
      newIcons.push({ id: 'snake', icon: '🐍', label: 'Yılan Oyunu', type: 'emoji', action: 'onOpenSnake' });
    }
    
    // PWA Support
    if (installedApps.includes('wikipedia')) {
      newIcons.push({ id: 'wikipedia', icon: '📖', label: 'Vikipedi PWA', type: 'emoji', action: 'onOpenWikipedia' });
    }

    // Append developer Custom Apps
    const devApps = customApps || [];
    devApps.forEach((cApp: any) => {
      newIcons.push({ 
        id: cApp.id, 
        icon: cApp.icon, 
        label: cApp.name, 
        type: 'emoji', 
        action: `onOpenCustomApp_${cApp.id}` 
      });
    });
    
    // Merge existing custom names for standard icons with the newly added
    setIcons(prev => {
      return newIcons.map(ni => {
        const existing = prev.find(p => p.id === ni.id);
        if (existing) return { ...ni, label: (existing as any).label, x: (existing as any).x, y: (existing as any).y };
        return ni;
      });
    });
  }, [installedApps, customApps]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setIcons(prev => {
           const newIcons = [...prev];
           const randomIndex = Math.floor(Math.random() * (newIcons.length - 1)) + 1;
           // Verify check bounds
           if (newIcons[randomIndex]) {
             newIcons[randomIndex] = {
               ...newIcons[randomIndex],
               label: funnyNames[Math.floor(Math.random() * funnyNames.length)]
             };
           }
           return newIcons;
        });
      }
    }, 10000);

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
        return;
    }

    const newIcons = [...icons];
    const dragItem = newIcons[dragIndex];
    newIcons.splice(dragIndex, 1);
    newIcons.splice(dropIndex, 0, dragItem);
    setIcons(newIcons);
  };

  // Widget activity scanning
  const isWeatherActive = installedApps.includes('weather-widget');
  const isCalendarActive = installedApps.includes('calendar-widget');
  const isSystemActive = installedApps.includes('system-widget');
  const displayWidgetsArea = isWeatherActive || isCalendarActive || isSystemActive;

  return (
    <div 
      className="w-full h-full text-[#e0e0e0] p-6 pt-12 relative bg-cover bg-center select-none"
      style={{ backgroundImage: props.wallpaper ? `url(${props.wallpaper})` : 'none', backgroundColor: '#050505' }}
      onContextMenu={handleContextMenu}
      onClick={() => { setContextMenu(null); setSelectedIconId(null); }}
    >
      {/* Outer Grid: Desktop has icons on left, active widgets on right */}
      <div className="flex w-full h-full justify-between items-start">
        
        {/* Desktop Icons Area */}
        <div className="flex flex-col flex-wrap h-full content-start gap-4 z-10">
          {icons.map((item, index) => {
            const isSelected = selectedIconId === item.id;
            return (
              <div 
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIconId(item.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  if (item.action) {
                    if (item.action.startsWith('onOpenCustomApp_')) {
                      const customId = item.action.replace('onOpenCustomApp_', '');
                      props.onOpenCustomApp?.(customId);
                    } else {
                      props[item.action]?.();
                    }
                  }
                  setSelectedIconId(null);
                }}
                className={`flex flex-col items-center gap-1.5 cursor-pointer group w-20 active:opacity-50 select-none pb-2 text-center p-1 rounded-xl transition-all duration-150 ${
                  isSelected 
                    ? 'bg-blue-500/15 ring-2 ring-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.25)]' 
                    : 'hover:bg-white/[0.04]'
                }`}
              >
                {item.type === 'custom' && item.render ? (
                  item.render()
                ) : item.type === 'svg' ? (
                  <div className="p-3 bg-gradient-to-br from-[#1b2838] to-[#2a475e] rounded-xl group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(27,40,56,0.3)] group-hover:shadow-[0_0_20px_rgba(102,192,244,0.5)]">
                    <svg viewBox="0 0 24 24" width="34" height="34" fill="white" className="text-white drop-shadow">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 4.968 3.013 9.23 7.378 11.026l2.365-3.447c-.125-.333-.186-.684-.159-1.042l-3.32-1.378c-.01.127-.03.247-.03.385 0 2.228 1.808 4.038 4.036 4.038 2.23 0 4.04-1.81 4.04-4.038 0-2.228-1.81-4.04-4.04-4.04-.337 0-.66.04-.967.118l-1.39-3.355c1.472-.378 2.505-1.743 2.505-3.38 0-1.92-1.558-3.48-3.48-3.48S2.99 4.966 2.99 6.887c0 1.92 1.558 3.478 3.48 3.478 1.135 0 2.143-.547 2.766-1.39l3.353 1.39c-.078.307-.117.63-.117.967 0 2.228 1.807 4.036 4.035 4.036 2.228 0 4.038-1.808 4.038-4.036s-1.81-4.038-4.038-4.038c-1.636 0-3.003 1.033-3.38 2.505l-3.45-2.365C8.01 1.77 12 0 12 0zm-8.52 6.886c0-1.764 1.432-3.197 3.197-3.197 1.765 0 3.2 1.433 3.2 3.197 0 1.765-1.435 3.198-3.2 3.198-1.765 0-3.197-1.433-3.197-3.198zm11.758 7.37c-.328 0-.64-.066-.928-.182l-2.094 5.045c.99.308 2.062.308 3.053 0l-2.094-5.044c-.287.115-.6.18-.928.18zm-2.096-2.144l-2.05-4.94c-.22.185-.482.327-.77.412l3.208 4.414c-.13.036-.263.054-.398.054.12 0 .238-.01.355-.03l-3.207-4.41c.216-.184.4-.413.542-.676l4.908 2.036c-.083.29-.226.55-.41.77l-4.912-2.035c.184.215.412.398.674.54l4.412 3.207c-.02-.117-.03-.235-.03-.355 0-.135.018-.268.055-.398l-4.415-3.208c.185-.224.327-.487.41-.774l4.94 2.05c.002.046.007.09.007.135 0 .807-.655 1.464-1.464 1.464-.808 0-1.464-.657-1.464-1.464z" />
                    </svg>
                  </div>
                ) : item.type === 'emoji' ? (
                  <div className="p-3.5 rounded-xl transition-all border border-slate-800 bg-black/40 hover:bg-black/60 shadow-lg flex items-center justify-center w-[58px] h-[58px] group-hover:scale-105 border border-white/5">
                    <span className="text-3xl leading-none">{item.icon as any}</span>
                  </div>
                ) : (
                  <div className={`p-3.5 rounded-xl transition-all border border-transparent ${item.bg} ${item.hoverBg} ${item.border || ''} ${item.shadow || ''} group-hover:scale-105`}>
                    {item.type === 'lucide' && item.icon && (
                       <item.icon size={26} className={`${item.color}`} />
                    )}
                  </div>
                )}
                <span className="text-[10px] tracking-wider font-semibold text-slate-100 max-w-[80px] leading-tight drop-shadow-md truncate block w-full">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Desktop Widgets Column Pinned on the Right Side */}
        {displayWidgetsArea && (
          <div className="hidden lg:flex w-72 flex-col gap-4 self-stretch overflow-y-auto pr-2 pt-1 z-10 custom-scrollbar pointer-events-auto">
            {isWeatherActive && <WeatherWidget />}
            {isCalendarActive && <CalendarWidget />}
            {isSystemActive && <SystemWidget />}
          </div>
        )}

      </div>

      {contextMenu && (
        <div 
          className="absolute bg-[#11131c] border border-slate-800 shadow-xl rounded-xl py-1.5 min-w-[160px] z-[999] text-xs font-semibold select-none text-slate-300"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="flex items-center gap-2.5 px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
            onClick={() => {
              props.onRefresh?.();
              setContextMenu(null);
            }}
          >
            <RefreshCw size={13} />
            Ekranı Yenile
          </div>
          <div className="h-px bg-slate-800 my-1 mx-2"></div>
          <div className="px-4 py-1 text-[9px] text-slate-500 uppercase tracking-widest">Yeni Ekle</div>
          <div 
            className="flex items-center gap-2.5 px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
            onClick={() => {
              setIcons(prev => [...prev, { id: `folder-${Date.now()}`, icon: Folder, label: 'Yeni Klasör', type: 'lucide', color: 'text-yellow-400', bg: 'bg-yellow-900/20', hoverBg: 'hover:bg-yellow-900/40' }]);
              setContextMenu(null);
            }}
          >
            <Folder size={13} />
            Klasör Oluştur
          </div>
          <div 
            className="flex items-center gap-2.5 px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
            onClick={() => {
              setIcons(prev => [...prev, { id: `note-${Date.now()}`, icon: FileEdit, label: 'Yeni Not', type: 'lucide', color: 'text-blue-400', bg: 'bg-blue-900/20', hoverBg: 'hover:bg-blue-900/40', border: 'border-blue-500/30', action: 'onOpenMarkdownNotes' }]);
              setContextMenu(null);
            }}
          >
            <FileEdit size={13} />
            Metin Not Belgesi
          </div>
        </div>
      )}
    </div>
  );
}

/* --- Interactive Nested Widget Components --- */

function WeatherWidget() {
  const [city, setCity] = useState('İstanbul');
  const [temp, setTemp] = useState(24);
  const [status, setStatus] = useState('Parçalı Bulutlu / Ferah');

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(t => t + (Math.random() > 0.5 ? 1 : -1));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const citiesData: Record<string, { temp: number, status: string }> = {
    'İstanbul': { temp: 24, status: 'Parçalı Bulutlu / Ferah' },
    'Ankara': { temp: 20, status: 'Hafif Rüzgarlı / Açık' },
    'İzmir': { temp: 29, status: 'Tamamen Güneşli / Sıcak' }
  };

  const handleCityCycle = () => {
    const list = Object.keys(citiesData);
    const nextIdx = (list.indexOf(city) + 1) % list.length;
    const nextCity = list[nextIdx];
    setCity(nextCity);
    setTemp(citiesData[nextCity].temp);
    setStatus(citiesData[nextCity].status);
  };

  return (
    <div className="bg-slate-950/70 backdrop-blur-md border border-slate-800 rounded-xl p-4 text-white shadow-xl flex flex-col justify-between h-36">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest leading-none flex items-center gap-1">
            <CloudSun size={10} /> CANLI HAVA DURUMU
          </span>
          <button 
            type="button"
            onClick={handleCityCycle} 
            className="text-sm font-extrabold text-white hover:text-blue-300 transition-colors block text-left leading-tight"
          >
            {city} 🌍
          </button>
          <span className="text-[10px] text-slate-400 block font-medium">{status}</span>
        </div>
        <div className="text-2xl font-black text-blue-300 tracking-tighter shrink-0">{temp}°C</div>
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 border-t border-slate-900 pt-2 font-mono">
        <span>Nem: %48</span>
        <span>Rüzgar: 14 km/s</span>
      </div>
    </div>
  );
}

function CalendarWidget() {
  const now = new Date();
  const dayName = now.toLocaleDateString('tr-TR', { weekday: 'long' });
  const dayNum = now.getDate();
  const monthName = now.toLocaleDateString('tr-TR', { month: 'long' });
  const yearNum = now.getFullYear();

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="bg-slate-950/70 backdrop-blur-md border border-slate-800 rounded-xl p-4 text-white shadow-xl flex flex-col justify-between h-44">
      <div>
        <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest leading-none flex items-center gap-1">
          <Calendar size={10} /> BUGÜNÜN TAKVİMİ
        </span>
        <div className="text-xs font-bold text-slate-200 mt-1 leading-tight">
          {dayNum} {monthName} {yearNum}
        </div>
        <div className="text-[10px] font-bold text-indigo-300 italicLeading select-none">{dayName}</div>
      </div>
      
      <div className="grid grid-cols-7 gap-0.5 text-[9px] text-center text-slate-400 mt-2 font-mono">
        {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map(d => (
          <span key={d} className="font-bold text-slate-500 text-[8px]">{d}</span>
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={`empty-${i}`} />
        ))}
        {daysInMonth.slice(0, 14).map(d => (
          <span 
            key={d} 
            className={`p-0.5 rounded flex items-center justify-center transition-all ${
              d === dayNum 
                ? 'bg-indigo-600 font-extrabold text-white shadow shadow-indigo-500/20 scale-105' 
                : 'hover:bg-slate-800'
            }`}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function SystemWidget() {
  const [ram, setRam] = useState(36);
  const [cpu, setCpu] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setRam(r => {
        const val = r + Math.floor(Math.random() * 3) - 1;
        return val < 30 ? 30 : val > 42 ? 42 : val;
      });
      setCpu(c => {
        const val = c + Math.floor(Math.random() * 7) - 3;
        return val < 2 ? 2 : val > 24 ? 24 : val;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-950/70 backdrop-blur-md border border-slate-800 rounded-xl p-4 text-white shadow-xl flex flex-col justify-between h-36">
      <div className="space-y-0.5">
        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest leading-none flex items-center gap-1">
          <Cpu size={10} /> MKS PERFORMANS
        </span>
        <h4 className="text-[11px] font-bold text-slate-300">Lüks Tabanlı Kernel v1.0</h4>
      </div>

      <div className="space-y-2 pt-1">
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] text-slate-400 font-medium font-mono leading-none">
            <span>RAM Bellek:</span>
            <span className="text-emerald-400 font-bold">{ram}%</span>
          </div>
          <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${ram}%` }}></div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[9px] text-slate-400 font-medium font-mono leading-none">
            <span>Cpu Yükü:</span>
            <span className="text-emerald-400 font-bold">{cpu}%</span>
          </div>
          <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-emerald-400 rounded-full transition-all duration-1000" style={{ width: `${cpu}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
