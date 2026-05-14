import { useState, useEffect } from 'react';
import { Gauge } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ResourceMonitorApp() {
  const [data, setData] = useState<{ time: string; cpu: number; ram: number; gpu: number }[]>([]);
  const [currentCpu, setCurrentCpu] = useState(0);
  const [currentRam, setCurrentRam] = useState(0);
  const [currentGpu, setCurrentGpu] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      
      const newCpu = Math.floor(Math.random() * 40) + 10;
      const newRam = Math.floor(Math.random() * 10) + 8; // out of 24
      const newGpu = Math.floor(Math.random() * 30) + 5;

      setCurrentCpu(newCpu);
      setCurrentRam(newRam);
      setCurrentGpu(newGpu);

      setData(prev => {
        const newData = [...prev, { time: timeStr, cpu: newCpu, ram: newRam, gpu: newGpu }];
        if (newData.length > 20) newData.shift();
        return newData;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#111111] text-[#e0e0e0] font-sans">
      <div className="flex items-center gap-3 p-6 border-b border-white/5">
        <Gauge size={28} className="text-blue-500" />
        <div>
          <h2 className="text-xl font-semibold text-white">Kaynak İzleyicisi</h2>
          <p className="text-xs text-white/50">Sistem performans ve kullanım durumu</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* CPU Section */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">İşlemci (CPU)</h3>
              <p className="text-sm text-gray-400">Intel Core i5</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-mono text-blue-400">{currentCpu}%</span>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Kullanım</p>
            </div>
          </div>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 100]} hide />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '4px' }} />
                <Area type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RAM Section */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">Bellek (RAM)</h3>
              <p className="text-sm text-gray-400">24 GB DDR5</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-mono text-purple-400">{currentRam} GB</span>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Kullanılan</p>
            </div>
          </div>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 24]} hide />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '4px' }} />
                <Area type="monotone" dataKey="ram" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorRam)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GPU Section */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">Grafik Kartı (GPU)</h3>
              <p className="text-sm text-gray-400">NVIDIA RTX 5090</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-mono text-emerald-400">{currentGpu}%</span>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Kullanım</p>
            </div>
          </div>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 100]} hide />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '4px' }} />
                <Area type="monotone" dataKey="gpu" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorGpu)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
