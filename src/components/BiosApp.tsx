
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function BiosApp({ onReboot, onClose }: { onReboot: () => void, onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [pixelText, setPixelText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setPixelText("TEN BIOS Welcome v1.0");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-blue-900 flex items-center justify-center text-white font-mono text-2xl">
        BIOS açılıyor...
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono p-10 flex flex-col gap-6">
      <h1 className="text-3xl border-b border-green-800 pb-2 mb-4">{pixelText}</h1>
      
      <div className="space-y-4">
        {[
          { label: "Hızlı Başlat" },
          { label: "Ayarları Değiştir" },
          { label: "Başka İşletim Sistemine Geç" },
          { label: "İşletim Sistemini Sıfırla", action: onReboot },
          { label: "Ayarları Eski Haline Getirme" },
          { label: "Gelişmiş Seçenekler", action: () => alert("Çok yakında") }
        ].map((item, i) => (
          <button 
            key={i} 
            onClick={item.action} 
            className="block text-left text-lg hover:bg-green-900 px-4 py-2 w-full"
          >
            {`> ${item.label}`}
          </button>
        ))}
      </div>
      
      <button onClick={onClose} className="mt-auto text-red-500">Çıkış</button>
    </div>
  );
}
