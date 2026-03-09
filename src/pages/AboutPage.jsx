import { Heart, Shield, Zap, PawPrint } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#FDFCF9] min-h-screen font-sans pt-32 pb-20 overflow-hidden relative">
      
      {/* Arka Plan Yumuşak Dokunuşlar */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#559632]/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#559632]/5 rounded-full blur-[80px] -z-10" />

      <div className="max-w-3xl mx-auto px-6">

        {/* --- BÖLÜM 1: GİRİŞ VE ANA İLLÜSTRASYON --- */}
        <div className="text-center mb-20 relative">
          <p className="text-[#559632] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 bg-[#559632]/10 inline-block px-4 py-1.5 rounded-full">
            Biz Kimiz?
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-stone-900 tracking-tight leading-tight mb-8">
            Her dostun hikayesi <br />
            <span className="italic text-[#559632] font-serif">güvende kalmalı.</span>
          </h1>
          
          {/* Görsel 32: Mutlu Köpek İllüstrasyonu */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 bg-[#559632]/10 rounded-full animate-pulse" />
            <img src="/32.png" alt="PawTag Dostu" className="relative z-10 w-full h-auto drop-shadow-xl" />
          </div>

          <p className="text-stone-500 font-light text-lg leading-relaxed max-w-lg mx-auto">
            PawTag, evcil hayvan sahiplerinin en büyük korkusunu, teknolojinin gücü ve hayvan sevgisiyle yenmek için kuruldu.
          </p>
        </div>

        {/* --- BÖLÜM 2: HİKAYEMİZ VE KONUM VURGUSU --- */}
        <div className="bg-white/60 backdrop-blur-md border border-[#559632]/10 rounded-[40px] p-10 shadow-xl shadow-[#559632]/5 mb-16 relative">
          {/* Görsel 33: Konum İkonu */}
          <div className="absolute -right-6 -top-10 w-20 opacity-90 hidden md:block">
            <img src="/33.png" alt="Konum" className="w-full h-auto" />
          </div>

          <h2 className="text-[#559632] font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#559632] rounded-full" />
            Neden Yola Çıktık?
          </h2>
          <div className="space-y-4 text-stone-600 font-light text-base leading-relaxed">
            <p>
              Geleneksel metal künyeler silinir, eskir veya üzerindeki bilgiler zamanla geçerliliğini yitirir. Bir dostumuz kaybolduğunda, ona yardım etmek isteyen kişinin size ulaşması dakikalar değil, saniyeler sürmeli.
            </p>
            <p>
              <strong className="font-medium text-stone-800">PawTag</strong>, tam bu noktada devreye giriyor. Karmaşık uygulamalara gerek duymadan, sadece bir telefon dokunuşuyla dijital bir köprü kuruyoruz.
            </p>
          </div>
        </div>

        {/* --- BÖLÜM 3: TASMA VE FİZİKSEL ÜRÜN VURGUSU --- */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h2 className="text-3xl font-light text-stone-900 mb-6">Sadece bir künye değil, <br />bir huzur kaynağı.</h2>
            <div className="space-y-6">
              {[
                { icon: <Zap size={18} />, text: "Tek dokunuşla anında profil erişimi." },
                { icon: <Shield size={18} />, text: "Güncellenebilir dijital veri güvenliği." },
                { icon: <PawPrint size={18} />, text: "Dostunuzun konforu için hafif tasarım." }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-stone-500 font-light">
                  <div className="text-[#559632]">{item.icon}</div>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
          
          {/* Görsel 36: Tasma İllüstrasyonu */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="bg-[#559632]/5 p-8 rounded-[50px] rotate-3 hover:rotate-0 transition-transform duration-500">
              <img src="/36.png" alt="PawTag Tasma" className="w-full h-auto drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Son CTA */}
        <div className="bg-[#559632] rounded-[40px] p-12 text-center relative overflow-hidden shadow-2xl shadow-[#559632]/20">
          <h3 className="text-2xl font-light text-white mb-6 relative z-10">Dostunuzu PawTag ile korumaya hemen başlayın.</h3>
          <a
            href="/dashboard"
            className="relative z-10 inline-block bg-white text-[#559632] text-sm font-bold px-12 py-4 rounded-full hover:bg-stone-50 transition-all hover:scale-105"
          >
            Hemen Başla →
          </a>
        </div>

      </div>
    </div>
  );
}