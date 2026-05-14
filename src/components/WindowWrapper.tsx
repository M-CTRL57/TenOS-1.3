import { X, Minus, Square } from 'lucide-react';
import { motion, useDragControls } from 'motion/react';
import { ReactNode } from 'react';

export default function WindowWrapper({ 
  title, 
  children, 
  onClose, 
  onMinimize, 
  onMaximize,
  isMaximized,
  themeColor = 'black'
}: { 
  title: string; 
  children: ReactNode; 
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  themeColor?: 'red' | 'orange' | 'black' | 'white';
}) {
  const dragControls = useDragControls();

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
      className={`absolute ${isMaximized ? 'inset-0' : 'top-10 left-10 w-[600px] h-[400px]'} bg-[#1a1a1a] border ${borderColor} rounded-lg shadow-2xl flex flex-col overflow-hidden`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div 
        className={`h-8 ${headerColor} flex items-center justify-between px-3 cursor-grab`}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <span className={`text-xs font-medium ${themeColor === 'white' ? 'text-black' : 'text-gray-300'}`}>{title}</span>
        <div className={`flex items-center gap-2 ${themeColor === 'white' ? 'text-black' : 'text-white'}`}>
          <button onClick={onMinimize} className="hover:bg-black/10 p-1 rounded"><Minus size={14} /></button>
          <button onClick={onMaximize} className="hover:bg-black/10 p-1 rounded"><Square size={14} /></button>
          <button onClick={onClose} className="hover:bg-red-500 p-1 rounded"><X size={14} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 cursor-default">
        {children}
      </div>
    </motion.div>
  );
}
