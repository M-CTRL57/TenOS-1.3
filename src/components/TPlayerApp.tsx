import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, FolderOpen, Film, Music } from 'lucide-react';

export default function TPlayerApp() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* Menu Bar */}
      <div className="flex items-center gap-4 p-2 bg-[#1a1a1a] border-b border-[#333] text-sm">
        <div className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors">
          <FolderOpen size={16} /> Aç
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-purple-400 transition-colors">
          <Film size={16} /> Video
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-purple-400 transition-colors">
          <Music size={16} /> Ses
        </div>
        <div className="ml-auto text-xs text-gray-500 px-2 py-0.5 rounded bg-white/5">Tplayer¿ Evrensel Kod Çözücü Aktif</div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 bg-black relative flex items-center justify-center">
        {isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/10 to-purple-900/10">
            <div className="w-48 h-48 border-4 border-purple-500/20 rounded-full flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite]">
               <Film size={48} className="text-purple-500/50" />
            </div>
          </div>
        ) : (
          <div className="text-gray-500 flex flex-col items-center gap-4 transition-all">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <Film size={64} className="text-gray-600 mb-4 mx-auto" />
              <p className="text-center font-medium">Medya dosyası sürükleyin veya açın</p>
              <p className="text-center text-xs text-gray-600 mt-2">MP4, MKV, AVI, FLV, MP3, WAV ve 100+ format desteklenir.</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-[#1a1a1a] p-4 flex flex-col gap-3 border-t border-[#333]">
        {/* Progress Bar */}
        <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
          <span>{isPlaying ? "01:23" : "00:00"}</span>
          <div className="flex-1 h-1.5 bg-[#333] rounded-full overflow-hidden cursor-pointer group">
            <div className={`h-full bg-purple-500 transition-all ${isPlaying ? 'w-[30%]' : 'w-0'}`}></div>
          </div>
          <span>{isPlaying ? "04:56" : "00:00"}</span>
        </div>

        {/* Playback Controls */}
        <div className="flex justify-between items-center mt-1">
          <div className="flex gap-6 items-center">
            <SkipBack size={20} className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors" />
            <div 
              onClick={() => setIsPlaying(!isPlaying)} 
              className="cursor-pointer bg-purple-600 hover:bg-purple-500 text-white rounded-full p-2 transition-all"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </div>
            <SkipForward size={20} className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors" />
          </div>

          <div className="flex gap-4 items-center">
            <Volume2 size={20} className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors" />
            <div className="w-24 h-1.5 bg-[#333] rounded-full cursor-pointer overflow-hidden">
               <div className="h-full bg-purple-500 w-[70%]"></div>
            </div>
            <Maximize size={18} className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
