import { Camera, Video, AlertCircle, Monitor, StopCircle, Download } from 'lucide-react';
import { useState, useRef } from 'react';

export default function CameraApp() {
  const [mode, setMode] = useState<'photo' | 'video' | 'screen'>('video');
  const [videoQuality, setVideoQuality] = useState('4K 30 FPS');
  const [isRecordingScreen, setIsRecordingScreen] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScreenRecording = async () => {
    try {
      setRecordedBlobUrl(null);
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedBlobUrl(url);
        
        // Cleanup stream
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        setIsRecordingScreen(false);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecordingScreen(true);
      
      // Handle when user stops sharing via browser UI
      stream.getVideoTracks()[0].onended = () => {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      };

    } catch (err) {
      console.error("Error accessing display media: ", err);
    }
  };

  const stopScreenRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-white items-center justify-center relative overflow-hidden">
       
       {mode === 'screen' ? (
         <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#111]">
            {isRecordingScreen ? (
               <video ref={videoRef} autoPlay muted className="w-full h-full object-contain opacity-50" />
            ) : recordedBlobUrl ? (
               <video src={recordedBlobUrl} controls className="w-full h-full object-contain" />
            ) : (
               <div className="flex flex-col items-center opacity-50 text-center">
                  <Monitor size={64} className="mb-4" />
                  <p>Ekran kaydına başlamak için butona basın.</p>
               </div>
            )}
         </div>
       ) : (
         <div className="flex flex-col items-center justify-center p-8 text-center text-red-500 z-10 bg-black/50 p-4 rounded-xl backdrop-blur-sm">
             <AlertCircle size={48} className="mb-4 mx-auto" />
             <p className="text-xl">Kamera bulunamadı lütfen kameranızı kontrol edin</p>
         </div>
       )}

       {/* Camera UI overlay */}
       <div className="absolute top-4 left-4 right-4 flex justify-center gap-4 items-center text-white/50 z-20">
          <button onClick={() => setMode('photo')} className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${mode === 'photo' ? 'bg-white/20 text-white' : 'hover:bg-white/10'}`}>
            <Camera size={16} /> Fotoğraf
          </button>
          <button onClick={() => setMode('video')} className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${mode === 'video' ? 'bg-white/20 text-white' : 'hover:bg-white/10'}`}>
            <Video size={16} /> Video
          </button>
          <button onClick={() => setMode('screen')} className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${mode === 'screen' ? 'bg-white/20 text-white' : 'hover:bg-white/10'}`}>
            <Monitor size={16} /> Ekran Kaydı
          </button>
       </div>

       {mode === 'video' && (
           <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-2 w-max z-20 overflow-x-auto max-w-full px-4">
               {['4K 30 FPS', '8K', '16K 80 Milyon FPS'].map(q => (
                   <button key={q} onClick={() => setVideoQuality(q)} className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all whitespace-nowrap ${videoQuality === q ? 'bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 'bg-white/20 hover:bg-white/30 text-white'}`}>
                       {q}
                   </button>
               ))}
           </div>
       )}

       <div className="absolute bottom-8 flex justify-center w-full z-20 gap-4">
            {mode === 'screen' ? (
               isRecordingScreen ? (
                 <button onClick={stopScreenRecording} className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 bg-white/20">
                     <StopCircle size={32} className="text-red-500" />
                 </button>
               ) : (
                 <>
                   <button onClick={startScreenRecording} className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
                       <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white">
                         <Monitor size={24} />
                       </div>
                   </button>
                   {recordedBlobUrl && (
                     <a href={recordedBlobUrl} download="ekran-kaydi.webm" className="w-12 h-12 absolute right-8 bottom-4 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors">
                       <Download size={20} />
                     </a>
                   )}
                 </>
               )
            ) : (
               <button className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95`}>
                   <div className={`w-16 h-16 rounded-full ${mode === 'video' ? 'bg-red-500' : 'bg-white'}`}></div>
               </button>
            )}
       </div>
    </div>
  )
}
