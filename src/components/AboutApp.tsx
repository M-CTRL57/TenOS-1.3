
import { Monitor, Info, HardDrive, Cpu, MemoryStick, ShieldCheck } from 'lucide-react';

export default function AboutComputerApp({ onStartDefrag }: { onStartDefrag: () => void }) {
  return (
    <div className="h-full p-8 text-[#e0e0e0] space-y-6 overflow-y-auto bg-black/40 backdrop-blur-3xl font-sans rounded-b-[32px]">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <div className="w-20 h-20 bg-blue-500/20 border border-blue-400/30 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <Monitor size={40} className="text-blue-300 drop-shadow-md" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1 shadow-lg">
            <Info size={16} className="text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-light tracking-tight text-white">TenOS <span className="font-bold">5</span></h2>
          <p className="text-blue-300 font-medium tracking-wide">BlueGlass</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="col-span-2 bg-white/5 border border-white/10 p-5 rounded-2xl shadow-inner backdrop-blur-md space-y-3">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-white/50">İşletim Sistemi Sürümü</span>
            <span className="font-semibold text-white">TenOS 5</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-white/50">Kod Adı</span>
            <span className="font-semibold text-blue-300">BlueGlass</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-white/50">Lüks Tabanı</span>
            <span className="font-semibold text-white">TenOS 1.0</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-white/50">Geliştiriciler</span>
            <span className="font-semibold text-white">Hüsnü Mert Özcan</span>
          </div>
          <div className="flex justify-between items-center pb-1">
            <span className="text-white/50">İş Birliği Ortakları</span>
            <span className="font-semibold text-white">Twcbit, BİRZEKA, ARC STAR</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
          <Cpu size={24} className="text-white/40" />
          <div>
            <span className="text-white/50 block text-xs">İşlemci (CPU)</span>
            <span className="font-mono text-base font-semibold">Intel Core i5</span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
          <Monitor size={24} className="text-white/40" />
          <div>
            <span className="text-white/50 block text-xs">Ekran Kartı (GPU)</span>
            <span className="font-mono text-base font-semibold">RTX 5090</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <button onClick={onStartDefrag} className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-4 flex items-center justify-center gap-3 transition-colors shadow-sm">
          <HardDrive size={18} className="text-white/70" /> 
          <span className="font-medium">Disk Birleştirme</span>
        </button>
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs text-white/40 justify-center">
        <ShieldCheck size={14} />
        <span>Tüm hakları saklıdır. Tecvit tarafından.</span>
      </div>
    </div>
  );
}
