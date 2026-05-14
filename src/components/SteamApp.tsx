import { useState, useEffect } from 'react';
import { AlertCircle, LogIn, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const accounts = ['GsmearBaba', 'YİĞİTBABAPİRO', 'MERTOOO', 'MERTOOOO', 'APPLEABİ', 'CİPÖMER2016'];

const games = [
  { id: 1, name: 'Blok Dünyası 2D', cover: 'https://picsum.photos/seed/blok2d/300/400' },
  { id: 2, name: 'Race on Fox', cover: 'https://picsum.photos/seed/racefox/300/400' },
  { id: 3, name: 'Block Craft 3D', cover: 'https://picsum.photos/seed/blockcraft/300/400' },
  { id: 4, name: 'Euro Truck Simulator', cover: 'https://picsum.photos/seed/ets/300/400' },
  { id: 5, name: 'Süper Bir Advense', cover: 'https://picsum.photos/seed/superadv/300/400' },
  { id: 6, name: 'Galaktik Savaşlar', cover: 'https://picsum.photos/seed/galaktik/300/400' },
  { id: 7, name: 'Kayıp Hazine', cover: 'https://picsum.photos/seed/hazine/300/400' },
  { id: 8, name: 'Piksel Ustası', cover: 'https://picsum.photos/seed/uasta/300/400' },
  { id: 9, name: 'Karanlık Orman', cover: 'https://picsum.photos/seed/orman/300/400' },
  { id: 10, name: 'Uzay Serüveni', cover: 'https://picsum.photos/seed/uzay/300/400' },
  { id: 11, name: 'Zombi Kıyameti', cover: 'https://picsum.photos/seed/zombi/300/400' },
  { id: 12, name: 'Hızlı Sürücü', cover: 'https://picsum.photos/seed/surucu/300/400' },
  { id: 13, name: 'Sihirli Şövalye', cover: 'https://picsum.photos/seed/sovalye/300/400' },
  { id: 14, name: 'Gelecek Şehir', cover: 'https://picsum.photos/seed/sehir/300/400' },
  { id: 15, name: 'Madenci Kardeşler', cover: 'https://picsum.photos/seed/maden/300/400' },
];

export default function SteamApp() {
  const [appState, setAppState] = useState<'connecting' | 'login' | 'loggedIn'>('connecting');
  const [accountName, setAccountName] = useState<string>('');
  const [errorModal, setErrorModal] = useState<{ open: boolean, step: number }>({ open: false, step: 1 });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (appState === 'connecting') {
      timer = setTimeout(() => {
        setAppState('login');
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [appState]);

  const handleLogin = () => {
    const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
    setAccountName(randomAccount);
    setAppState('loggedIn');
  };

  const handleDownload = () => {
    setErrorModal({ open: true, step: 1 });
  };

  const SteamLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor" className={className}>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 4.968 3.013 9.23 7.378 11.026l2.365-3.447c-.125-.333-.186-.684-.159-1.042l-3.32-1.378c-.01.127-.03.247-.03.385 0 2.228 1.808 4.038 4.036 4.038 2.23 0 4.04-1.81 4.04-4.038 0-2.228-1.81-4.04-4.04-4.04-.337 0-.66.04-.967.118l-1.39-3.355c1.472-.378 2.505-1.743 2.505-3.38 0-1.92-1.558-3.48-3.48-3.48S2.99 4.966 2.99 6.887c0 1.92 1.558 3.478 3.48 3.478 1.135 0 2.143-.547 2.766-1.39l3.353 1.39c-.078.307-.117.63-.117.967 0 2.228 1.807 4.036 4.035 4.036 2.228 0 4.038-1.808 4.038-4.036s-1.81-4.038-4.038-4.038c-1.636 0-3.003 1.033-3.38 2.505l-3.45-2.365C8.01 1.77 12 0 12 0zm-8.52 6.886c0-1.764 1.432-3.197 3.197-3.197 1.765 0 3.2 1.433 3.2 3.197 0 1.765-1.435 3.198-3.2 3.198-1.765 0-3.197-1.433-3.197-3.198zm11.758 7.37c-.328 0-.64-.066-.928-.182l-2.094 5.045c.99.308 2.062.308 3.053 0l-2.094-5.044c-.287.115-.6.18-.928.18zm-2.096-2.144l-2.05-4.94c-.22.185-.482.327-.77.412l3.208 4.414c-.13.036-.263.054-.398.054.12 0 .238-.01.355-.03l-3.207-4.41c.216-.184.4-.413.542-.676l4.908 2.036c-.083.29-.226.55-.41.77l-4.912-2.035c.184.215.412.398.674.54l4.412 3.207c-.02-.117-.03-.235-.03-.355 0-.135.018-.268.055-.398l-4.415-3.208c.185-.224.327-.487.41-.774l4.94 2.05c.002.046.007.09.007.135 0 .807-.655 1.464-1.464 1.464-.808 0-1.464-.657-1.464-1.464z" />
    </svg>
  );

  return (
    <div className="flex flex-col h-full bg-[#1b2838] text-gray-300 relative font-sans overflow-hidden">
        <AnimatePresence>
            {appState === 'connecting' && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-50 bg-[#171a21] flex flex-col items-center justify-center p-8 text-center"
                >
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-12 relative"
                    >
                        <motion.div 
                           animate={{ rotate: 360 }} 
                           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                           className="absolute inset-0 border-t-2 border-[#66c0f4] rounded-full scale-150 opacity-20"
                        />
                        <SteamLogo className="text-[#66c0f4]" />
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-center gap-3 text-[#66c0f4] mb-2"
                    >
                        <h2 className="text-xl font-bold">Sunucuya bağlanılıyor...</h2>
                        <p className="text-gray-400 max-w-md mt-4 text-sm">
                            Steam ağına bağlanılıyor. Lütfen bekleyin.
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {appState === 'login' && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center p-8 bg-[#1b2838]"
            >
                <CheckCircle2 size={64} className="text-[#66c0f4] mb-6" />
                <h1 className="text-2xl font-light text-white mb-4 tracking-wider">SUNUCUYA BAĞLANILDI</h1>
                <p className="text-[#8f98a0] text-center max-w-lg mb-8">
                    Lütfen giriş yapınız. Otomatik hesap oluşturucu ile rastgele bir hesap kullanılacaktır.
                </p>
                <div className="bg-[#171a21] p-6 rounded shadow-lg w-full max-w-sm flex flex-col items-center">
                   <SteamLogo className="text-[#66c0f4] w-12 h-12 mb-6" />
                   <button 
                       onClick={handleLogin}
                       className="bg-gradient-to-r from-[#47bfff] to-[#1a44c2] hover:from-[#5cc5ff] hover:to-[#2255e3] text-white px-8 py-3 rounded-sm font-medium transition-all w-full flex items-center justify-center gap-2 transform hover:scale-105"
                   >
                       <LogIn size={20} />
                       Giriş Yap
                   </button>
                </div>
            </motion.div>
        )}

        {appState === 'loggedIn' && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col p-8 bg-[#1b2838]"
            >
                <div className="flex items-center gap-4 mb-8 shrink-0">
                   <div className="w-16 h-16 bg-[#171a21] border-2 border-[#66c0f4] p-1 shadow-[0_0_10px_rgba(102,192,244,0.3)]">
                       <img src={`https://picsum.photos/seed/${accountName}/100`} className="w-full h-full object-cover" alt="Profile" />
                   </div>
                   <div>
                       <h2 className="text-2xl font-bold text-white">{accountName}</h2>
                       <span className="text-[#66c0f4] text-sm">Çevrimiçi</span>
                   </div>
                </div>

                <div className="overflow-y-auto pb-8 flex-1 pr-4 custom-scrollbar">
                    {/* Hero Banner Section */}
                    <div className="relative w-full h-[400px] mb-8 rounded-sm overflow-hidden group cursor-pointer shadow-lg" onClick={handleDownload}>
                        <img src="https://picsum.photos/seed/steamhero/1200/600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Hero Game" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1b2838] via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <h2 className="text-4xl font-bold text-white mb-2 shadow-sm">ÖNE ÇIKAN OYUN</h2>
                            <p className="text-gray-300 max-w-lg mb-4">Şimdi ön siparişe açıldı. Maceraya hazır ol ve efsanevi açık dünyayı keşfet.</p>
                            <div className="flex gap-2">
                                <span className="bg-gray-800/80 px-2 py-1 text-xs text-white rounded">Açık Dünya</span>
                                <span className="bg-gray-800/80 px-2 py-1 text-xs text-white rounded">RPG</span>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-medium text-white mb-4 uppercase tracking-wider">Tavsiye Edilenler</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 content-start">
                        {games.map(game => (
                            <div key={game.id} className="bg-[#171a21] group relative overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                                <img src={game.cover} alt={game.name} className="w-full aspect-[3/4] object-cover transition-opacity group-hover:opacity-40" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={handleDownload} className="bg-[#66c0f4] hover:bg-[#4194c4] text-white px-6 py-2 rounded-sm font-medium transition-colors text-sm shadow-lg transform hover:scale-105">
                                        İndir
                                    </button>
                                </div>
                                <div className="p-3 bg-[#171a21]">
                                    <h3 className="text-white text-sm font-semibold truncate group-hover:text-[#66c0f4] transition-colors">{game.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        )}

        {errorModal.open && (
            <div className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
                <div className="bg-[#1b2838] border border-[#3d4450] rounded-sm p-6 max-w-md w-full shadow-2xl relative">
                    <div className="flex items-start gap-4 mb-6">
                        <AlertCircle className="text-red-500 shrink-0" size={32} />
                        <div>
                            <h3 className="text-white text-lg font-medium mb-2">Kurulum Hatası</h3>
                            <p className="text-[#8f98a0]">
                                {errorModal.step === 1 
                                    ? "Bu Senin cihazında uyumlu değil. Steam bu uygulamayı açamıyor."
                                    : "Bu Steam sürümünüzün uyumlu olduğundan emin olun."}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 uppercase text-sm font-semibold">
                        {errorModal.step === 1 && (
                            <>
                                <button 
                                    onClick={() => setErrorModal({ open: false, step: 1 })}
                                    className="bg-transparent hover:bg-white/5 text-white/70 hover:text-white px-5 py-2 transition-colors rounded-sm"
                                >
                                    Tamam
                                </button>
                                <button 
                                    onClick={() => setErrorModal({ open: true, step: 2 })}
                                    className="bg-[#66c0f4] hover:bg-[#4194c4] text-white px-5 py-2 transition-colors rounded-sm shadow-md"
                                >
                                    Bildir
                                </button>
                            </>
                        )}
                        {errorModal.step === 2 && (
                            <button 
                                onClick={() => setErrorModal({ open: false, step: 1 })}
                                className="bg-[#66c0f4] hover:bg-[#4194c4] text-white px-5 py-2 transition-colors rounded-sm shadow-md"
                            >
                                Tamam
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}
