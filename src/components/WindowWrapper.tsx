import { X, Minus, Square } from 'lucide-react';
import { motion, useDragControls } from 'motion/react';
import { ReactNode, useEffect } from 'react';

export default function WindowWrapper({ 
  title, 
  children, 
  onClose, 
  onMinimize, 
  onMaximize,
  isMaximized,
  themeColor = 'black',
  isActive = false,
  onFocus
}: { 
  title: string; 
  children: ReactNode; 
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  themeColor?: 'red' | 'orange' | 'black' | 'white';
  isActive?: boolean;
  onFocus?: () => void;
}) {
  const dragControls = useDragControls();

  useEffect(() => {
    onFocus?.();
  }, []);

  let headerColor = 'bg-[#252525]';
  let borderColor = 'border-white/10';
  
  if (themeColor === 'red') { headerColor = 'bg-red-900'; borderColor = 'border-red-500/50'; }
  else if (themeColor === 'orange') { headerColor = 'bg-orange-600'; borderColor = 'border-orange-500/50'; }
  else if (themeColor === 'white') { headerColor = 'bg-gray-200'; borderColor = 'border-white/30'; }

  return (
    <motion.div 
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onPointerDown={onFocus}
      className={`absolute ${isMaximized ? 'inset-0 rounded-none' : 'top-10 left-10 w-[700px] h-[500px] rounded-[32px]'} 
      bg-black/20 backdrop-blur-3xl saturate-150
      shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.5),0_15px_40px_rgba(0,0,0,0.4)]
      border border-white/20
      flex flex-col overflow-hidden ${
        isActive ? 'z-30 ring-1 ring-white/30' : 'z-20'
      }`}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div 
        className={`h-12 bg-white/5 border-b border-white/10 flex items-center justify-between px-5 cursor-grab`}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <span className="text-sm font-semibold tracking-wide text-white drop-shadow-md">{title}</span>
        <div className="flex items-center gap-3 text-white">
          <button onClick={onMinimize} className="hover:bg-white/20 hover:scale-110 active:scale-95 transition-all p-1.5 rounded-full"><Minus size={16} /></button>
          <button onClick={onMaximize} className="hover:bg-white/20 hover:scale-110 active:scale-95 transition-all p-1.5 rounded-full"><Square size={14} /></button>
          <button onClick={onClose} className="hover:bg-red-500/80 hover:scale-110 active:scale-95 transition-all p-1.5 rounded-full"><X size={16} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-black/40 backdrop-blur-md cursor-default p-4 relative">
        <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] pointer-events-none z-50 rounded-b-[32px]"></div>
        {children}
      </div>
    </motion.div>
  );
}
