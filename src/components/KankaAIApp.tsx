import { useState, useEffect, useRef } from 'react';
import { Send, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const templates: Record<string, string> = {
  "merhaba": "Merhaba kanka, sistem yağ gibi akıyor! Bugün ne yapıyoruz?",
  "saat kaç": "Saat tam {time}. Çok geç oldu kanka, yat artık!",
  "kasada durum ne": "Alüminyum kasa buz gibi, Twcbit TX1 Jel %2 yükte çalışıyor. Her şey kontrol altında!",
  "nasılsın": "Fişek gibiyim kanka, sen nasılsın?",
  "ne yapıyorsun": "Arka planda senin için sistem kaynaklarını optimize ediyorum, bir yandan da sohbet ediyoruz.",
  "kimsin": "Ben Kanka AI. Tamamen yerel çalışan, APIsiz, çevrimdışı asistanın.",
};

const defaultResponse = "Bunu tam anlayamadım kanka. Başka bir şey sorsana? Mesela 'kasada durum ne' veya 'saat kaç' diyebilirsin.";

export default function KankaAIApp() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Selam kanka! Tamamen yerel olarak çalışıyorum. İnternet olmasa da buradayım. Bana bir şeyler sor!' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');

    // Simulate thinking delay
    setTimeout(() => {
      const lowerInput = userMessage.toLowerCase().replace(/[.,!?]/g, '');
      let response = defaultResponse;

      for (const [key, value] of Object.entries(templates)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      if (response.includes('{time}')) {
        const now = new Date();
        response = response.replace('{time}', now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white font-sans">
      <div className="flex items-center gap-3 p-4 bg-slate-800 border-b border-slate-700 shadow-md z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <Bot size={24} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-lg leading-tight">Kanka AI</h2>
          <p className="text-xs text-slate-400">Çevrimdışı • Yerel Asistan</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-700 text-slate-100 rounded-bl-none shadow-md'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-800 border-t border-slate-700">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Bir şeyler yaz kanka..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl transition-colors flex items-center justify-center w-12"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
