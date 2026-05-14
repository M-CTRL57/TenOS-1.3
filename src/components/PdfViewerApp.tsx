import { useState } from 'react';
import { FileText, Edit3, MessageSquare, Download } from 'lucide-react';

export default function PdfViewerApp() {
  const [annotations, setAnnotations] = useState<{id: number, text: string, x: number, y: number}[]>([]);
  const [signatures, setSignatures] = useState<{id: number, x: number, y: number}[]>([]);
  const [mode, setMode] = useState<'view' | 'sign' | 'note'>('view');

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode === 'view') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mode === 'sign') {
      setSignatures([...signatures, { id: Date.now(), x, y }]);
      setMode('view');
    } else if (mode === 'note') {
      const text = window.prompt('Notunuzu girin:');
      if (text) {
        setAnnotations([...annotations, { id: Date.now(), text, x, y }]);
      }
      setMode('view');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-200 font-sans text-black">
      <div className="flex items-center justify-between p-2 bg-gray-800 text-white border-b border-gray-700">
        <div className="flex items-center gap-2">
          <FileText size={18} />
          <span>belge_taslak_v1.pdf</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setMode('sign')}
            className={`px-3 py-1 flex items-center gap-1 rounded text-sm transition-colors ${mode === 'sign' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          >
            <Edit3 size={14} /> İmzala
          </button>
          <button 
            onClick={() => setMode('note')}
            className={`px-3 py-1 flex items-center gap-1 rounded text-sm transition-colors ${mode === 'note' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          >
            <MessageSquare size={14} /> Not Ekle
          </button>
          <button className="px-3 py-1 flex items-center gap-1 rounded text-sm hover:bg-gray-700">
            <Download size={14} /> İndir
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center custom-scrollbar">
        <div 
          onClick={handleClick}
          className={`relative bg-white w-full max-w-[600px] min-h-[800px] shadow-lg ${mode !== 'view' ? 'cursor-crosshair' : 'cursor-default'}`}
        >
          {/* Fake PDF Content */}
          <div className="p-8 md:p-12 space-y-6 text-gray-800 pointer-events-none select-none">
            <h1 className="text-2xl font-bold border-b pb-4">GİZLİLİK SÖZLEŞMESİ</h1>
            <p className="leading-relaxed text-sm text-justify">
              İşbu sözleşme, taraflar arasında paylaşılan ticari sırların ve gizli bilgilerin korunmasını amaçlamaktadır. 
              Taraflar, birbirleri hakkında edindikleri her türlü bilgiyi kesin bir gizlilik içinde tutmayı kabul ve taahhüt ederler.
            </p>
            <p className="leading-relaxed text-sm text-justify pt-4">
              Aksi takdirde, ihlal eden taraf tüm hukuki ve cezai sorumluluğu üstlenecektir.
            </p>
            <div className="mt-24 flex justify-between">
              <div>
                <p className="font-bold">Taraf A</p>
                <div className="w-32 h-12 border-b-2 border-gray-400 mt-4"></div>
              </div>
              <div>
                <p className="font-bold">Taraf B</p>
                <div className="w-32 h-12 border-b-2 border-gray-400 mt-4"></div>
              </div>
            </div>
          </div>

          {/* Annotations */}
          {annotations.map(ann => (
            <div 
              key={ann.id} 
              style={{ left: ann.x, top: ann.y }}
              className="absolute bg-yellow-200/90 border border-yellow-400 p-2 text-xs shadow-md max-w-[200px] -translate-x-1/2 -translate-y-1/2"
            >
              {ann.text}
            </div>
          ))}

          {/* Signatures */}
          {signatures.map(sig => (
            <div 
              key={sig.id} 
              className="absolute text-blue-800 italic text-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80"
              style={{ fontFamily: "'Brush Script MT', cursive", transform: `translate(-50%, -50%) rotate(-5deg)`, left: sig.x, top: sig.y }}
            >
              İmza
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
