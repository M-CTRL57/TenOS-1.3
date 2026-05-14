
import { Wifi, Lock, Bluetooth, Headphones, Keyboard, Tablet, Mouse, Watch, Gamepad, Speaker, Volume2, Mic, Music, Bell, Monitor, AlertTriangle, Cpu, RotateCcw, ArrowUp, Shield, Palette, User, Home, Tv, Disc, RefreshCw, Wind, Plus, Power, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'motion/react';

const wifiNetworks = [
  { name: 'TECBIT_HQ_5G', strength: 'full', secure: true },
  { name: 'TECBIT_Core_Secure', strength: 'full', secure: true },
  { name: 'Vodafone-Net-9842_5G', strength: 'high' },
  { name: 'TurkTelekom_Fiber_Mert_Ext', strength: 'medium' },
  { name: 'Superonline-Fiber-Ultra-High', strength: 'high' },
  { name: 'TP-Link_Cynogen_Legacy', strength: 'low' },
  { name: 'TECBIT_Guest_Access', strength: 'medium' },
];

const bluetoothDevices = [
  { name: 'TECBIT_Audio_Flow', type: 'headset' },
  { name: 'TEN_Input_Z', type: 'keyboard' },
  { name: 'Galaxy Tab S9+ (Mert)', type: 'tablet' },
  { name: 'Logitech MX Master 3S', type: 'mouse' },
  { name: 'Sony WH-1000XM5', type: 'headset' },
  { name: 'DualSense Edge', type: 'gamepad' },
  { name: 'Apple Airpods Pro', type: 'headset' },
  { name: 'JBL Flip 6', type: 'speaker' },
  { name: 'Garmin Fenix 7X', type: 'watch' },
];

const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'headset': return <Headphones size={18} />;
    case 'keyboard': return <Keyboard size={18} />;
    case 'tablet': return <Tablet size={18} />;
    case 'mouse': return <Mouse size={18} />;
    case 'watch': return <Watch size={18} />;
    case 'gamepad': return <Gamepad size={18} />;
    case 'speaker': return <Speaker size={18} />;
    default: return <Bluetooth size={18} />;
  }
};

