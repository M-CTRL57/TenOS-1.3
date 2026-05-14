import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Edit2, Eye, Save } from 'lucide-react';

export default function MarkdownNotesApp() {
  const [content, setContent] = useState('# Yeni Not\n\nBu bir *markdown* destekli not defteridir.\n\n```ts\nconsole.log("TenOS");\n```');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('preview');

  return (
    <div className="flex flex-col h-full bg-white text-black font-sans">
      <div className="flex items-center justify-between p-2 bg-gray-100 border-b border-gray-300">
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('edit')}
            className={`px-3 py-1 flex items-center gap-1 rounded text-sm ${viewMode === 'edit' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
          >
            <Edit2 size={14} /> Düzenle
          </button>
          <button 
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1 flex items-center gap-1 rounded text-sm ${viewMode === 'preview' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
          >
            <Eye size={14} /> Önizleme
          </button>
        </div>
        <button className="px-3 py-1 flex items-center gap-1 rounded text-sm hover:bg-gray-200 text-gray-700">
          <Save size={14} /> Kaydet
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === 'edit' ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full resize-none outline-none font-mono text-sm leading-relaxed"
            placeholder="Markdown yazın..."
          />
        ) : (
          <div className="markdown-body">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-3" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-gray-800 leading-relaxed" {...props} />,
                code: ({node, className, children, ...props}) => {
                  const match = /language-(\w+)/.exec(className || '')
                  return (
                    <code className="bg-gray-100 p-1 rounded font-mono text-sm text-red-600 px-1.5" {...props}>
                      {children}
                    </code>
                  )
                },
                pre: ({node, ...props}) => <pre className="bg-gray-800 text-white p-4 rounded mb-4 overflow-x-auto" {...props} />
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
