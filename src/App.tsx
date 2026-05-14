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
    sypmail: { open: false, minimized: false, maximized: false }
  });

  const [searchMode, setSearchMode] = useState<'app' | 'internet'>('app');

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
        >
          <SteamApp />
        </WindowWrapper>
      )}

      {windows.resourceMonitor.open && !windows.resourceMonitor.minimized && (
        <WindowWrapper 
          title="Kaynak İzleyicisi" 
          onClose={() => setWindows(prev => ({ ...prev, resourceMonitor: { ...prev.resourceMonitor, open: false } }))}
          onMinimize={() => setWindows(prev => ({ ...prev, resourceMonitor: { ...prev.resourceMonitor, minimized: true } }))}
          onMaximize={() => setWindows(prev => ({ ...prev, resourceMonitor: { ...prev.resourceMonitor, maximized: !prev.resourceMonitor.maximized } }))}
          isMaximized={windows.resourceMonitor.maximized}
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
        >
          <SYPmailApp />
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