const wallpapersList = [
  { id: 'saturn', name: 'Satürn (Uzay)', url: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1920&auto=format&fit=crop' },
  { id: 'earth', name: 'Dünya (Uzay)', url: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1920&auto=format&fit=crop' },
  { id: 'moon', name: 'Ay (Uzay)', url: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?q=80&w=1920&auto=format&fit=crop' },
  { id: 'ai', name: 'Değişik Yapay Zekalı Şeyler', url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1920&auto=format&fit=crop' },
  { id: 'alaturka', name: 'Alaturka Tuvalet', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Asian_toilet.jpg/800px-Asian_toilet.jpg' },
  { id: 'default', name: 'Siyah (Varsayılan)', url: '' }
];

export default function SettingsApp({ onOpenBios, onDriverUpdate, onSystemUpdate, wallpaper, lockScreenWallpaper, themeColor, onChangeWallpaper, onChangeLockScreenWallpaper, onFontChange, onChangeThemeColor, firebaseUser }: { onOpenBios: () => void, onDriverUpdate?: () => void, onSystemUpdate?: () => void, wallpaper?: string, lockScreenWallpaper?: string, themeColor?: string, onChangeWallpaper?: (w: string) => void, onChangeLockScreenWallpaper?: (w: string) => void, onFontChange?: () => void, onChangeThemeColor?: (c: 'red' | 'orange' | 'black' | 'white') => void, firebaseUser?: FirebaseUser | null }) {
  const [activeCategory, setActiveCategory] = useState<'account' | 'security' | 'wifi' | 'bluetooth' | 'audio' | 'personalization' | 'advanced' | 'updates' | 'devices'>('account');
  const [wallpaperTarget, setWallpaperTarget] = useState<'desktop' | 'lockscreen'>('desktop');
  const [levrekMode, setLevrekMode] = useState(false);
  const [isTenOSUpdated, setIsTenOSUpdated] = useState(true);
  const [activeDeviceModal, setActiveDeviceModal] = useState<'washer' | 'dryer' | null>(null);
  const [deviceTimer, setDeviceTimer] = useState<number>(45);
  const [deviceState, setDeviceState] = useState<'running' | 'done'>('running');

  useEffect(() => {
    if (activeDeviceModal && deviceState === 'running') {
      const interval = setInterval(() => {
        setDeviceTimer(prev => {
          if (prev <= 1) {
            setDeviceState('done');
            if (activeDeviceModal === 'dryer') {
              // Bitti Bildirimi: "Levrek" ses modu
              alert('LEVREK SESİ MODU: Kurutma tamamlandı!');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 100); // Super fast for demo
      return () => clearInterval(interval);
    }
  }, [activeDeviceModal, deviceState]);

  useEffect(() => {
    if (activeDeviceModal) {
      setDeviceTimer(45);
      setDeviceState('running');
    }
  }, [activeDeviceModal]);

  const [securityFeatures, setSecurityFeatures] = useState({
    botProtection: true,
    antivirus: true,
    ransomware: true,
    webVirus: true
  });
  const [confirmModal, setConfirmModal] = useState<{ open: boolean, featureKey: keyof typeof securityFeatures | null }>({ open: false, featureKey: null });

  useEffect(() => {
    setIsTenOSUpdated(Math.random() > 0.5);
  }, []);

  const handleToggleSecurity = (key: keyof typeof securityFeatures) => {
    if (securityFeatures[key]) {
      setConfirmModal({ open: true, featureKey: key });
    } else {
      setSecurityFeatures(prev => ({ ...prev, [key]: true }));
    }
  };

  const confirmToggleSecurity = () => {
    if (confirmModal.featureKey) {
      setSecurityFeatures(prev => ({ ...prev, [confirmModal.featureKey!]: false }));
    }
    setConfirmModal({ open: false, featureKey: null });
  };

  return (
    <div className="h-full p-6 text-[#e0e0e0] flex gap-6 relative">
      <div className="w-48 bg-white/[0.03] p-4 rounded-xl space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-4 px-2">Kategoriler</h2>
        <button onClick={() => setActiveCategory('account')} className={`w-full text-left p-3 rounded-lg ${activeCategory === 'account' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
          <User size={18} className="inline mr-2" /> Hesabım
        </button>
        <button onClick={() => setActiveCategory('personalization')} className={`w-full text-left p-3 rounded-lg ${activeCategory === 'personalization' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
          <Palette size={18} className="inline mr-2" /> Kişiselleştirme
        </button>
        <button onClick={() => setActiveCategory('devices')} className={`w-full text-left p-3 rounded-lg ${activeCategory === 'devices' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
          <Home size={18} className="inline mr-2" /> Cihazlar
        </button>
        <button onClick={() => setActiveCategory('security')} className={`w-full text-left p-3 rounded-lg ${activeCategory === 'security' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
          <Shield size={18} className="inline mr-2" /> GardiyanTEN
        </button>
        <button onClick={() => setActiveCategory('wifi')} className={`w-full text-left p-3 rounded-lg ${activeCategory === 'wifi' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
          <Wifi size={18} className="inline mr-2" /> Wi-Fi
        </button>
        <button onClick={() => setActiveCategory('bluetooth')} className={`w-full text-left p-3 rounded-lg ${activeCategory === 'bluetooth' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
          <Bluetooth size={18} className="inline mr-2" /> Bluetooth
        </button>
        <button onClick={() => setActiveCategory('audio')} className={`w-full text-left p-3 rounded-lg ${activeCategory === 'audio' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
          <Speaker size={18} className="inline mr-2" /> Ses
        </button>
        <button onClick={() => setActiveCategory('advanced')} className={`w-full text-left p-3 rounded-lg ${activeCategory === 'advanced' ? 'bg-white/10' : 'hover:bg-white/5'}`}>
          <AlertTriangle size={18} className="inline mr-2" /> Gelişmiş
        </button>
        <button onClick={() => setActiveCategory('updates')} className={`w-full text-left p-3 rounded-lg ${activeCategory === 'updates' ? 'bg-white/10' : 'hover:bg-white/5'} flex items-center`}>
          <div className="relative w-[18px] h-[18px] mr-2 overflow-hidden flex items-center justify-center">
            <ArrowUp size={18} className="animate-[moveUp_1s_ease-in-out_infinite]" />
          </div>
          Güncelleme
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {activeCategory === 'account' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b border-white/10 pb-2 mb-4">Hesabım</h3>
            <div className="p-6 bg-white/[0.03] rounded-xl border border-white/5 space-y-4 text-center">
               {firebaseUser ? (
                 <div className="flex flex-col items-center">
                    <img src={firebaseUser.photoURL || 'https://picsum.photos/200'} alt="Profile" className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500 shadow-xl" />
                    <h4 className="text-xl font-bold text-white mb-1">{firebaseUser.displayName}</h4>
                    <p className="text-white/50 mb-6">{firebaseUser.email}</p>
                    <div className="flex gap-4 mb-6">
                        <div className="px-4 py-2 bg-blue-500/10 rounded-lg text-blue-400 text-sm">Bulut Senkronizasyonu Aktif</div>
                    </div>
                    <button 
                       onClick={() => signOut(auth)}
                       className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors font-medium border border-red-500/50"
                    >
                       Hesaptan Çıkış Yap
                    </button>
                 </div>
               ) : (
                 <div className="py-8">
                   <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                      <User size={32} className="text-blue-400" />
                   </div>
                   <h4 className="text-xl font-medium text-white mb-2">Google Hesabınıza Giriş Yapın</h4>
                   <p className="text-white/50 text-sm max-w-sm mx-auto mb-6">
                      TenOS deneyiminizi kişiselleştirin. Tema, arkaplan, ve ayarlarınız bulut ile senkronize olsun.
                   </p>
                   <button 
                      onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
                      className="px-6 py-2 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors font-medium"
                   >
                      Google ile Giriş Yap
                   </button>
                 </div>
               )}
            </div>
          </div>
        )}
        {activeCategory === 'personalization' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b border-white/10 pb-2 mb-4">Kişiselleştirme</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="text-sm font-semibold">Duvar Kağıdı</h4>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setWallpaperTarget('desktop')}
                    className={`px-3 py-1 text-xs rounded-full ${wallpaperTarget === 'desktop' ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    Masaüstü
                  </button>
                  <button 
                    onClick={() => setWallpaperTarget('lockscreen')}
                    className={`px-3 py-1 text-xs rounded-full ${wallpaperTarget === 'lockscreen' ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    Kilit Ekranı
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {wallpapersList.map((bg) => (
                  <button 
                    key={bg.id}
                    onClick={() => wallpaperTarget === 'desktop' ? onChangeWallpaper?.(bg.url) : onChangeLockScreenWallpaper?.(bg.url)}
                    className={`flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-all ${(wallpaperTarget === 'desktop' ? wallpaper : lockScreenWallpaper) === bg.url ? 'border-blue-500 bg-white/10' : 'border-transparent hover:bg-white/5'}`}
                  >
                    <div className="w-full aspect-video bg-black rounded overflow-hidden flex items-center justify-center relative">
                      {bg.url ? (
                        <img src={bg.url} alt={bg.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-white/50">Siyah</span>
                      )}
                    </div>
                    <span className="text-xs">{bg.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="text-sm font-semibold">Yazı Tipi</h4>
              <button 
                onClick={onFontChange}
                className="w-full text-left p-4 bg-white/[0.05] rounded-lg border border-white/5 text-sm hover:bg-white/[0.1] flex flex-col gap-1"
              >
                <span>Yazı Tipi Ayarlarını Değiştir</span>
                <span className="text-xs text-gray-400">Şu anda Inter kullanılıyor</span>
              </button>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="text-sm font-semibold">Tema Rengi</h4>
              <div className="flex gap-4">
                <button onClick={() => onChangeThemeColor?.('black')} className={`w-12 h-12 rounded-full border-2 ${themeColor === 'black' ? 'border-blue-500' : 'border-transparent'} bg-[#1a1a1a]`}></button>
                <button onClick={() => onChangeThemeColor?.('white')} className={`w-12 h-12 rounded-full border-2 ${themeColor === 'white' ? 'border-blue-500' : 'border-transparent'} bg-gray-200`}></button>
                <button onClick={() => onChangeThemeColor?.('red')} className={`w-12 h-12 rounded-full border-2 ${themeColor === 'red' ? 'border-blue-500' : 'border-transparent'} bg-red-900`}></button>
                <button onClick={() => onChangeThemeColor?.('orange')} className={`w-12 h-12 rounded-full border-2 ${themeColor === 'orange' ? 'border-blue-500' : 'border-transparent'} bg-orange-600`}></button>
              </div>
            </div>
          </div>
        )}
        {activeCategory === 'devices' && (
          <div className="space-y-6 relative h-full">
            <h3 className="text-lg font-semibold border-b border-white/10 pb-2 mb-4">Akıllı Ev & Cihazlar</h3>
            <div className="flex gap-4 mb-4">
               <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm text-white flex items-center gap-2">
                 <Plus size={16} /> Cihaz Ekle
               </button>
               <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-sm text-white flex items-center gap-2">
                 <Home size={16} /> Google Home ile Senkronize Et
               </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.03] rounded-lg border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                   <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Disc size={20} /></div>
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm font-medium">Robot Süpürge</div>
                <div className="text-xs text-white/50">Bağlı - Şarj %100</div>
                <button className="mt-2 text-xs w-full py-1.5 bg-white/5 hover:bg-white/10 rounded">Temizliği Başlat</button>
              </div>

              <div className="p-4 bg-white/[0.03] rounded-lg border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                   <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg"><Watch size={20} /></div>
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm font-medium">Akıllı Saat</div>
                <div className="text-xs text-white/50">Bağlı - Kalp Atışı: 75 bpm</div>
              </div>

              <div className="p-4 bg-white/[0.03] rounded-lg border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                   <div className="p-2 bg-pink-500/20 text-pink-400 rounded-lg"><Tablet size={20} /></div>
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm font-medium">Tablet</div>
                <div className="text-xs text-white/50">Bağlı - Şarj %82</div>
              </div>

              <button onClick={() => setActiveDeviceModal('washer')} className="p-4 bg-white/[0.03] hover:bg-white/[0.08] transition-colors rounded-lg border border-white/5 flex flex-col gap-2 text-left">
                <div className="flex justify-between items-start w-full">
                   <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg"><RefreshCw size={20} /></div>
                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
                <div className="text-sm font-medium">Çamaşır Makinesi</div>
                <div className="text-xs text-white/50">Kapalı - Program Bitti</div>
              </button>

              <button onClick={() => setActiveDeviceModal('dryer')} className="p-4 bg-white/[0.03] hover:bg-white/[0.08] transition-colors rounded-lg border border-white/5 flex flex-col gap-2 text-left">
                <div className="flex justify-between items-start w-full">
                   <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg"><Wind size={20} /></div>
                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
                <div className="text-sm font-medium">Kurutma Makinesi</div>
                <div className="text-xs text-white/50">Kapalı</div>
              </button>

              <div className="p-4 bg-white/[0.03] rounded-lg border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                   <div className="p-2 bg-green-500/20 text-green-400 rounded-lg"><Tv size={20} /></div>
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm font-medium">Televizyon</div>
                <div className="text-xs text-white/50">Açık - HDMI 1</div>
                <button className="mt-2 text-xs w-full py-1.5 bg-white/5 hover:bg-white/10 rounded flex justify-center items-center gap-1"><Power size={12}/> Kumanda</button>
              </div>
            </div>

            {/* Modals for Devices */}
            {activeDeviceModal && (
               <div className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-xl z-50 flex items-center justify-center p-6">
                  <div className="w-full max-w-sm bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                     {/* Water Wave Effect Background */}
                     <div className="absolute bottom-0 left-0 right-0 h-48 opacity-20 pointer-events-none">
                        <motion.svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[200%] h-full fill-blue-500"
                           animate={{ x: ['0%', '-50%'] }}
                           transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        >
                           <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
                           <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-23.64V0Z" opacity=".5" />
                           <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
                        </motion.svg>
                     </div>

                     <div className="p-6 relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                           <h4 className="text-lg font-bold">
                              {activeDeviceModal === 'washer' ? 'Çamaşır Makinesi' : 'Kurutma Makinesi'}
                           </h4>
                           <button onClick={() => setActiveDeviceModal(null)} className="p-1 hover:bg-white/10 rounded-md">
                              <X size={20} />
                           </button>
                        </div>

                        <div className="flex flex-col items-center justify-center flex-1 mb-8">
                           {deviceState === 'done' ? (
                               <motion.div 
                                 initial={{ scale: 0.8, opacity: 0 }}
                                 animate={{ scale: 1, opacity: 1 }}
                                 className="text-4xl font-bold text-green-400 mb-2 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                               >
                                  BİTTİ
                               </motion.div>
                           ) : (
                               <div className="text-5xl font-light mb-2">00:{deviceTimer.toString().padStart(2, '0')}</div>
                           )}
                           <div className="text-sm font-medium text-blue-400 uppercase tracking-widest mt-2">
                              {deviceState === 'done' ? 'Hazır' : (activeDeviceModal === 'washer' ? 'Yıkıyor' : 'Kurutuyor')}
                           </div>
                           <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-blue-500 rounded-full"
                                animate={{ width: `${((45 - deviceTimer) / 45) * 100}%` }}
                              />
                           </div>
                        </div>

                        {deviceState === 'done' && (
                           <motion.div 
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
                             transition={{ duration: 4, times: [0, 0.1, 0.8, 1] }}
                             className="absolute top-4 left-0 right-0 mx-auto w-max px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-400 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm z-50 pointer-events-none"
                           >
                             V.I.P İşlem Tamamlandı ✨
                           </motion.div>
                        )}

                        <div className="space-y-3">
                           <h5 className="text-xs text-white/50 uppercase tracking-wider font-semibold">Hızlı Modlar</h5>
                           <div className="grid grid-cols-2 gap-2">
                              {activeDeviceModal === 'washer' ? (
                                 <>
                                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-center border border-white/10">Hızlı Yıkama</button>
                                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-center border border-white/10">Ekonomik Mod</button>
                                 </>
                              ) : (
                                 <>
                                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-center border border-white/10">Hassas</button>
                                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-center border border-white/10">Hızlı</button>
                                 </>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}
          </div>
        )}
        {activeCategory === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
              <Shield className="text-green-400" /> GardiyanTEN Güvenlik Merkezi
            </h3>
            <div className="space-y-3">
              {[
                { key: 'botProtection', label: 'Ultra güvenlikli bot antiban koruması' },
                { key: 'antivirus', label: 'Antivirüs' },
                { key: 'ransomware', label: 'Fidye virüsü koruması' },
                { key: 'webVirus', label: 'Web tarayıcılarından yüklenen virüs koruması' }
              ].map((feature) => (
                <div key={feature.key} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg border border-white/5">
                  <span className="text-sm font-medium">{feature.label}</span>
                  <button 
                    onClick={() => handleToggleSecurity(feature.key as keyof typeof securityFeatures)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${securityFeatures[feature.key as keyof typeof securityFeatures] ? 'bg-green-500' : 'bg-gray-600'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${securityFeatures[feature.key as keyof typeof securityFeatures] ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeCategory === 'updates' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold border-b border-white/10 pb-2 mb-4">Güncellemeler</h3>
              <div className="p-4 bg-white/[0.03] rounded-lg border border-white/5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${isTenOSUpdated ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                    <ArrowUp size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{isTenOSUpdated ? 'TenOS güncel' : 'Güncelleme var'}</h4>
                    <p className="text-sm text-gray-400">Son denetlenme: Bugün</p>
                  </div>
                </div>

                {!isTenOSUpdated && (
                  <div className="flex justify-end pt-2 border-t border-white/5 mt-4">
                    <button 
                      onClick={onSystemUpdate}
                      className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
                    >
                      <RotateCcw size={18} />
                      Bilgisayarı Güncelle
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold border-b border-white/10 pb-2 mb-4">Sürücüler</h3>
              <div className="p-4 bg-white/[0.03] rounded-lg border border-white/5 space-y-4">
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-500/20 text-blue-400 rounded-full h-fit">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Donanım Sürücüleri</h4>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                      RTX 5090 ekran kartı ve 24 GB DDR5 RAM için uygun sürücüler yüklenmiştir. 
                      Sürücü güncellemesi için lütfen Sürücü Güncellemesi butonuna basınız.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button 
                    onClick={onDriverUpdate} 
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
                  >
                    <ArrowUp size={18} className="animate-bounce" />
                    Sürücü Güncellemesi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeCategory === 'wifi' && (
          <>
            <h3 className="text-sm font-semibold">Wi-Fi Ağları</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-white/[0.05] rounded border border-white/5 text-sm hover:bg-white/[0.1]">Wi-Fi Ayarlarını Değiştir</button>
              <button className="w-full text-left p-3 bg-white/[0.05] rounded border border-white/5 text-sm hover:bg-white/[0.1]">Wi-Fi'ye Bağlan</button>
              <button className="w-full text-left p-3 bg-white/[0.05] rounded border border-white/5 text-sm hover:bg-white/[0.1]">Bağlantıyı Kes</button>
            </div>
            {wifiNetworks.map((net) => (
              <div key={net.name} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <Wifi size={18} className={net.strength === 'full' ? 'text-blue-400' : 'text-white/40'} />
                  <span>{net.name}</span>
                  {net.secure && <Lock size={12} className="text-white/40" />}
                </div>
              </div>
            ))}
          </>
        )}
        {activeCategory === 'bluetooth' && (
          <>
            <h3 className="text-sm font-semibold">Bluetooth Cihazları</h3>
            {bluetoothDevices.map((dev) => (
              <div key={dev.name} className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-lg border border-white/5">
                {getDeviceIcon(dev.type)}
                <span>{dev.name}</span>
              </div>
            ))}
          </>
        )}
        {activeCategory === 'audio' && (
          <>
            <h3 className="text-sm font-semibold mb-4">Ses Kontrol Paneli</h3>
            <div className="space-y-6">
                {[
                    { label: 'Medya', icon: <Music size={18}/> },
                    { label: 'Bildirimler', icon: <Bell size={18}/> },
                    { label: 'Sistem', icon: <Monitor size={18}/> },
                    { label: 'Yapay Zeka Sesleri', icon: <Volume2 size={18}/> }
                ].map((vol) => (
                    <div key={vol.label} className="space-y-1">
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                            {vol.icon} <span>{vol.label}</span>
                        </div>
                        <input type="range" className="w-full h-1 bg-white/10 rounded accent-blue-500" />
                    </div>
                ))}
            </div>
            <div className="space-y-2 pt-4">
                <button className="w-full text-left p-3 bg-white/[0.05] rounded border border-white/5 text-sm hover:bg-white/[0.1] flex items-center justify-between">
                    <span>Ayrı Uygulama Sesi</span>
                    <div className="w-10 h-5 bg-white/10 rounded-full"></div>
                </button>
                <button className="w-full text-left p-3 bg-white/[0.05] rounded border border-white/5 text-sm hover:bg-white/[0.1] flex items-center gap-2">
                    <Mic size={18} /> <span>Sesli Yazma & Komut</span>
                </button>
                <button onClick={() => setLevrekMode(!levrekMode)} className={`w-full text-left p-3 rounded border border-white/5 text-sm flex items-center justify-between ${levrekMode ? 'bg-blue-600/30' : 'bg-white/[0.05]'}`}>
                    <span>Levrek Ses Modu (Berrak Ses)</span>
                    <span className={`px-2 py-1 rounded text-xs ${levrekMode ? 'bg-blue-500' : 'bg-white/10'}`}>{levrekMode ? 'Açık' : 'Kapalı'}</span>
                </button>
            </div>
          </>
        )}
        {activeCategory === 'advanced' && (
          <>
            <h3 className="text-sm font-semibold mb-4">Gelişmiş</h3>
            <div className="space-y-2">
              <button onClick={onOpenBios} className="w-full text-left p-3 bg-white/[0.05] rounded border border-white/5 text-sm hover:bg-white/[0.1] flex items-center gap-2">
                <AlertTriangle size={16} /> <span>BIOS'a Gir</span>
              </button>
              <button className="w-full text-left p-3 bg-white/[0.05] rounded border border-white/5 text-sm hover:bg-white/[0.1] flex items-center gap-2">
                <Cpu size={16} /> <span>Geliştirici Seçenekleri</span>
              </button>
              <button className="w-full text-left p-3 bg-white/[0.05] rounded border border-white/5 text-sm hover:bg-white/[0.1] flex items-center gap-2">
                <RotateCcw size={16} /> <span>Sistem Sıfırlama</span>
              </button>
            </div>
          </>
        )}
      </div>

      {confirmModal.open && (
        <div className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#1b2838] border border-red-500/30 rounded-lg p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-red-400">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-semibold text-white">Emin misiniz?</h3>
            </div>
            <p className="text-gray-300 text-sm mb-6">
              Bu güvenlik özelliğini devre dışı bırakmak sisteminizi riske atabilir. Kapatmak istediğinize emin misiniz?
            </p>
            <div className="flex justify-end gap-3 font-medium">
              <button 
                onClick={() => setConfirmModal({ open: false, featureKey: null })}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-white transition-colors"
              >
                İptal
              </button>
              <button 
                onClick={confirmToggleSecurity}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-white transition-colors"
              >
                Evet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

