import { useState, useEffect } from 'react';
import { 
  Download, CheckCircle2, MonitorDown, Trash2, Code, Laptop, Info, 
  Layers, AppWindow, Globe, HelpCircle, ChevronRight, Zap, Play, Music, BookOpen, Coffee
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'Tüm Uygulamalar', icon: Layers },
  { id: 'native', name: 'Yerel Uygulamalar', icon: AppWindow },
  { id: 'pwa', name: 'Web PWA Uygulamaları', icon: Globe },
  { id: 'widget', name: 'Masaüstü Araçları (Widget)', icon: Laptop }
];

const availableApps = [
  // Native Apps
  { 
    id: 'calculator', 
    name: 'Hesap Makinesi', 
    category: 'native',
    description: 'Gelişmiş bilimsel hesap makinesi ile hızlı işlemler yapın.', 
    icon: '🧮', 
    type: 'native' 
  },
  { 
    id: 'texteditor', 
    name: 'Gelişmiş Metin Editörü', 
    category: 'native',
    description: 'Markdown destekli, zengin metin düzenleme ve kod yazma editörü.', 
    icon: '📝', 
    type: 'native' 
  },
  { 
    id: 'snake', 
    name: 'Retro Yılan Oyunu', 
    category: 'native',
    description: 'Elmaları toplayarak puan kazandığınız nostaljik yılan oyunu.', 
    icon: '🐍', 
    type: 'native' 
  },

  // PWA Apps
  { 
    id: 'wikipedia', 
    name: 'Vikipedi PWA', 
    category: 'pwa',
    description: 'Dünyanın en büyük özgür ansiklopedisi parmaklarınızın ucunda.', 
    icon: '📖', 
    type: 'pwa',
    url: 'https://tr.wikipedia.org/' 
  },

  // Desktop Widgets
  { 
    id: 'weather-widget', 
    name: 'Hava Durumu Aracı', 
    category: 'widget',
    description: 'Masaüstünüzde canlı, her an değişen hava durumunu gösteren modern widget.', 
    icon: '🌤️', 
    type: 'widget' 
  },
  { 
    id: 'calendar-widget', 
    name: 'Masaüstü Takvim Aracı', 
    category: 'widget',
    description: 'Bugünün detaylarını ve aylık takvim görünümünü barındıran şık widget.', 
    icon: '📅', 
    type: 'widget' 
  },
  { 
    id: 'system-widget', 
    name: 'Sistem Performans Aracı', 
    category: 'widget',
    description: 'Canlı RAM kapasitesi ve disk doluluk grafiğini masaüstünde takip edin.', 
    icon: '📊', 
    type: 'widget' 
  }
];

