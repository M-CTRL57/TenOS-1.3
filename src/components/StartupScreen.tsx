import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';

export default function StartupScreen({ onComplete }: { onComplete: () => void }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [stars, setStars] = useState<{ id: number; left: number; top: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#020205] text-[#e0e0e0] relative overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Orbiting Rocket around Planet */}
      <div className="relative z-10 w-48 h-48 mb-6 flex items-center justify-center">
        {/* Planet */}
        <motion.div 
          className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-800 shadow-[0_0_50px_rgba(59,130,246,0.4)] overflow-hidden relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {/* Craters/details */}
          <div className="absolute w-5 h-5 rounded-full bg-black/20 top-4 left-6" />
          <div className="absolute w-8 h-8 rounded-full bg-black/20 bottom-4 right-2" />
          <div className="absolute w-4 h-4 rounded-full bg-black/20 top-12 right-6" />
          <div className="absolute w-3 h-3 rounded-full bg-black/20 bottom-10 left-4" />
        </motion.div>

        {/* Orbiting Rocket */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <motion.div 
            className="absolute top-0 left-1/2 -ml-3 -mt-3 text-white drop-shadow-md z-20"
            animate={{ rotate: 45 }}
          >
            <Rocket size={24} fill="currentColor" className="text-gray-200" />
            <motion.div 
              className="absolute -bottom-3 -left-3 w-4 h-4 bg-orange-500 rounded-full blur-[8px]"
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-5xl font-black tracking-widest mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-lg">
          TEN
        </div>
        <div className="text-sm text-blue-200/60 mb-8 tracking-widest uppercase">
          Uzay Boşluğunda Yükleniyor...
        </div>
        
        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mb-8 shadow-[0_0_15px_rgba(255,255,255,0.05)] relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
          />
        </div>

        <button onClick={onComplete} className="text-xs text-white/30 hover:text-white transition-colors uppercase tracking-widest hover:bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm border border-transparent hover:border-white/20">
          Işınlan (Atla)
        </button>
      </div>
    </div>
  );
}
