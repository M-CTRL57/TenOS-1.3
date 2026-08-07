import { Info } from 'lucide-react';

export default function InfoApp() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#1e1e1e] text-white p-8 space-y-6">
      <div className="bg-blue-500/20 p-6 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.3)]">
        <Info size={64} className="text-blue-400" />
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-wider">TEN OS</h1>
        <p className="text-lg text-blue-400">Versiyon 1.0</p>
      </div>
      
      <div className="bg-[#2a2a2a] p-6 rounded-xl border border-[#333] max-w-md text-center space-y-4">
        <p className="text-gray-300">
          Lüks tabanlı TenOS 1.0
        </p>
        <p className="text-gray-400 text-sm">
          Tüm hakları saklıdır.
        </p>
      </div>

      <div className="mt-8 text-gray-500 font-medium tracking-widest text-sm">
        BY TECBİT
      </div>
    </div>
  );
}