export default function AppStoreApp({ 
  onInstallApp, 
  onUninstallApp,
  installedApps, 
  customApps = [],
  onAddCustomApp,
  onDeleteCustomApp
}: { 
  onInstallApp: (appId: string) => void, 
  onUninstallApp: (appId: string) => void,
  installedApps: string[],
  customApps?: { id: string, name: string, icon: string, url: string }[],
  onAddCustomApp?: (app: { id: string, name: string, icon: string, url: string }) => void,
  onDeleteCustomApp?: (id: string) => void
}) {
  // Loading state (30 seconds sequence)
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState<'cache' | 'server'>('cache');
  const [timeLeft, setTimeLeft] = useState(30);
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState('Önbellek temizleme işlemi başlatılıyor...');

  // Tabs: 'shop', 'dev_corner', 'news'
  const [activeTab, setActiveTab] = useState<'shop' | 'dev_corner' | 'news'>('shop');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [installing, setInstalling] = useState<string | null>(null);

  // Custom App Form
  const [customAppName, setCustomAppName] = useState('');
  const [customAppUrl, setCustomAppUrl] = useState('');
  const [customAppIcon, setCustomAppIcon] = useState('⭐');

  // Load timer effect
  useEffect(() => {
    const totalDuration = 30000; // 30 seconds
    const intervalMs = 200;
    const progressPerStep = (100 / (totalDuration / intervalMs));

    const cacheLogs = [
      'Gereksiz geçici dosyalar analiz ediliyor...',
      'Eski uygulama önbellek paketleri taranıyor...',
      'Kayıt defteri optimizasyonları yapılıyor...',
      'Geçici log kayıtları temizleniyor...',
      'RAM tahsisatı yapılandırılıyor...',
      'Önbellek %100 temizlendi. Sunucu bağlantısı aranıyor...'
    ];

    const serverLogs = [
      'TEN OS güvenli sunucularına bağlanılıyor...',
      'Uygulama listeleri güncelliği kontrol ediliyor...',
      'Geliştirici imzaları doğrulanıyor...',
      'Canlı web uygulamalarının URL adresleri eşleniyor...',
      'Sistem bileşenleri başarıyla eşitlendi!'
    ];

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsLoading(false);
          return 0;
        }
        const updatedTime = prev - 0.2;
        
        // Decide status
        if (updatedTime > 15) {
          setLoadingStep('cache');
          // Cycle through cache logs
          const index = Math.floor((30 - updatedTime) / 2.5) % cacheLogs.length;
          setCurrentLog(cacheLogs[index]);
        } else {
          setLoadingStep('server');
          // Cycle through server logs
          const index = Math.floor((15 - updatedTime) / 3) % serverLogs.length;
          setCurrentLog(serverLogs[index]);
        }
        
        return Math.round(updatedTime * 10) / 10;
      });

      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + progressPerStep;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, []);

  const handleSkipLoading = () => {
    setIsLoading(false);
  };

  const handleInstall = (appId: string) => {
    setInstalling(appId);
    setTimeout(() => {
      onInstallApp(appId);
      setInstalling(null);
    }, 1500);
  };

  const handleUninstall = (appId: string) => {
    onUninstallApp(appId);
  };

  const handleCreateCustomApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAppName.trim() || !customAppUrl.trim()) return;

    // Build unique id
    const newId = `custom-${Date.now()}`;
    let formattedUrl = customAppUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    if (onAddCustomApp) {
      onAddCustomApp({
        id: newId,
        name: customAppName,
        icon: customAppIcon,
        url: formattedUrl
      });
      // Clear inputs
      setCustomAppName('');
      setCustomAppUrl('');
      setCustomAppIcon('🚀');
      alert(`"${customAppName}" başarıyla TEN OS masaüstüne yayınlandı!`);
    }
  };

  // 15+15 Loading Screen
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#0a0f1d] text-white p-8 font-mono select-none relative overflow-hidden">
        {/* Abstract Background Accents */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-xl bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-8 flex flex-col items-center">
          <div className="relative">
            <div className="p-5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl shadow-xl shadow-blue-500/20 text-white animate-pulse">
              <MonitorDown size={44} />
            </div>
            {/* Spinning ring */}
            <div className="absolute inset-[-10px] border border-blue-500/20 rounded-2xl border-t-blue-500 border-l-blue-500 animate-spin"></div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 uppercase">Yazılım Merkezi Açılıyor</h1>
            <p className="text-sm text-slate-400">Yenilikler ve bileşenler senkronize ediliyor...</p>
          </div>

          {/* Dual step system */}
          <div className="flex items-center gap-4 w-full text-xs">
            <div className={`flex-1 p-3 rounded-lg border text-center transition-all ${
              loadingStep === 'cache' 
                ? 'bg-blue-950/40 border-blue-500/40 text-blue-400 font-bold' 
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              1. Aşama (15 sn)<br/>
              <span className={loadingStep === 'cache' ? 'text-white' : ''}>Önbellek Temizleniyor</span>
            </div>
            <div className="text-slate-600 font-bold">➔</div>
            <div className={`flex-1 p-3 rounded-lg border text-center transition-all ${
              loadingStep === 'server' 
                ? 'bg-blue-950/40 border-blue-500/40 text-blue-400 font-bold' 
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              2. Aşama (15 sn)<br/>
              <span className={loadingStep === 'server' ? 'text-white' : ''}>Sunucudan Uygulamalar Alınıyor</span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="w-full space-y-3">
            <div className="flex justify-between text-xs text-slate-400 font-bold">
              <span className="text-blue-400 animate-pulse">{currentLog}</span>
              <span>{Math.ceil(timeLeft)} Saniye Kaldı</span>
            </div>
            <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
          </div>

          {/* Fast-Forward / Skip Option */}
          <button 
            onClick={handleSkipLoading}
            className="text-xs text-slate-500 hover:text-slate-300 font-medium tracking-wide flex items-center gap-1 transition-colors group"
          >
            Süreci Hızlandır <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  // Filtered Apps based on category
  const filteredApps = availableApps.filter(app => {
    if (selectedCategory === 'all') return true;
    return app.category === selectedCategory;
  });

  return (
    <div className="flex flex-col h-full bg-[#05070f] text-slate-100 select-none font-sans overflow-hidden">
      {/* Yazılım Merkezi Header */}
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/10 text-white h-11 w-11 flex items-center justify-center">
            <MonitorDown size={22} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Yazılım Merkezi</h1>
            <p className="text-[11px] text-slate-400 leading-none">Hızlı, özgür ve tamamen lüks tabanlı</p>
          </div>
        </div>

        {/* Tab Selection */}
        <nav className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button 
            onClick={() => setActiveTab('shop')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'shop' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers size={14} /> Mağaza
          </button>
          <button 
            onClick={() => setActiveTab('dev_corner')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'dev_corner' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code size={14} /> Topluluk ve Geliştirici Köşesi
          </button>
          <button 
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'news' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap size={14} /> Yenilikler (v2.0)
          </button>
        </nav>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {activeTab === 'shop' && (
          <>
            {/* Sidebar Categories */}
            <aside className="w-56 border-r border-slate-800 bg-slate-950 p-4 space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-2">Kategoriler</h2>
              <div className="space-y-1">
                {CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all ${
                      selectedCategory === category.id 
                        ? 'bg-slate-900 border border-slate-800 text-blue-400' 
                        : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
                    }`}
                  >
                    <category.icon size={15} />
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Developer notice sticker */}
              <div className="p-3 bg-gradient-to-tr from-slate-900 to-indigo-950 border border-indigo-900/30 rounded-xl space-y-2 mt-8">
                <div className="flex items-center gap-1 text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                  <Code size={10} /> SDK v2.0 Duyurusu
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Kendi uygulamalarınızı geliştirip anında masaüstüne kurmaya başlayın! Geliştirici sekmesini ziyaret edin.
                </p>
                <button 
                  onClick={() => setActiveTab('dev_corner')}
                  className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 tracking-wider flex items-center gap-1"
                >
                  DUYURUYU GÖR ➔
                </button>
              </div>
            </aside>

            {/* Shop Grid */}
            <main className="flex-1 overflow-y-auto p-6 bg-[#04060c] space-y-8 custom-scrollbar">
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight text-white">
                  {CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Uygulamalar'}
                </h2>
                <p className="text-xs text-slate-400">Yüklemek istediğiniz araca veya PWA uygulamasına tıklayın</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredApps.map(app => {
                  const isInstalled = installedApps.includes(app.id);
                  const isInstalling = installing === app.id;

                  return (
                    <div 
                      key={app.id} 
                      className="bg-slate-900/40 border border-slate-850 hover:border-slate-800 rounded-xl p-5 shadow-lg transition-transform hover:-translate-y-0.5 flex flex-col justify-between"
                    >
                      <div>
                        {/* App Icon */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-3xl leading-none p-2 bg-slate-900 border border-slate-880 rounded-xl h-11 w-11 flex items-center justify-center">
                            {app.icon}
                          </div>
                          <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold bg-slate-800 ${
                            app.type === 'native' ? 'text-teal-400 border border-teal-500/20' : 
                            app.type === 'pwa' ? 'text-amber-400 border border-amber-500/20' : 
                            'text-violet-400 border border-violet-500/20'
                          }`}>
                            {app.type === 'native' ? 'Yerel' : app.type === 'pwa' ? 'Web PWA' : 'Araç (Widget)'}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-sm font-bold text-slate-100 mb-1">{app.name}</h3>
                        <p className="text-[11px] text-slate-400 mb-5 leading-normal max-h-[3.6em] overflow-hidden">
                          {app.description}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="flex gap-2">
                        <button 
                          disabled={isInstalled || isInstalling}
                          onClick={() => handleInstall(app.id)}
                          className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1.5
                            ${isInstalled 
                              ? 'bg-slate-800/40 text-slate-400 border border-slate-700/20 cursor-not-allowed' 
                              : isInstalling
                                ? 'bg-blue-900/20 text-blue-400 border border-blue-500/30 animate-pulse'
                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow shadow-blue-600/10'
                            }
                          `}
                        >
                          {isInstalled ? (
                            <>
                              <CheckCircle2 size={13} />
                              Yüklendi
                            </>
                          ) : isInstalling ? (
                            'Kuruluyor...'
                          ) : (
                            <>
                              <Download size={13} />
                              Kurulum Yap
                            </>
                          )}
                        </button>

                        {/* Uninstall Option for installed apps */}
                        {isInstalled && (
                          <button 
                            onClick={() => handleUninstall(app.id)}
                            className="p-1 px-2.5 rounded-lg bg-orange-950/20 border border-orange-900/30 hover:bg-orange-900/40 hover:border-orange-500/50 text-orange-400 transition-colors flex items-center justify-center"
                            title="Kaldır"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Installed Developer Apps / Custom apps list inside shop if present */}
              {customApps.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold tracking-wider text-slate-200 uppercase">Sizin Geliştirdiğiniz Uygulamalar</h3>
                    <p className="text-[11px] text-slate-400">Topluluk Köşesinde yazdığınız ve doğrudan masaüstüne kurduğunuz özel uygulamalar</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {customApps.map(app => (
                      <div 
                        key={app.id} 
                        className="bg-indigo-950/10 border border-indigo-900/20 rounded-xl p-5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-3xl p-1 bg-indigo-950/40 rounded-lg">{app.icon}</span>
                            <span className="text-[9px] uppercase tracking-wider text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-bold">
                              SDK v2.0
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-100">{app.name}</h4>
                          <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">{app.url}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <span className="text-[11px] bg-indigo-900/30 text-indigo-300 font-semibold px-3 py-1 rounded border border-indigo-800/30 w-full text-center">
                            Masaüstünde Aktif
                          </span>
                          <button 
                            onClick={() => onDeleteCustomApp && onDeleteCustomApp(app.id)}
                            className="bg-red-950/20 border border-red-900/30 hover:bg-red-900/40 text-red-400 hover:text-red-300 p-1.5 px-2.5 rounded transition-colors"
                            title="Tamamen Kaldır ve Sil"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </>
        )}

        {/* Developer Tab */}
        {activeTab === 'dev_corner' && (
          <main className="flex-1 overflow-y-auto p-6 bg-[#04060c] space-y-8 custom-scrollbar">
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* SDK Documentation / Guide */}
              <section className="flex-1 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-blue-400 text-xs uppercase tracking-widest font-bold">
                  <Code size={16} /> TEN OS SDK v2.0 Kılavuzu
                </div>
                <h2 className="text-lg font-extrabold text-slate-100">Uygulamanızı TenOS'a Kurun</h2>
                
                <p className="text-xs text-slate-300 leading-relaxed">
                  TEN OS, geliştiricilerin diledikleri web, widget veya gömülü JS modüllerini kısıtlama olmaksızın platforma entegre etmesine olanak tanır.
                  Kendi web sayfanızı veya herhangi bir modern aracınızı TenOS sistemine kurun!
                </p>

                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-200">Uygulama Mimarisi Standartları</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850 space-y-1">
                      <span className="text-[10px] uppercase text-indigo-400 font-bold">1. iframe Sandbox</span>
                      <p className="text-[10px] text-slate-400 leading-tight">Yazdığınız URL adresi, tamamen yalıtılmış ve korunaklı bir sanal pencerede çalıştırılır.</p>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850 space-y-1">
                      <span className="text-[10px] uppercase text-indigo-400 font-bold">2. Emoji Entegrasyonu</span>
                      <p className="text-[10px] text-slate-400 leading-tight">Arayüzde şık durması için dilediğiniz emojiyi uygulama simgesi olarak atayabilirsiniz.</p>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850 space-y-1">
                      <span className="text-[10px] uppercase text-indigo-400 font-bold">3. Reaktif Durum</span>
                      <p className="text-[10px] text-slate-400 leading-tight">Masaüstü, yeni uygulamanızı dinamik olarak algılar ve çift tıkla çalıştırmaya ayarlar.</p>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850 space-y-1">
                      <span className="text-[10px] uppercase text-indigo-400 font-bold">4. Çift Kanallı API</span>
                      <p className="text-[10px] text-slate-400 leading-tight">Gelecek sürümlerde (v3.0) yerel pencere yöneticisi ve çöp kutusu reaksiyonları API'si dahil edilecektir.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-950/30 border border-indigo-800/20 rounded-xl space-y-1 flex items-start gap-3">
                  <Coffee size={24} className="text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Geliştirici Teşvik Modeli</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Sisteme faydalı çözümler üreten topluluk geliştiricilerine By Tecbit tarafından tescilli "TEN Developer" sertifikası ve sanal rütbe verilecektir!
                    </p>
                  </div>
                </div>
              </section>

              {/* App Publishing Terminal Form */}
              <section className="w-full md:w-96 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">Yayınlama Terminali</h3>
                  <p className="text-[11px] text-slate-400">Formu doldurarak anında kendi simgenizi oluşturun</p>
                </div>

                <form onSubmit={handleCreateCustomApp} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Uygulama İsmi</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Örn: Döviz Kurları, Bloomberg"
                      value={customAppName}
                      onChange={(e) => setCustomAppName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 outline-none p-2.5 rounded-lg text-slate-200 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Uygulama Web Adresi (URL)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Örn: tr.wikipedia.org veya example.com"
                      value={customAppUrl}
                      onChange={(e) => setCustomAppUrl(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 outline-none p-2.5 rounded-lg text-slate-200 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">İkon / Simge Seçin (Emoji)</label>
                    <div className="grid grid-cols-6 gap-2">
                      {['🚀', '⚡', '💻', '🔮', '🍀', '🍕', '🎮', '💡', '🔥', '🐾', '⚽', '🛠️'].map(emoji => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setCustomAppIcon(emoji)}
                          className={`text-xl p-1.5 rounded-lg transition-all ${
                            customAppIcon === emoji 
                              ? 'bg-blue-600 border border-blue-400 scale-110 shadow-lg' 
                              : 'bg-slate-900 border border-slate-850 hover:bg-slate-800'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 mt-4 text-[11px]"
                  >
                    <Zap size={14} />
                    Masaüstüne Yayınla ve Kur
                  </button>
                </form>
              </section>

            </div>
          </main>
        )}

        {/* Change logs News Tab */}
        {activeTab === 'news' && (
          <main className="flex-1 overflow-y-auto p-6 bg-[#04060c] space-y-6 custom-scrollbar max-w-4xl mx-auto">
            <div className="space-y-2">
              <span className="text-[10px] bg-blue-900/30 text-blue-400 border border-blue-500/20 font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">v2.0 DEV SÜRÜMÜ</span>
              <h2 className="text-2xl font-black text-slate-100">Yazılım Merkezi Büyük Güncelleme Notları</h2>
              <p className="text-xs text-slate-400">TenOS yazılım ekosistemini zenginleştiren yeni özellikler ve altyapı iyileştirmeleri</p>
            </div>

            <div className="space-y-5 mt-6">
              
              {/* Feature 1 */}
              <div className="bg-slate-900/40 border border-slate-850 rounded-xl p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Globe size={15} /> Progressive Web App (PWA) Desteği
                </div>
                <h3 className="text-sm font-bold text-slate-200">Onlarca İnternet Çözümü Tek Tıkla Masaüstünüzde!</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Platformdaki yerel uygulama sayısını artırmak amacıyla yeni bir PWA altyapısı entegre edildi. Artık YouTube, Wikipedia, Spotify ve GitHub gibi dünya standartlarındaki dinamik servisleri tek tıkla masaüstünüze kısayol olarak yerleştirebilir, ayrımsız pencerelerde anında çalıştırabilirsiniz.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-900/40 border border-slate-850 rounded-xl p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-violet-400 font-bold text-xs uppercase tracking-wider">
                  <Laptop size={15} /> Kişiselleştirilebilir Masaüstü Canlı Araçları (Widgets)
                </div>
                <h3 className="text-sm font-bold text-slate-200">Gerçek Zamanlı Veriler Doğrudan Duvar Kağıdınızda!</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sıkıcı ve statik masaüstü görüntüsünden sıkılanlar için dinamik widget sistemini duyuruyoruz. Yazılım merkezimiz üzerinden dilediğiniz araçları ("Hava Durumu", "Aylık Takvim", "Canlı RAM ve Disk İzleyici") tek hareketle masaüstünüzün sağ tarafına sabitleyebilir, TenOS kullanırken verilerinizi her an canlı izleyebilirsiniz.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-900/40 border border-slate-850 rounded-xl p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-indigo-405 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <Code size={15} /> SDK v2.0 Sandbox & Topluluk İmzaları
                </div>
                <h3 className="text-sm font-bold text-slate-200">Kendi Kodunu Çalıştır, Sisteme Entegre Et!</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Topluluk ruhunu canlı tutmak adına tasarlanan "Yayınlama Terminali" sayesinde her kullanıcı artık bir geliştirici! Kendi belirlediğiniz web adreslerini veya özel reaktif HTML araçlarını anında isimlendirip paketleyerek TenOS masaüstüne özgürce dahil edebilirsiniz.
                </p>
              </div>

            </div>

            <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl text-center text-[11px] text-slate-500">
              Yazılım ekosistemini geliştirmemize yardımcı olan By Tecbit ekibine ve tüm TEN OS topluluğuna teşekkür ederiz. Tüm Hakları Saklıdır © 2026.
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
