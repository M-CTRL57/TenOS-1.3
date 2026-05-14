import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';

export default function LockScreen({ wallpaper, onUnlock }: { wallpaper?: string, onUnlock: () => void }) {
  const [time, setTime] = useState(new Date());
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(onUnlock, 500); // the animation takes 0.5s
  };

  return (
    <AnimatePresence>
      {!isUnlocking && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 z-[100] flex flex-col justify-end p-12 cursor-pointer bg-cover bg-center select-none"
          style={{ backgroundImage: wallpaper ? `url(${wallpaper})` : 'none', backgroundColor: '#050505' }}
          onClick={handleUnlock}
        >
          {/* Overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-start gap-2">
            <h1 className="text-8xl font-light text-white tracking-widest drop-shadow-xl">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </h1>
            <h2 className="text-3xl text-white/90 font-light drop-shadow-lg">
              {time.toLocaleDateString('tr-TR', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
