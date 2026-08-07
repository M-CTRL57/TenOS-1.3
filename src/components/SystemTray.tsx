
import { Wifi, Battery, Bluetooth, Info, Bell, Newspaper } from 'lucide-react';

export default function SystemTray({ onOpenAbout, onOpenNews, onToggleMobileCenter }: { onOpenAbout: () => void, onOpenNews: () => void, onToggleMobileCenter: () => void }) {
  return (
    <div className="absolute top-0 right-0 h-10 flex items-center gap-4 px-4 bg-[#1a1a1a]/80 backdrop-blur-md text-white/70 z-50">
      <button onClick={onOpenAbout} className="hover:text-white"><Wifi size={16} /></button>
      <button onClick={onOpenAbout} className="hover:text-white"><Bluetooth size={16} /></button>
      <button onClick={onToggleMobileCenter} className="flex items-center gap-1 hover:text-white"><Battery size={16} /> 92%</button>
      <button className="hover:text-white"><Bell size={16} /></button>
      <button onClick={onOpenNews} className="hover:text-white"><Newspaper size={16} /></button>
      <button onClick={onOpenAbout} className="hover:text-white"><Info size={16} /></button>
    </div>
  );
}
