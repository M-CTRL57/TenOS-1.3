import { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import StartupScreen from './components/StartupScreen';
import Desktop from './components/Desktop';
import FilesApp from './components/FilesApp';
import SettingsApp from './components/SettingsApp';
import ShutdownScreen from './components/ShutdownScreen';
import WindowWrapper from './components/WindowWrapper';
import Taskbar from './components/Taskbar';
import AboutApp from './components/AboutApp';
import NewsApp from './components/NewsApp';
import BiosApp from './components/BiosApp';
import BrowserApp from './components/BrowserApp';
import CameraApp from './components/CameraApp';
import GalleryApp from './components/GalleryApp';
import SteamApp from './components/SteamApp';
import ResourceMonitorApp from './components/ResourceMonitorApp';
import HackerBrowserApp from './components/HackerBrowserApp';
import BsodScreen from './components/BsodScreen';
import CodeEditorApp from './components/CodeEditorApp';
import DebugConsoleApp from './components/DebugConsoleApp';
import MarkdownNotesApp from './components/MarkdownNotesApp';
import PdfViewerApp from './components/PdfViewerApp';
import TPlayerApp from './components/TPlayerApp';
import SYPmailApp from './components/SYPmailApp';
import SnakeGameApp from './components/SnakeGameApp';
import AppStoreApp from './components/AppStoreApp';
import CalculatorApp from './components/CalculatorApp';
import InfoApp from './components/InfoApp';
import KankaAIApp from './components/KankaAIApp';
import StartMenu from './components/StartMenu';
import Toast from './components/Toast';
import SystemTray from './components/SystemTray';
import MobileCenter from './components/MobileCenter';
import LockScreen from './components/LockScreen';

export default function App() {
  const [appState, setAppState] = useState<'startup' | 'desktop' | 'shutdown' | 'bios' | 'bsod'>('startup');
  const [isLocked, setIsLocked] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isMobileCenterOpen, setIsMobileCenterOpen] = useState(false);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: 'Kullanıcı', photo: 'https://picsum.photos/200' });
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('Çok yakında gelecek!');
  const [isDefragging, setIsDefragging] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  
  const [wallpaper, setWallpaper] = useState<string>('');
  const [lockScreenWallpaper, setLockScreenWallpaper] = useState<string>('');
  const [themeColor, setThemeColor] = useState<'red' | 'orange' | 'black' | 'white'>('black');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        setUserProfile({ name: user.displayName || 'Kullanıcı', photo: user.photoURL || 'https://picsum.photos/200' });
        try {
          const docRef = doc(db, 'preferences', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.wallpaper !== undefined) setWallpaper(data.wallpaper);
            if (data.lockScreenWallpaper !== undefined) setLockScreenWallpaper(data.lockScreenWallpaper);
            if (data.themeColor !== undefined) setThemeColor(data.themeColor);
          }
        } catch (err) {
          console.error("Failed to load preferences:", err);
        }
      }
    });
    return unsub;
  }, []);

  const savePreference = async (key: string, value: string) => {
    if (!firebaseUser) return;
    try {
      await setDoc(doc(db, 'preferences', firebaseUser.uid), {
        wallpaper: key === 'wallpaper' ? value : wallpaper,
        lockScreenWallpaper: key === 'lockScreenWallpaper' ? value : lockScreenWallpaper,
        themeColor: key === 'themeColor' ? value : themeColor,
      }, { merge: true });
    } catch (err) {
      console.error("Failed to save preference:", err);
    }
  };

  const handleSetWallpaper = (w: string) => {
    setWallpaper(w);
    savePreference('wallpaper', w);
  };

  const handleSetLockScreenWallpaper = (w: string) => {
    setLockScreenWallpaper(w);
    savePreference('lockScreenWallpaper', w);
  };

  const handleSetThemeColor = (c: 'red' | 'orange' | 'black' | 'white') => {
    setThemeColor(c);
    savePreference('themeColor', c);
  };
  const [windows, setWindows] = useState({
    files: { open: false, minimized: false, maximized: false },
    settings: { open: false, minimized: false, maximized: false },
    about: { open: false, minimized: false, maximized: false },
    news: { open: false, minimized: false, maximized: false },
    browser: { open: false, minimized: false, maximized: false },
    camera: { open: false, minimized: false, maximized: false },
    gallery: { open: false, minimized: false, maximized: false },
    steam: { open: false, minimized: false, maximized: false },
    resourceMonitor: { open: false, minimized: false, maximized: false },
    hackerBrowser: { open: false, minimized: false, maximized: false },
    codeEditor: { open: false, minimized: false, maximized: false },
    debugConsole: { open: false, minimized: false, maximized: false },
    markdownNotes: { open: false, minimized: false, maximized: false },
    pdfViewer: { open: false, minimized: false, maximized: false },
    tplayer: { open: false, minimized: false, maximized: false },
    sypmail: { open: false, minimized: false, maximized: false },
    store: { open: false, minimized: false, maximized: false },
    snake: { open: false, minimized: false, maximized: false },
    calculator: { open: false, minimized: false, maximized: false },
    info: { open: false, minimized: false, maximized: false },
    kanka: { open: false, minimized: false, maximized: false },
    webAppWindow: { open: false, minimized: false, maximized: false }
  });

  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const [searchMode, setSearchMode] = useState<'app' | 'internet'>('app');

  const [installedApps, setInstalledApps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tenos_installed_apps');
      return saved ? JSON.parse(saved) : ['store'];
    } catch {
      return ['store'];
    }
  });

  useEffect(() => {
    localStorage.setItem('tenos_installed_apps', JSON.stringify(installedApps));
  }, [installedApps]);

  const [customApps, setCustomApps] = useState<{ id: string, name: string, icon: string, url: string }[]>(() => {
    try {
      const saved = localStorage.getItem('tenos_custom_apps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tenos_custom_apps', JSON.stringify(customApps));
  }, [customApps]);

  const [currentWebApp, setCurrentWebApp] = useState<{ id: string, name: string, url: string, icon?: string } | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  const startDefrag = () => {
    setIsDefragging(true);
    setWindows(prev => ({...prev, about: { open: false, minimized: false, maximized: false }}));
    setTimeout(() => {
      setIsDefragging(false);
      // Play sound here ideally, or at least trigger Toast
      showToast('Disk birleştirme tamamlandı.');
    }, 5000);
  };

  const handleDriverUpdate = () => {
    showToast('Sürücü güncelleniyor...');
    setWindows(prev => ({ ...prev, settings: { ...prev.settings, open: false } }));
    setTimeout(() => {
      setAppState('startup');
      showToast('TenOS sürücü güncellemesi tamamlandı.');
    }, 2000);
  };

  const handleSystemUpdate = () => {
    showToast('Sistem güncelleniyor, lütfen bekleyin...');
    setWindows(prev => ({ ...prev, settings: { ...prev.settings, open: false } }));
    setTimeout(() => {
      setAppState('startup');
      showToast('TenOS başarıyla güncellendi.');
    }, 2000);
  };

  useEffect(() => {
    let clickCount = 0;
    let lastClickTime = Date.now();

    const handleGlobalClick = () => {
      const now = Date.now();
      if (now - lastClickTime < 300) {
        clickCount++;
      } else {
        clickCount = 1;
      }
      lastClickTime = now;

      // 8 very fast clicks trigger the funny toast
      if (clickCount > 8) {
        showToast('Yavaşla şampiyon, yetişemiyorum!');
        clickCount = 0;
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  useEffect(() => {
    if (appState === 'desktop') {
      const timer = setTimeout(() => showToast('TEN OS\'e Hoş Geldiniz!'), 5000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  if (appState === 'startup') return <StartupScreen onComplete={() => { setAppState('desktop'); setIsLocked(true); }} />;
  if (appState === 'shutdown') return <ShutdownScreen />;
  if (appState === 'bios') return <BiosApp onReboot={() => { setAppState('startup'); showToast('Sistem Sıfırlandı'); }} onClose={() => setAppState('desktop')} />;
  if (appState === 'bsod') return <BsodScreen onRecover={() => { setAppState('startup'); setTimeout(() => showToast('Ben de ne yaptığımı bilmiyorum ama galiba bozuldu.'), 3000); }} />;

  return (
    <div className="w-screen h-screen bg-black text-[#e0e0e0] overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center text-[150px] font-black opacity-5 pointer-events-none tracking-tighter">TEN OS</div>
      
      {isLocked && <LockScreen wallpaper={lockScreenWallpaper || wallpaper} onUnlock={() => setIsLocked(false)} />}

      {isDefragging && (
        <div className="absolute inset-0 bg-black z-[100] flex items-center justify-center">
          <p className="text-red-500 font-mono text-xl animate-pulse">Disk Birleştirme Başlatılıyor...</p>
        </div>
      )}

      <Desktop 
        installedApps={installedApps}
        customApps={customApps}
        wallpaper={wallpaper}
        onTrashDrop={() => showToast('BURP! Daha fazla veri ver!')}
        onOpenSteam={() => setWindows(prev => ({ ...prev, steam: { ...prev.steam, open: true, minimized: false } }))} 
        onOpenResourceMonitor={() => setWindows(prev => ({ ...prev, resourceMonitor: { ...prev.resourceMonitor, open: true, minimized: false } }))}
        onOpenHackerBrowser={() => setWindows(prev => ({ ...prev, hackerBrowser: { ...prev.hackerBrowser, open: true, minimized: false } }))}
        onOpenCodeEditor={() => setWindows(prev => ({ ...prev, codeEditor: { ...prev.codeEditor, open: true, minimized: false } }))}
        onOpenDebugConsole={() => setWindows(prev => ({ ...prev, debugConsole: { ...prev.debugConsole, open: true, minimized: false } }))}
        onOpenMarkdownNotes={() => setWindows(prev => ({ ...prev, markdownNotes: { ...prev.markdownNotes, open: true, minimized: false } }))}
        onOpenPdfViewer={() => setWindows(prev => ({ ...prev, pdfViewer: { ...prev.pdfViewer, open: true, minimized: false } }))}
        onOpenTPlayer={() => setWindows(prev => ({ ...prev, tplayer: { ...prev.tplayer, open: true, minimized: false } }))}
        onOpenSYPmail={() => setWindows(prev => ({ ...prev, sypmail: { ...prev.sypmail, open: true, minimized: false } }))}
        onOpenStore={() => setWindows(prev => ({ ...prev, store: { ...prev.store, open: true, minimized: false } }))}
        onOpenSnake={() => setWindows(prev => ({ ...prev, snake: { ...prev.snake, open: true, minimized: false } }))}
        onOpenCalculator={() => setWindows(prev => ({ ...prev, calculator: { ...prev.calculator, open: true, minimized: false } }))}
        onOpenTextEditor={() => setWindows(prev => ({ ...prev, markdownNotes: { ...prev.markdownNotes, open: true, minimized: false } }))}
        onOpenInfo={() => setWindows(prev => ({ ...prev, info: { ...prev.info, open: true, minimized: false } }))}
        onOpenKankaAI={() => setWindows(prev => ({ ...prev, kanka: { ...prev.kanka, open: true, minimized: false } }))}
        onOpenWikipedia={() => {
          setCurrentWebApp({ id: 'wikipedia', name: 'Vikipedi PWA', url: 'https://tr.wikipedia.org/' });
          setWindows(prev => ({ ...prev, webAppWindow: { open: true, minimized: false, maximized: false } }));
        }}
        onOpenCustomApp={(id: string) => {
          const app = customApps.find(a => a.id === id);
          if (app) {
            setCurrentWebApp(app);
            setWindows(prev => ({ ...prev, webAppWindow: { open: true, minimized: false, maximized: false } }));
          }
        }}
        onRefresh={() => showToast('Cihazınız yenilendi')}
      />
      
      <SystemTray 
        onOpenAbout={() => setWindows(prev => ({ ...prev, about: { open: true, minimized: false, maximized: false } }))} 
        onOpenNews={() => setWindows(prev => ({ ...prev, news: { open: true, minimized: false, maximized: false } }))}
        onToggleMobileCenter={() => setIsMobileCenterOpen(!isMobileCenterOpen)}
      />

      {isMobileCenterOpen && (
        <MobileCenter 
            onClose={() => setIsMobileCenterOpen(false)}
            onToggleWifi={() => setWifiEnabled(!wifiEnabled)}
            onToggleBluetooth={() => setBluetoothEnabled(!bluetoothEnabled)}
            wifiEnabled={wifiEnabled}
            bluetoothEnabled={bluetoothEnabled}
        />
      )}

      {isStartMenuOpen && (
        <StartMenu 
          onClose={() => setIsStartMenuOpen(false)}
          onOpenFiles={() => setWindows(prev => ({ ...prev, files: { ...prev.files, open: true, minimized: false } }))}
          onOpenSettings={() => setWindows(prev => ({ ...prev, settings: { ...prev.settings, open: true, minimized: false } }))}
          onOpenAbout={() => setWindows(prev => ({ ...prev, about: { ...prev.about, open: true, minimized: false } }))}
          onOpenBrowser={() => { setWindows(prev => ({ ...prev, browser: { ...prev.browser, open: true, minimized: false } })); setIsStartMenuOpen(false); }}
          onOpenCamera={() => { setWindows(prev => ({ ...prev, camera: { ...prev.camera, open: true, minimized: false } })); setIsStartMenuOpen(false); }}
          onOpenGallery={() => { setWindows(prev => ({ ...prev, gallery: { ...prev.gallery, open: true, minimized: false } })); setIsStartMenuOpen(false); }}
          onOpenSteam={() => { setWindows(prev => ({ ...prev, steam: { ...prev.steam, open: true, minimized: false } })); setIsStartMenuOpen(false); }}
          onOpenResourceMonitor={() => { setWindows(prev => ({ ...prev, resourceMonitor: { ...prev.resourceMonitor, open: true, minimized: false } })); setIsStartMenuOpen(false); }}
          onOpenHackerBrowser={() => { setWindows(prev => ({ ...prev, hackerBrowser: { ...prev.hackerBrowser, open: true, minimized: false } })); setIsStartMenuOpen(false); }}
          onOpenPdfViewer={() => { setWindows(prev => ({ ...prev, pdfViewer: { ...prev.pdfViewer, open: true, minimized: false } })); setIsStartMenuOpen(false); }}
          onOpenTPlayer={() => { setWindows(prev => ({ ...prev, tplayer: { ...prev.tplayer, open: true, minimized: false } })); setIsStartMenuOpen(false); }}
          onOpenSYPmail={() => { setWindows(prev => ({ ...prev, sypmail: { ...prev.sypmail, open: true, minimized: false } })); setIsStartMenuOpen(false); }}
          onShutdown={() => setAppState('startup')}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />
      )}

      {windows.files.open && !windows.files.minimized && (
        <WindowWrapper 
          title="Dosyalar" 
          onClose={() => setWindows(prev => ({ ...prev, files: { ...prev.files, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, files: { ...prev.files, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, files: { ...prev.files, maximized: !prev.files.maximized } }))}
          isMaximized={windows.files.maximized}
          themeColor={themeColor}
          isActive={activeWindow === 'files'}
          onFocus={() => setActiveWindow('files')}
        >
          <FilesApp 
            onClose={() => setWindows(prev => ({ ...prev, files: { ...prev.files, open: false } }))} 
            onCrash={() => setAppState('bsod')}
          />
        </WindowWrapper>
      )}

      {windows.settings.open && !windows.settings.minimized && (
        <WindowWrapper 
          title="Ayarlar" 
          onClose={() => setWindows(prev => ({ ...prev, settings: { ...prev.settings, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, settings: { ...prev.settings, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, settings: { ...prev.settings, maximized: !prev.settings.maximized } }))}
          isMaximized={windows.settings.maximized}
          themeColor={themeColor}
          isActive={activeWindow === 'settings'}
          onFocus={() => setActiveWindow('settings')}
        >
          <SettingsApp 
            onOpenBios={() => setAppState('bios')} 
            onDriverUpdate={handleDriverUpdate} 
            onSystemUpdate={handleSystemUpdate} 
            wallpaper={wallpaper}
            lockScreenWallpaper={lockScreenWallpaper}
            themeColor={themeColor}
            onChangeWallpaper={handleSetWallpaper}
            onChangeLockScreenWallpaper={handleSetLockScreenWallpaper}
            onChangeThemeColor={handleSetThemeColor}
            onFontChange={() => showToast('Daha hazır değil')}
            firebaseUser={firebaseUser}
          />
        </WindowWrapper>
      )}

      {windows.about.open && !windows.about.minimized && (
        <WindowWrapper 
          title="About Computer" 
          onClose={() => setWindows(prev => ({ ...prev, about: { ...prev.about, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, about: { ...prev.about, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, about: { ...prev.about, maximized: !prev.about.maximized } }))}
          isMaximized={windows.about.maximized}
          themeColor={themeColor}
          isActive={activeWindow === 'about'}
          onFocus={() => setActiveWindow('about')}
        >
          <AboutApp onStartDefrag={startDefrag} />
        </WindowWrapper>
      )}

      {windows.news.open && !windows.news.minimized && (
        <WindowWrapper 
          title="Haberler" 
          onClose={() => setWindows(prev => ({ ...prev, news: { ...prev.news, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, news: { ...prev.news, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, news: { ...prev.news, maximized: !prev.news.maximized } }))}
          isMaximized={windows.news.maximized}
          themeColor={themeColor}
          isActive={activeWindow === 'news'}
          onFocus={() => setActiveWindow('news')}
        >
          <NewsApp />
        </WindowWrapper>
      )}

      {windows.browser.open && !windows.browser.minimized && (
        <WindowWrapper 
          title="Google Chrome" 
          onClose={() => setWindows(prev => ({ ...prev, browser: { ...prev.browser, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, browser: { ...prev.browser, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, browser: { ...prev.browser, maximized: !prev.browser.maximized } }))}
          isMaximized={windows.browser.maximized}
          isActive={activeWindow === 'browser'}
          onFocus={() => setActiveWindow('browser')}
        >
          <BrowserApp onClose={() => setWindows(prev => ({ ...prev, browser: { ...prev.browser, open: false } }))} />
        </WindowWrapper>
      )}

      {windows.camera.open && !windows.camera.minimized && (
        <WindowWrapper 
          title="Kamera" 
          onClose={() => setWindows(prev => ({ ...prev, camera: { ...prev.camera, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, camera: { ...prev.camera, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, camera: { ...prev.camera, maximized: !prev.camera.maximized } }))}
          isMaximized={windows.camera.maximized}
          isActive={activeWindow === 'camera'}
          onFocus={() => setActiveWindow('camera')}
        >
          <CameraApp />
        </WindowWrapper>
      )}

      {windows.gallery.open && !windows.gallery.minimized && (
        <WindowWrapper 
          title="Galeri" 
          onClose={() => setWindows(prev => ({ ...prev, gallery: { ...prev.gallery, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, gallery: { ...prev.gallery, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, gallery: { ...prev.gallery, maximized: !prev.gallery.maximized } }))}
          isMaximized={windows.gallery.maximized}
          isActive={activeWindow === 'gallery'}
          onFocus={() => setActiveWindow('gallery')}
        >
          <GalleryApp />
        </WindowWrapper>
      )}

      {windows.steam.open && !windows.steam.minimized && (
        <WindowWrapper 
          title="Steam" 
          onClose={() => setWindows(prev => ({ ...prev, steam: { ...prev.steam, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, steam: { ...prev.steam, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, steam: { ...prev.steam, maximized: !prev.steam.maximized } }))}
          isMaximized={windows.steam.maximized}
          isActive={activeWindow === 'steam'}
          onFocus={() => setActiveWindow('steam')}
        >
          <SteamApp onOpenSnake={() => {
            setWindows(prev => ({ ...prev, snake: { ...prev.snake, open: true, minimized: false } }));
            setInstalledApps(prev => prev.includes('snake') ? prev : [...prev, 'snake']);
          }} />
        </WindowWrapper>
      )}

      {windows.resourceMonitor.open && !windows.resourceMonitor.minimized && (
        <WindowWrapper 
          title="Kaynak İzleyicisi" 
          onClose={() => setWindows(prev => ({ ...prev, resourceMonitor: { ...prev.resourceMonitor, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, resourceMonitor: { ...prev.resourceMonitor, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, resourceMonitor: { ...prev.resourceMonitor, maximized: !prev.resourceMonitor.maximized } }))}
          isMaximized={windows.resourceMonitor.maximized}
          isActive={activeWindow === 'resourceMonitor'}
          onFocus={() => setActiveWindow('resourceMonitor')}
        >
          <ResourceMonitorApp />
        </WindowWrapper>
      )}

      {windows.hackerBrowser.open && !windows.hackerBrowser.minimized && (
        <WindowWrapper 
          title="T İnternet" 
          onClose={() => setWindows(prev => ({ ...prev, hackerBrowser: { ...prev.hackerBrowser, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, hackerBrowser: { ...prev.hackerBrowser, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, hackerBrowser: { ...prev.hackerBrowser, maximized: !prev.hackerBrowser.maximized } }))}
          isMaximized={windows.hackerBrowser.maximized}
          isActive={activeWindow === 'hackerBrowser'}
          onFocus={() => setActiveWindow('hackerBrowser')}
        >
          <HackerBrowserApp onTriggerVirus={() => setAppState('bsod')} />
        </WindowWrapper>
      )}

      {windows.codeEditor.open && !windows.codeEditor.minimized && (
        <WindowWrapper 
          title="TenOS Code" 
          onClose={() => setWindows(prev => ({ ...prev, codeEditor: { ...prev.codeEditor, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, codeEditor: { ...prev.codeEditor, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, codeEditor: { ...prev.codeEditor, maximized: !prev.codeEditor.maximized } }))}
          isMaximized={windows.codeEditor.maximized}
          isActive={activeWindow === 'codeEditor'}
          onFocus={() => setActiveWindow('codeEditor')}
        >
          <CodeEditorApp />
        </WindowWrapper>
      )}

      {windows.debugConsole.open && !windows.debugConsole.minimized && (
        <WindowWrapper 
          title="Debug Konsol" 
          onClose={() => setWindows(prev => ({ ...prev, debugConsole: { ...prev.debugConsole, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, debugConsole: { ...prev.debugConsole, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, debugConsole: { ...prev.debugConsole, maximized: !prev.debugConsole.maximized } }))}
          isMaximized={windows.debugConsole.maximized}
          isActive={activeWindow === 'debugConsole'}
          onFocus={() => setActiveWindow('debugConsole')}
        >
          <DebugConsoleApp />
        </WindowWrapper>
      )}

      {windows.markdownNotes.open && !windows.markdownNotes.minimized && (
        <WindowWrapper 
          title="Not Defteri" 
          onClose={() => setWindows(prev => ({ ...prev, markdownNotes: { ...prev.markdownNotes, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, markdownNotes: { ...prev.markdownNotes, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, markdownNotes: { ...prev.markdownNotes, maximized: !prev.markdownNotes.maximized } }))}
          isMaximized={windows.markdownNotes.maximized}
          isActive={activeWindow === 'markdownNotes'}
          onFocus={() => setActiveWindow('markdownNotes')}
        >
          <MarkdownNotesApp />
        </WindowWrapper>
      )}

      {windows.pdfViewer.open && !windows.pdfViewer.minimized && (
        <WindowWrapper 
          title="PDF Görüntüleyici" 
          onClose={() => setWindows(prev => ({ ...prev, pdfViewer: { ...prev.pdfViewer, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, pdfViewer: { ...prev.pdfViewer, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, pdfViewer: { ...prev.pdfViewer, maximized: !prev.pdfViewer.maximized } }))}
          isMaximized={windows.pdfViewer.maximized}
          isActive={activeWindow === 'pdfViewer'}
          onFocus={() => setActiveWindow('pdfViewer')}
        >
          <PdfViewerApp />
        </WindowWrapper>
      )}

      {windows.tplayer.open && !windows.tplayer.minimized && (
        <WindowWrapper 
          title="Tplayer¿" 
          onClose={() => setWindows(prev => ({ ...prev, tplayer: { ...prev.tplayer, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, tplayer: { ...prev.tplayer, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, tplayer: { ...prev.tplayer, maximized: !prev.tplayer.maximized } }))}
          isMaximized={windows.tplayer.maximized}
          isActive={activeWindow === 'tplayer'}
          onFocus={() => setActiveWindow('tplayer')}
        >
          <TPlayerApp />
        </WindowWrapper>
      )}

      {windows.sypmail.open && !windows.sypmail.minimized && (
        <WindowWrapper 
          title="SYPmail" 
          onClose={() => setWindows(prev => ({ ...prev, sypmail: { ...prev.sypmail, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, sypmail: { ...prev.sypmail, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, sypmail: { ...prev.sypmail, maximized: !prev.sypmail.maximized } }))}
          isMaximized={windows.sypmail.maximized}
          isActive={activeWindow === 'sypmail'}
          onFocus={() => setActiveWindow('sypmail')}
        >
          <SYPmailApp />
        </WindowWrapper>
      )}

      {windows.store.open && !windows.store.minimized && (
        <WindowWrapper 
          title="blue" 
          onClose={() => setWindows(prev => ({ ...prev, store: { ...prev.store, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, store: { ...prev.store, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, store: { ...prev.store, maximized: !prev.store.maximized } }))}
          isMaximized={windows.store.maximized}
          isActive={activeWindow === 'store'}
          onFocus={() => setActiveWindow('store')}
        >
          <AppStoreApp 
            installedApps={installedApps} 
            onInstallApp={(id) => {
              setInstalledApps(prev => prev.includes(id) ? prev : [...prev, id]);
              showToast(
                id.includes('widget') 
                  ? 'Araç başarıyla kuruldu ve masaüstüne yerleştirildi!' 
                  : (id === 'wikipedia')
                    ? 'Web PWA uygulaması kuruldu, masaüstü kısayolu oluşturuldu.'
                    : 'Uygulama başarıyla kuruldu ve masaüstüne eklendi!'
              );
            }}
            onUninstallApp={(id) => {
              setInstalledApps(prev => prev.filter(x => x !== id));
              showToast('Uygulama/Araç başarıyla kaldırıldı.');
            }}
            customApps={customApps}
            onAddCustomApp={(app) => {
              setCustomApps(prev => [...prev, app]);
              setInstalledApps(prev => prev.includes(app.id) ? prev : [...prev, app.id]);
            }}
            onDeleteCustomApp={(id) => {
              setCustomApps(prev => prev.filter(x => x.id !== id));
              setInstalledApps(prev => prev.filter(x => x !== id));
              showToast('Özel uygulama sistemden silindi.');
            }}
          />
        </WindowWrapper>
      )}

      {windows.kanka.open && !windows.kanka.minimized && (
        <WindowWrapper 
          title="Kanka AI" 
          onClose={() => setWindows(prev => ({ ...prev, kanka: { ...prev.kanka, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, kanka: { ...prev.kanka, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, kanka: { ...prev.kanka, maximized: !prev.kanka.maximized } }))}
          isMaximized={windows.kanka.maximized}
          isActive={activeWindow === 'kanka'}
          onFocus={() => setActiveWindow('kanka')}
        >
          <KankaAIApp />
        </WindowWrapper>
      )}

      {windows.snake.open && !windows.snake.minimized && (
        <WindowWrapper 
          title="Yılan Oyunu" 
          onClose={() => setWindows(prev => ({ ...prev, snake: { ...prev.snake, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, snake: { ...prev.snake, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, snake: { ...prev.snake, maximized: !prev.snake.maximized } }))}
          isMaximized={windows.snake.maximized}
          isActive={activeWindow === 'snake'}
          onFocus={() => setActiveWindow('snake')}
        >
          <SnakeGameApp onClose={() => setWindows(prev => ({ ...prev, snake: { ...prev.snake, open: false } }))} />
        </WindowWrapper>
      )}

      {windows.calculator.open && !windows.calculator.minimized && (
        <WindowWrapper 
          title="Hesap Makinesi" 
          onClose={() => setWindows(prev => ({ ...prev, calculator: { ...prev.calculator, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, calculator: { ...prev.calculator, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, calculator: { ...prev.calculator, maximized: !prev.calculator.maximized } }))}
          isMaximized={windows.calculator.maximized}
          isActive={activeWindow === 'calculator'}
          onFocus={() => setActiveWindow('calculator')}
        >
          <CalculatorApp />
        </WindowWrapper>
      )}

      {windows.info.open && !windows.info.minimized && (
        <WindowWrapper 
          title="TEN OS Hakkında" 
          onClose={() => setWindows(prev => ({ ...prev, info: { ...prev.info, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, info: { ...prev.info, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, info: { ...prev.info, maximized: !prev.info.maximized } }))}
          isMaximized={windows.info.maximized}
          isActive={activeWindow === 'info'}
          onFocus={() => setActiveWindow('info')}
        >
          <InfoApp />
        </WindowWrapper>
      )}

      {windows.webAppWindow.open && !windows.webAppWindow.minimized && currentWebApp && (
        <WindowWrapper 
          title={currentWebApp.name} 
          onClose={() => setWindows(prev => ({ ...prev, webAppWindow: { ...prev.webAppWindow, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, webAppWindow: { ...prev.webAppWindow, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, webAppWindow: { ...prev.webAppWindow, maximized: !prev.webAppWindow.maximized } }))}
          isMaximized={windows.webAppWindow.maximized}
          isActive={activeWindow === 'webAppWindow'}
          onFocus={() => setActiveWindow('webAppWindow')}
        >
          <div className="flex flex-col w-full h-full bg-[#1e1e1e] text-white select-none">
            <div className="h-9 bg-[#252526] border-b border-[#333] flex items-center justify-between px-4 text-[11px] text-gray-400 font-mono">
              <span className="flex items-center gap-1.5"><span className="text-emerald-400 font-bold">●</span> Sınırlandırılmış Web Sandbox</span>
              <span className="max-w-[200px] sm:max-w-md truncate text-gray-500">{currentWebApp.url}</span>
              <span></span>
            </div>
            <iframe 
              src={currentWebApp.url} 
              className="flex-1 w-full bg-white text-black border-none"
              title={currentWebApp.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </WindowWrapper>
      )}

      <Taskbar 
        onToggleStart={() => setIsStartMenuOpen(!isStartMenuOpen)}
        onOpenFiles={() => setWindows(prev => ({ ...prev, files: { ...prev.files, open: true, minimized: false } }))}
        onOpenSettings={() => setWindows(prev => ({ ...prev, settings: { ...prev.settings, open: true, minimized: false } }))}
        onOpenAbout={() => setWindows(prev => ({ ...prev, about: { ...prev.about, open: true, minimized: false } }))}
        onOpenBrowser={() => { setWindows(prev => ({ ...prev, browser: { ...prev.browser, open: true, minimized: false } })); setIsStartMenuOpen(false); }}
        onShutdown={() => setAppState('startup')}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
      />
      
      <Toast visible={isToastVisible} message={toastMessage} />
    </div>
  );
}
