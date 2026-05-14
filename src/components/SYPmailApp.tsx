import { useState, useEffect } from 'react';
import { Mail, Send, Inbox, Archive, Trash2, Edit3, X, Paperclip, ArrowLeft, Reply } from 'lucide-react';

export default function SYPmailApp() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'drafts'>('inbox');
  const [isComposing, setIsComposing] = useState(false);
  const [activeEmail, setActiveEmail] = useState<any>(null);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [emails, setEmails] = useState([
    { id: 4, tab: 'inbox', sender: 'hintballowski', subject: 'gizli mesaj 3', body: 'Hey ben hintballowski senin uygulamaların gücü şu anlık bana yetmedi Gugu Gaga ile beraber seni yok edeceğiz şimdi Hazırlan ve Hüsnü hackerını sakın açmaya çalışma teknoloji gündemindeki Yazılarını gördüm ve senin Çöp bu çöp işletim sistemini yok edeceğim', preview: 'Hey ben hintballowski senin uygulamaların gücü...', date: 'Şimdi', read: false },
    { id: 1, tab: 'inbox', sender: 'Sistem Yöneticisi', subject: 'Hoş Geldiniz', body: 'TEN OS sisteminize başarıyla giriş yaptınız. Yeni arayüzü keşfedin.', preview: 'TEN OS sisteminize başarıyla giriş yaptınız...', date: '10:42', read: false },
    { id: 2, tab: 'inbox', sender: 'Prens.Njierya@spam.com', subject: 'Acil Miras Transferi', body: 'Lütfen bana acilen 10.000$ gönderin, size milyar dolarlık mirasımı devredeceğim.', preview: 'Lütfen bana acilen 10.000$ gönderin...', date: 'Dün', read: true },
    { id: 3, tab: 'inbox', sender: 'Mert Özcan', subject: 'Proje Hakkında', body: 'Merhaba, işletim sistemi gayet iyi ilerliyor. Yeni özellikleri test edelim.', preview: 'Merhaba, işletim sistemi gayet iyi ilerliyor.', date: 'Pzt', read: true }
  ]);

  useEffect(() => {
    const handleHack = () => {
      setEmails(prev => [
        {
          id: Date.now(),
          tab: 'inbox',
          sender: 'hintballowski',
          subject: 'son mesaj',
          body: 'beni yok ettin ama geri döneceğim Korkma Hahaha\n\nHayır backroomsa düştüm',
          preview: 'beni yok ettin ama geri döneceğim Korkma Hahaha...',
          date: 'Şimdi',
          read: false
        },
        ...prev
      ]);

      // Fire 2nd email after 4 seconds
      setTimeout(() => {
        setEmails(prev => [
          {
            id: Date.now() + 1,
            tab: 'inbox',
            sender: 'hintballowski',
            subject: 'YAKINDA GÖRÜŞECEĞİZ...',
            body: 'sana karşılık olarak ha geri dönersin o penguenli var ya Yok ederim\n\n![Backrooms](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/The_Backrooms_model.jpg/640px-The_Backrooms_model.jpg)',
            preview: 'sana karşılık olarak ha geri dönersin o penguenli...',
            date: 'Şimdi',
            read: false,
            isMarkdown: true
          },
          ...prev
        ]);
        alert("Yeni bir GİZLİ MESAJ aldınız!");
      }, 4000);
    };

    window.addEventListener('START_HACK_HINTBALLOWSKI', handleHack);
    return () => window.removeEventListener('START_HACK_HINTBALLOWSKI', handleHack);
  }, []);

  const handleSend = () => {
    if (!to || !subject) return;
    setIsComposing(false);
    
    // add to sent
    setEmails(prev => [
      { id: Date.now(), tab: 'sent', sender: 'Ben', subject: subject, body: body, preview: body.substring(0, 50) + '...', date: 'Şimdi', read: true, to: to },
      ...prev
    ]);

    setTo('');
    setSubject('');
    setBody('');
    alert('E-posta başarıyla gönderildi!');
  };

  const handleReplyHintballowski = () => {
    setEmails(prev => [
      { 
        id: Date.now(), 
        tab: 'sent', 
        sender: 'Ben', 
        to: 'hintballowski',
        subject: 'Re: gizli mesaj 3', 
        body: 'Hayır kardeşim sen bu işletim sistemine hata verirsen pofuduk Kerem Rex Ömer fil hepini hepimiz Sana bir saldırırız var ya seni Star Wars evvelinden düşürürüz seni bacroomasa atarız', 
        preview: 'Hayır kardeşim sen bu işletim sistemine hata verirsen...', 
        date: 'Şimdi', 
        read: true 
      },
      ...prev
    ]);
    setActiveEmail(null);
    setActiveTab('sent');
    alert('Mesaj hintballowski\'ye başarıyla gönderildi!');
  };

  const openEmail = (email: any) => {
    // mark as read
    setEmails(prev => prev.map(e => e.id === email.id ? { ...e, read: true } : e));
    setActiveEmail({ ...email, read: true });
  };

  const currentList = emails.filter(e => e.tab === activeTab);

  return (
    <div className="flex h-full bg-[#111] text-white font-sans overflow-hidden relative">
      {/* Sidebar */}
      <div className="w-56 bg-[#0a0a0a] border-r border-white/10 flex flex-col z-10">
        <div className="p-4 flex items-center gap-2 border-b border-white/10">
          <Mail className="text-blue-400" />
          <span className="font-semibold text-lg">SYPmail</span>
        </div>
        
        <div className="p-4">
          <button 
            onClick={() => setIsComposing(true)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded flex items-center justify-center gap-2 transition-colors"
          >
            <Edit3 size={16} /> Yeni E-posta
          </button>
        </div>

        <div className="flex-1 overflow-y-auto w-full">
          <button onClick={() => { setActiveTab('inbox'); setActiveEmail(null); }} className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${activeTab === 'inbox' ? 'bg-white/10 border-l-2 border-blue-500' : 'border-l-2 border-transparent'}`}>
            <Inbox size={18} className={activeTab === 'inbox' ? 'text-blue-400' : 'text-gray-400'} /> 
            <span>Gelen Kutusu</span>
            {emails.filter(e => e.tab === 'inbox' && !e.read).length > 0 && (
               <span className="ml-auto bg-blue-600 px-2 py-0.5 rounded-full text-xs">{emails.filter(e => e.tab === 'inbox' && !e.read).length}</span>
            )}
          </button>
          <button onClick={() => { setActiveTab('sent'); setActiveEmail(null); }} className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${activeTab === 'sent' ? 'bg-white/10 border-l-2 border-green-500' : 'border-l-2 border-transparent'}`}>
            <Send size={18} className={activeTab === 'sent' ? 'text-green-400' : 'text-gray-400'} /> 
            <span>Gönderilmiş</span>
          </button>
          <button onClick={() => { setActiveTab('drafts'); setActiveEmail(null); }} className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${activeTab === 'drafts' ? 'bg-white/10 border-l-2 border-yellow-500' : 'border-l-2 border-transparent'}`}>
            <Archive size={18} className={activeTab === 'drafts' ? 'text-yellow-400' : 'text-gray-400'} /> 
            <span>Taslaklar</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative bg-[#151515]">
        {/* Header */}
        <div className="h-14 border-b border-white/10 flex items-center px-6 gap-4">
          {activeEmail && (
            <button onClick={() => setActiveEmail(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors mr-2">
              <ArrowLeft size={18} className="text-gray-400" />
            </button>
          )}
          <h2 className="text-xl font-light">
            {activeEmail ? 'İleti Detayı' : (activeTab === 'inbox' ? 'Gelen Kutusu' : activeTab === 'sent' ? 'Gönderilenler' : 'Taslaklar')}
          </h2>
        </div>

        {/* Email Content or List */}
        <div className="flex-1 overflow-y-auto">
          {activeEmail ? (
            <div className="p-8 max-w-3xl mx-auto space-y-6">
               <h1 className="text-3xl font-light mb-8">{activeEmail.subject}</h1>
               <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                 <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl bg-blue-600">
                    {activeEmail.sender[0].toUpperCase()}
                 </div>
                 <div>
                    <div className="font-semibold">{activeEmail.sender}</div>
                    <div className="text-sm text-gray-400">
                       Alıcı: {activeEmail.to || 'Siz'} • {activeEmail.date}
                    </div>
                 </div>
               </div>
               <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {activeEmail.isMarkdown ? (
                    <div>
                      {activeEmail.body.split('\n\n').map((para: string, i: number) => {
                        if (para.startsWith('![')) {
                          const urlMatch = para.match(/\((.*?)\)/);
                          if (urlMatch) {
                            return <img key={i} src={urlMatch[1]} alt="Attached" className="max-w-full rounded-lg mt-4 shadow-lg border border-white/10" />;
                          }
                        }
                        return <p key={i} className="mb-4">{para}</p>;
                      })}
                    </div>
                  ) : (
                    activeEmail.body
                  )}
               </div>

               {activeEmail.sender === 'hintballowski' && (
                  <div className="mt-8 pt-8 border-t border-white/10">
                     <button 
                       onClick={handleReplyHintballowski}
                       className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-red-500/20"
                     >
                       <Reply size={18} /> Karşılık Ver
                     </button>
                  </div>
               )}
            </div>
          ) : currentList.length > 0 ? (
            currentList.map(email => (
              <div key={email.id} onClick={() => openEmail(email)} className={`flex items-start gap-4 p-4 border-b border-white/5 hover:bg-white/[0.08] cursor-pointer transition-colors ${!email.read ? 'bg-white/[0.03]' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${!email.read ? 'bg-blue-600' : 'bg-gray-700'}`}>
                  {email.sender[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`truncate ${!email.read ? 'font-bold' : 'font-medium text-gray-300'}`}>{email.sender}</h3>
                    <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{email.date}</span>
                  </div>
                  <h4 className={`text-sm truncate mb-1 ${!email.read ? 'text-white font-semibold' : 'text-gray-400'}`}>{email.subject}</h4>
                  <p className="text-xs text-gray-500 truncate">{email.preview}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center h-full opacity-50">
              <Archive size={64} className="mb-4" />
              <p>Burası şimdilik boş görünüyor.</p>
            </div>
          )}
        </div>

        {/* Compose Overlay */}
        {isComposing && (
          <div className="absolute right-0 bottom-0 w-full max-w-md bg-[#222] shadow-2xl border-t border-l border-white/10 flex flex-col h-[500px] z-50">
            <div className="h-10 bg-[#333] flex items-center justify-between px-4">
              <span className="text-sm font-medium">Yeni İleti</span>
              <button onClick={() => setIsComposing(false)} className="hover:bg-red-500 p-1 rounded transition-colors text-gray-300 hover:text-white">
                <X size={16} />
              </button>
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="border-b border-white/10 px-4 py-2 flex items-center gap-2">
                <span className="text-gray-400 text-sm w-12">Kime:</span>
                <input 
                  type="text" 
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm" 
                  placeholder="alici@ornek.com"
                />
              </div>
              <div className="border-b border-white/10 px-4 py-2 flex items-center gap-2">
                <span className="text-gray-400 text-sm w-12">Konu:</span>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm" 
                  placeholder="İletinin konusu"
                />
              </div>
              <textarea 
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="flex-1 bg-transparent outline-none p-4 resize-none text-sm"
                placeholder="Mesajınızı buraya yazın..."
              ></textarea>
            </div>

            <div className="h-14 border-t border-white/10 flex items-center justify-between px-4 bg-[#1a1a1a]">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded text-gray-400 transition-colors"><Paperclip size={18} /></button>
                <button className="p-2 hover:bg-white/10 rounded text-gray-400 transition-colors"><Trash2 size={18} /></button>
              </div>
              <button 
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                disabled={!to || !subject}
              >
                Gönder <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
