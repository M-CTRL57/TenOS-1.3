import { useState } from 'react';
import { Skull, AlertTriangle, ShieldAlert, Network, Terminal, Activity, Locate, Database, Key, Server, Search, FileCode, CheckCircle, Flame, Shield, Map } from 'lucide-react';

export default function HackerBrowserApp({ onTriggerVirus }: { onTriggerVirus: () => void }) {
  const [accessGranted, setAccessGranted] = useState(false);
  const [activeTab, setActiveTab] = useState<'network' | 'vulnerability' | 'forensics' | 'honeypot' | 'attack'>('attack');
  const [hacking, setHacking] = useState(false);
  const [hacked, setHacked] = useState(false);

  const handleHack = () => {
    setHacking(true);
    setTimeout(() => {
      setHacking(false);
      setHacked(true);
      window.dispatchEvent(new CustomEvent('START_HACK_HINTBALLOWSKI'));
    }, 2000);
  };

  if (!accessGranted) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black text-green-500 font-mono p-4">
        <div className="border border-green-500 p-6 max-w-sm w-full text-center space-y-6 bg-black/80 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
          <ShieldAlert size={48} className="mx-auto text-red-500 mb-2" />
          <h2 className="text-xl text-red-500 font-bold">GÜVENLİK UYARISI</h2>
          <p className="text-sm">Bu uygulama sisteminize erişmek ve ağ taraması yapmak istiyor.</p>
          <div className="flex gap-4 justify-center mt-4">
            <button 
              onClick={() => setAccessGranted(true)}
              className="px-4 py-2 bg-green-500/20 hover:bg-green-500/40 border border-green-500 transition-colors"
            >
              İzin Ver
            </button>
            <button 
              onClick={() => window.close()}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500 text-red-500 transition-colors"
            >
              Reddet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#080808] text-[#0f0] font-mono">
      {/* Browser Header */}
      <div className="bg-[#151515] p-2 flex items-center border-b border-[#333] gap-2">
        <Skull size={20} className="text-red-500" />
        <div className="flex-1 bg-[#000] border border-[#333] px-3 py-1.5 text-sm text-gray-400 rounded-sm">
          root@husnuhacker:~# ./cyber_sec_suite.sh --start
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-[#222] bg-[#0c0c0c] flex flex-col p-4 gap-2">
            <h2 className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-widest">Profesyonel Modüller</h2>
            
            <button onClick={() => setActiveTab('attack')} className={`text-left px-3 py-2.5 rounded-sm flex gap-3 items-center border ${activeTab === 'attack' ? 'border-red-500/50 text-red-500 bg-red-500/10' : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'}`}>
               <Flame size={18} /> Hedefli Saldırı
            </button>
            
            <button onClick={() => setActiveTab('network')} className={`text-left px-3 py-2.5 rounded-sm flex gap-3 items-center border ${activeTab === 'network' ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'}`}>
               <Network size={18} /> Ağ Keşif & Analiz
            </button>
            
            <button onClick={() => setActiveTab('vulnerability')} className={`text-left px-3 py-2.5 rounded-sm flex gap-3 items-center border ${activeTab === 'vulnerability' ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'}`}>
               <Terminal size={18} /> Zafiyet Analizi
            </button>
            
            <button onClick={() => setActiveTab('forensics')} className={`text-left px-3 py-2.5 rounded-sm flex gap-3 items-center border ${activeTab === 'forensics' ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'}`}>
               <Search size={18} /> Adli Bilişim (Forensics)
            </button>
            
            <button onClick={() => setActiveTab('honeypot')} className={`text-left px-3 py-2.5 rounded-sm flex gap-3 items-center border ${activeTab === 'honeypot' ? 'border-amber-500/50 text-amber-500 bg-amber-500/10' : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'}`}>
               <ShieldAlert size={18} /> Bal Küpü (Honeypot)
            </button>
        </div>
        
        {/* Main View */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#222]">
               <Skull className="text-green-500" size={32} />
               <div>
                 <h1 className="text-2xl font-bold text-green-500 tracking-wider">HüsnüHacker° CyberSecurity</h1>
                 <p className="text-gray-500 text-sm">Gelişmiş Siber Savunma ve Saldırı Yönetim Platformu</p>
               </div>
            </div>

            {activeTab === 'attack' && (
              <div className="grid gap-6">
                <div className="border border-red-800/50 p-8 bg-red-950/10 rounded-sm">
                  {!hacked ? (
                    <div className="text-center space-y-6">
                      <h3 className="text-2xl text-red-500 font-bold mb-2 uppercase tracking-widest">Özel Hedef Operasyonu</h3>
                      <p className="text-red-400/80 mb-6">Hedef Sistem: Hintballowski ve Ekibi</p>
                      <button 
                        onClick={handleHack}
                        disabled={hacking}
                        className={`w-full max-w-md mx-auto py-4 font-bold text-lg transition-all rounded-sm flex justify-center items-center gap-3 ${
                          hacking 
                            ? 'bg-yellow-600/20 text-yellow-500 border border-yellow-500/50 animate-pulse' 
                            : 'bg-red-900/50 text-red-500 border border-red-500 hover:bg-red-500 hover:text-black shadow-[0_0_20px_rgba(220,38,38,0.2)]'
                        }`}
                      >
                        <Flame size={24} /> 
                        {hacking ? 'SİSTEMLERE SIZILIYOR...' : 'HINTBALLOWSKI VE EKİBİNİ HACKLE'}
                      </button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4 py-8">
                       <CheckCircle size={64} className="text-green-500 mx-auto" />
                       <div className="text-2xl font-bold text-green-500 tracking-widest">SİSTEMLERE BAŞARIYLA SIZILDI!</div>
                       <p className="text-green-400/70">SYPMAIL uygulamanızı kontrol edin. Geri dönüş mesajları bekleniyor...</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'network' && (
              <div className="space-y-6">
                 <h3 className="text-lg text-green-400 border-b border-green-900 pb-2 mb-4">1. Ağ Keşif ve Analiz Araçları</h3>
                 <p className="text-gray-400 text-sm mb-6">İyi bir hacker, önce savunması gereken alanı tanımalıdır. Bu araçlar ağdaki cihazları ve açık kapıları (portları) tespit eder.</p>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-[#222] bg-[#0c0c0c] p-4 hover:border-green-500/50 transition-colors">
                       <Server className="text-blue-400 mb-3" size={28} />
                       <h4 className="font-bold text-white mb-2">Port Tarayıcı</h4>
                       <p className="text-xs text-gray-500">Açık kapıları ve çalışan servisleri belirler. (Nmap entegrasyonu simülasyonu)</p>
                    </div>
                    <div className="border border-[#222] bg-[#0c0c0c] p-4 hover:border-green-500/50 transition-colors">
                       <Activity className="text-purple-400 mb-3" size={28} />
                       <h4 className="font-bold text-white mb-2">Paket Analizörü</h4>
                       <p className="text-xs text-gray-500">Ağ trafiğini anlık izleyerek şüpheli durumları saptar. (Wireshark logları bağlandı)</p>
                    </div>
                    <div className="border border-[#222] bg-[#0c0c0c] p-4 hover:border-green-500/50 transition-colors">
                       <Map className="text-green-400 mb-3" size={28} />
                       <h4 className="font-bold text-white mb-2">Ağ Haritalama</h4>
                       <p className="text-xs text-gray-500">Sisteme bağlı tüm cihazların topolojisini çıkarır ve izole alanları gösterir.</p>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'vulnerability' && (
              <div className="space-y-6">
                 <h3 className="text-lg text-green-400 border-b border-green-900 pb-2 mb-4">2. Zafiyet Analiz Modülleri</h3>
                 <p className="text-gray-400 text-sm mb-6">Sistemdeki eksikleri bulmak için kullanılır. "Kapıların kilitli olup olmadığını" test edin.</p>

                 <div className="grid grid-cols-1 gap-4">
                    <div className="border border-[#222] bg-[#0c0c0c] p-4 flex gap-4 items-start">
                       <Shield className="text-yellow-500 mt-1" size={24} />
                       <div>
                         <h4 className="font-bold text-white mb-1">Zafiyet Tarayıcılar (CVE Check)</h4>
                         <p className="text-xs text-gray-500">Bilinen güvenlik açıklarını (CVE) otomatik olarak tarar. Güncel zaafiyet DB: Aktif.</p>
                       </div>
                    </div>
                    <div className="border border-[#222] bg-[#0c0c0c] p-4 flex gap-4 items-start">
                       <Database className="text-orange-500 mt-1" size={24} />
                       <div>
                         <h4 className="font-bold text-white mb-1">SQL Enjeksiyon Testi</h4>
                         <p className="text-xs text-gray-500">Veritabanı giriş noktalarındaki güvenlik zafiyetlerini simüle edip koruma durumunu listeler.</p>
                       </div>
                    </div>
                    <div className="border border-[#222] bg-[#0c0c0c] p-4 flex gap-4 items-start">
                       <Key className="text-red-500 mt-1" size={24} />
                       <div>
                         <h4 className="font-bold text-white mb-1">Brute Force Simülatörü</h4>
                         <p className="text-xs text-gray-500">Zayıf şifrelerin kırılma süresini test eder, kullanıcı poliçelerini sıkılaştırmaya yarar.</p>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'forensics' && (
              <div className="space-y-6">
                 <h3 className="text-lg text-green-400 border-b border-green-900 pb-2 mb-4">3. Adli Bilişim ve İzleme (Forensics)</h3>
                 <p className="text-gray-400 text-sm mb-6">Bir saldırı gerçekleşirse ne olduğunu anlamak için gerekli araçlar.</p>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-blue-900/30 bg-blue-950/10 p-5 rounded-sm border-l-4 border-l-blue-500">
                       <h4 className="font-bold text-blue-400 mb-2">Log Analizi</h4>
                       <p className="text-xs text-gray-400">Sistem kayıtlarını çapraz sorgular ve saldırgan ayak izlerini tespit eder.</p>
                    </div>
                    <div className="border border-green-900/30 bg-green-950/10 p-5 rounded-sm border-l-4 border-l-green-500">
                       <h4 className="font-bold text-green-400 mb-2">Veri Kurtarma</h4>
                       <p className="text-xs text-gray-400">Silinmiş veya izi kaybettirilmeye çalışılan (wipe) verileri geri getirir.</p>
                    </div>
                    <div className="border border-purple-900/30 bg-purple-950/10 p-5 rounded-sm border-l-4 border-l-purple-500">
                       <h4 className="font-bold text-purple-400 mb-2">Dosya Bütünlüğü</h4>
                       <p className="text-xs text-gray-400">Kritik sistem dosyalarının karma (hash) değerlerini izler. Değişikliklerde uyarır.</p>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'honeypot' && (
              <div className="space-y-6">
                 <div className="flex justify-between items-end border-b border-amber-900 pb-2 mb-4">
                   <h3 className="text-lg text-amber-500">4. Güvenlik ve Bal Küpü (Honeypot)</h3>
                   <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-500 rounded">DURUM: AKTİF</span>
                 </div>
                 
                 <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                   Saldırganlara çok kolay ele geçirilebilir görünen <strong>sahte bir hedef</strong> sunulmaktadır.
                   Saldırgan bu sahte bölüme saldırdığında gerçek veriye ulaşamaz; aksine kimliği, yöntemleri ve dış IP adresi sessizce kaydedilir.
                 </p>

                 <div className="bg-[#111] border border-[#333] p-4 text-xs font-mono space-y-2 text-gray-400">
                    <div><span className="text-green-500">[+ 0.0s]</span> Honeypot Sandbox servisi başlatıldı...</div>
                    <div><span className="text-green-500">[+ 0.2s]</span> Fake SSH sunucusu 22 numaralı portta sahte verilerle yayına alındı.</div>
                    <div><span className="text-green-500">[+ 0.4s]</span> İşletim sistemi çekirdeğinden izolasyon (Kum Havuzu) doğrulandı.</div>
                    <div><span className="text-amber-500">[{">"}_   ]</span> Gelen bağlantılar izleniyor... (Dinlemede)</div>
                 </div>
              </div>
            )}
            
            <div className="mt-8 pt-4 border-t border-[#222] text-xs text-gray-600 flex justify-between">
              <span>HüsnüHacker° CyberSecurity - Yetkilendirilmiş Kullanım Sınıfı</span>
              <span>v2.4.1 (Kum Havuzu Tipi)</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
