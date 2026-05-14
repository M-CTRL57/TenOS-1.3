import { Battery, Sun, Volume2, Shield, Wifi, Bluetooth, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function MobileCenter({ 
  onClose, 
  onToggleWifi, 
  onToggleBluetooth, 
  wifiEnabled, 
  bluetoothEnabled 
}: { 
  onClose: () => void;
  onToggleWifi: () => void;
  onToggleBluetooth: () => void;
  wifiEnabled: boolean;
  bluetoothEnabled: boolean;
}) {
  const [brightness, setBrightness] = useState(80);
  const [volume, setVolume] = useState(60);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-12 right-0 bottom-12 w-80 bg-[#1a1a1a]/90 backdrop-blur-2xl border-l border-white/10 z-[100] p-6 flex flex-col gap-8 shadow-2xl"
      >
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Kontrol Paneli</h2>
            <button onClick={onClose}><X size={20} /></button>
        </div>

        {/* Battery */}
        <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center gap-3">
                <Battery className="text-green-400" />
                <span className="text-xl font-mono">92%</span>
            </div>
            <p className="text-xs text-white/50">Tahmini kalan çalışma süresi: 4 saat 15 dk</p>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Sun size={20} />
                <input type="range" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div className="flex items-center gap-3">
                <Volume2 size={20} />
                <input type="range" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
            </div>
        </div>

        {/* Quick Toggles */}
        <div className="grid grid-cols-2 gap-4">
            <button onClick={onToggleWifi} className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${wifiEnabled ? 'bg-blue-600/20 text-blue-400' : 'bg-white/[0.03] text-white/50'}`}>
                <Wifi size={24} /> <span>Wi-Fi</span>
            </button>
            <button onClick={onToggleBluetooth} className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${bluetoothEnabled ? 'bg-blue-600/20 text-blue-400' : 'bg-white/[0.03] text-white/50'}`}>
                <Bluetooth size={24} /> <span>BT</span>
            </button>
        </div>

        {/* Smart Home */}
        <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white/50 mb-2">Akıllı Ev</h3>
            <div className="grid grid-cols-2 gap-2">
               <button className="p-3 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-between text-xs">
                 Tüm Işıklar <div className="w-2 h-2 rounded-full bg-green-500"></div>
               </button>
               <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-between text-xs">
                 Klima <div className="w-2 h-2 rounded-full bg-red-500"></div>
               </button>
               <button className="p-3 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-between text-xs col-span-2">
                 Robot Süpürge: Şarjda
               </button>
            </div>
        </div>

        {/* VIP Mode */}
        <button className="flex items-center gap-3 w-full p-4 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl border border-white/5 justify-center mt-auto">
            <Shield className="text-amber-400" /> <span>Sunum (VIP) Modu</span>
        </button>

      </motion.div>
    </AnimatePresence>
  );
}
