
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, AlertTriangle } from 'lucide-react';

export default function BrowserApp({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 5 second loading
    const loaderTimer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(loaderTimer);
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-white text-black">
      <div className="h-10 bg-gray-100 flex items-center justify-between px-2 border-b">
        <div className="flex gap-2">
            <button onClick={onClose} className="hover:bg-gray-300 p-1 rounded"><X size={16}/></button>
            <button className="hover:bg-gray-300 p-1 rounded"><RefreshCw size={16}/></button>
        </div>
        <div className="bg-white border rounded px-4 py-1 text-sm text-gray-500 w-80 text-center">www.google.com</div>
        <div></div>
      </div>
      
      <div className="flex-1 w-full relative">
        <AnimatePresence>
            {loading && (
            <motion.div 
                className="absolute inset-0 bg-gray-900 z-10 flex flex-col items-center justify-center text-white"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <h2 className="text-2xl font-bold mb-4">İnternet'e Hoş Geldiniz</h2>
                <p className="text-gray-400 mb-8">İnternet servisleri yükleniyor...</p>
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
            )}
        </AnimatePresence>

        <iframe src="https://www.google.com" className="w-full h-full border-none" title="Browser" />
      </div>
    </div>
  );
}
