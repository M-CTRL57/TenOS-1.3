import { Image as ImageIcon, Play } from 'lucide-react';

export default function GalleryApp() {
    return (
        <div className="p-8 h-full bg-[#111] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <ImageIcon size={28} className="text-blue-400" />
                Galeri
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => {
                   const isVideo = i % 4 === 0;
                   return (
                   <div key={i} className="aspect-square bg-white/5 rounded-lg overflow-hidden relative group cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                       <img src={`https://picsum.photos/300?random=${i + 20}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                       {isVideo && (
                           <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                               <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300">
                                   <Play fill="white" className="text-white w-6 h-6 ml-1" />
                               </div>
                           </div>
                       )}
                   </div>
               )})}
            </div>
        </div>
    )
}
