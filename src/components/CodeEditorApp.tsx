import { useState } from 'react';
import { FileCode, File, Folder, Play, Save, Settings, ChevronDown, ChevronRight } from 'lucide-react';

const mockFiles = [
  { name: 'index.ts', content: 'console.log("Hello, TenOS!");\n\n// TenOS API Integration\nTenOS.window.create({\n  title: "My App",\n  width: 400,\n  height: 300\n});' },
  { name: 'styles.css', content: 'body {\n  background-color: #111;\n  color: #eee;\n  font-family: monospace;\n}' },
  { name: 'config.json', content: '{\n  "name": "TenOS App",\n  "version": "1.0.0",\n  "api": "v1"\n}' }
];

export default function CodeEditorApp() {
  const [activeFile, setActiveFile] = useState(0);
  const [fileContents, setFileContents] = useState(mockFiles.map(f => f.content));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContents = [...fileContents];
    newContents[activeFile] = e.target.value;
    setFileContents(newContents);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-[#cccccc] font-sans">
      {/* Top Menu Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#323233] text-xs">
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-white">File</span>
          <span className="cursor-pointer hover:text-white">Edit</span>
          <span className="cursor-pointer hover:text-white">Selection</span>
          <span className="cursor-pointer hover:text-white">View</span>
          <span className="cursor-pointer hover:text-white">Go</span>
          <span className="cursor-pointer hover:text-white">Run</span>
          <span className="cursor-pointer hover:text-white">Terminal</span>
          <span className="cursor-pointer hover:text-white">Help</span>
        </div>
        <div className="flex gap-3 text-gray-400">
          <Play size={14} className="cursor-pointer hover:text-[#89d185]" />
          <Settings size={14} className="cursor-pointer hover:text-white" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-4 gap-6 border-r border-[#252526]">
          <FileCode size={24} className="text-white cursor-pointer" />
          <div className="w-full flex justify-center">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 cursor-pointer hover:text-white"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <div className="w-full flex justify-center">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 cursor-pointer hover:text-white"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-60 bg-[#252526] flex flex-col border-r border-[#1e1e1e]">
            <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 flex justify-between items-center">
              Explorer
              <span className="text-gray-500 hover:text-white cursor-pointer">...</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="px-2 py-1 flex items-center gap-1 text-sm font-bold text-gray-300 cursor-pointer hover:bg-[#2a2d2e]">
                <ChevronDown size={16} />
                TENOS-APP
              </div>
              <div className="flex flex-col">
                {mockFiles.map((file, idx) => (
                  <div 
                    key={file.name} 
                    onClick={() => setActiveFile(idx)}
                    className={`px-6 py-1 flex items-center gap-2 text-sm cursor-pointer ${activeFile === idx ? 'bg-[#37373d] text-white' : 'text-gray-400 hover:bg-[#2a2d2e] hover:text-gray-300'}`}
                  >
                    <File size={14} className={file.name.endsWith('.ts') ? 'text-[#519aba]' : file.name.endsWith('.css') ? 'text-[#519aba]' : 'text-[#cbcb41]'} />
                    {file.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
          {/* Tabs */}
          <div className="flex bg-[#2d2d2d] overflow-x-auto no-scrollbar">
            {mockFiles.map((file, idx) => (
              <div 
                key={file.name}
                onClick={() => setActiveFile(idx)}
                className={`px-4 py-2 text-sm flex items-center gap-2 cursor-pointer border-t-2 ${activeFile === idx ? 'bg-[#1e1e1e] border-[#007acc] text-white' : 'bg-[#2d2d2d] border-transparent text-gray-500 hover:bg-[#2b2b2b]'}`}
              >
                <File size={14} className={file.name.endsWith('.ts') ? 'text-[#519aba]' : file.name.endsWith('.css') ? 'text-[#519aba]' : 'text-[#cbcb41]'} />
                {file.name}
                {activeFile === idx && <span className="ml-2 hover:bg-[#444] rounded-sm p-0.5"><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>}
              </div>
            ))}
          </div>

          {/* Breadcrumbs */}
          <div className="px-4 py-1 flex items-center gap-1 text-[13px] text-gray-400 border-b border-[#2d2d2d]">
            <span>TENOS-APP</span>
            <ChevronRight size={14} />
            <span>{mockFiles[activeFile].name}</span>
          </div>

          {/* Text Area */}
          <div className="flex-1 relative">
            {/* Line Numbers */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#1e1e1e] border-r border-[#333] flex flex-col text-right pr-2 py-4 text-gray-600 font-mono text-sm leading-6 select-none pointer-events-none">
              {fileContents[activeFile].split('\n').map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            
            <textarea
              spellCheck={false}
              value={fileContents[activeFile]}
              onChange={handleContentChange}
              className="w-full h-full bg-transparent text-[#d4d4d4] font-mono text-sm p-4 pl-16 resize-none outline-none leading-6 whitespace-pre"
              style={{ tabSize: 2 }}
            />
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded-sm"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg> main</div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded-sm"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> 0 Yay! 0</div>
        </div>
        <div className="flex items-center gap-4">
          <span className="cursor-pointer hover:bg-white/20 px-1 rounded-sm">Ln {fileContents[activeFile].split('\n').length}, Col {fileContents[activeFile].length > 0 ? fileContents[activeFile].split('\n').pop()?.length || 1 : 1}</span>
          <span className="cursor-pointer hover:bg-white/20 px-1 rounded-sm">UTF-8</span>
          <span className="cursor-pointer hover:bg-white/20 px-1 rounded-sm">TypeScript React</span>
          <span className="cursor-pointer hover:bg-white/20 px-1 rounded-sm">TenOS Copilot</span>
        </div>
      </div>
    </div>
  );
}
