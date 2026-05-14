
import { Monitor, Info, HardDrive } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AboutComputerApp({ onStartDefrag }: { onStartDefrag: () => void }) {
  return (
    <div className="h-full p-6 text-[#e0e0e0] space-y-6 overflow-y-auto">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Monitor size={48} className="text-white/60" />
          <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5"><Info size={16} className="text-blue-500" /></div>
        </div>
        <h2 className="text-2xl font-semibold">About Computer</h2>
      </div>
      
      <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 space-y-2">
        <h3 className="font-semibold text-white/80">Tecbit Corp.</h3>
        <p className="text-xs text-white/50 italic">2016'dan beri en ince ve zarif işletim sistemini inşa ediyoruz.</p>
        <p className="text-xs text-white/50">Yöneticiler: Mert (Sen), Ömer, Alkas Özcan.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white/[0.03] p-4 rounded-xl">
          <span className="text-white/50 block">İşlemci (CPU)</span>
          <span className="font-mono text-lg">Intel Core i5</span>
        </div>
        <div className="bg-white/[0.03] p-4 rounded-xl">
          <span className="text-white/50 block">Bellek (RAM)</span>
          <span className="font-mono text-lg">24 GB</span>
        </div>
        <div className="bg-white/[0.03] p-4 rounded-xl">
          <span className="text-white/50 block">Ekran Kartı (GPU)</span>
          <span className="font-mono text-lg">RTX 5090</span>
        </div>
        <div className="bg-white/[0.03] p-4 rounded-xl">
           <button onClick={onStartDefrag} className="w-full h-full bg-blue-600/20 hover:bg-blue-600/40 rounded-lg flex items-center justify-center gap-2">
             <HardDrive size={16} /> Disk Birleştirme
           </button>
        </div>
      </div>
    </div>
  );
}
