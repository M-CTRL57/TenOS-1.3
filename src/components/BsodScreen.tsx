import { useEffect, useState } from 'react';
import { Coffee } from 'lucide-react';

export default function BsodScreen({ onRecover }: { onRecover: () => void }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20);
      });
    }, 800);

    const timer = setTimeout(() => {
      onRecover();
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onRecover]);

  return (
    <div className="w-full h-full bg-[#0078d7] text-white p-24 font-sans flex flex-col justify-center gap-6 text-center items-center">
      <Coffee size={120} className="mb-8" />
      <h1 className="text-6xl font-light mb-6">Mola verdim, git bir çay iç.</h1>
      <h2 className="text-3xl max-w-3xl leading-relaxed mb-4">
        Ben de ne yaptığımı bilmiyorum ama galiba bozuldu. Çok yoruldum.
      </h2>
      <p className="text-xl mb-4">Sistem biraz dinleniyor...</p>
      <div className="mt-8 text-lg text-white/80">
        <p>Dinlenme seviyesi: %{Math.min(percent, 100)}</p>
      </div>
    </div>
  );
}
