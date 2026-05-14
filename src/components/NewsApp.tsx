
export default function NewsApp() {
  const news = [
    { title: "GuguGAGA'dan Şok Açıklamalar", body: "- Google'ın gözden kaçırdığı güvenlik açıklarından yararlanarak Google'ın sistemlerine giriş yaptığını ve Google'dan para kazandığını söyledi.\n- Başlangıç\n- Google'dan kazandığınız Roblox.\n- Bu ne ya?\n- Bu bir şey olmalı.\n- Başka bir şekilde, neyse.\n- Bilgisayar kasası kullanılıyor.\n\nBunu GuguGAGA söyledi" },
    { title: "Yapay Zeka ve İşlemci Savaşları", body: "NPU Devrimi yeni nesil işlemcileri AI odaklı kılıyor. TEN OS'un 24 GB RAM'i bu zekayı öne çıkarıyor." },
    { title: "İHA ve Havacılık Gündemi", body: "SHGM drone teslimat koridorlarını tanımladı. Katı hal bataryaları uçuş süresini 3 katına çıkarıyor." },
    { title: "Yazılım ve OS Dünyası", body: "Kernel-Free sistemler ve 'Zarif Yavaşlama' (0.5x animasyonlar) popülerleşiyor." },
    { title: "TECBİT FLAŞ", body: "TEN OS, 24 GB RAM ile stabilite testlerini %100 başarıyla tamamladı." },
    { title: "GELİŞME", body: "Disk Birleştirme özelliğindeki 0.5x 'Zarif Dönüş' efekti kullanıcılar tarafından tam not aldı." },
    { title: "DUYURU", body: "Yönetim kadrosu (Mert, Ömer, Alkas) sistemin yeni 'Zarif Koyu' temasını onayladı." },
  ];

  return (
    <div className="h-full p-6 text-[#e0e0e0] overflow-y-auto space-y-6">
      <h2 className="text-xl font-semibold mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Teknoloji Gündemi</h2>
      {news.map((item, index) => (
        <div key={index} className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
          <h3 className="font-semibold text-blue-400 mb-2">{item.title}</h3>
          <p className="text-sm text-white/70 whitespace-pre-wrap">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
