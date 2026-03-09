import { PawPrint, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-[#FDFCF9] min-h-screen font-sans overflow-x-hidden">
      
      {/* ── ARKA PLAN ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#559632]/5 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#559632]/3 rounded-full blur-[60px] md:blur-[100px]" />
      </div>

      {/* ── HERO SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/2 relative flex justify-center order-1 lg:order-none">
            <div className="absolute inset-0 bg-[#559632]/5 rounded-full blur-3xl" />
            <img 
              src="/32.png" 
              alt="Happy Dog" 
              className="relative z-10 w-64 md:w-80 lg:w-[450px] drop-shadow-2xl animate-float" 
            />
            <img 
              src="/33.png" 
              alt="" 
              className="absolute -right-4 top-10 w-12 md:w-16 lg:w-20 drop-shadow-xl animate-bounce-slow" 
            />
          </div>

          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-stone-100 px-4 py-2 rounded-full shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-[#559632] animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400">Yeni Nesil Güvence</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-8xl font-light text-stone-900 leading-[1.1] tracking-tight mb-8">
              Dostunu <br />
              <span className="italic font-serif text-[#559632] relative inline-block">
                PawTag
                <svg className="absolute -bottom-2 left-0 w-full opacity-30" viewBox="0 0 338 12" fill="none">
                  <path d="M3 9C118.957 4.47226 254.444 -3.50408 335 9" stroke="#559632" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
              {" "}ile koru
            </h1>

            <p className="text-stone-400 font-light text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed">
              Karmaşık sistemleri unutun. Sadece bir dokunuşla dostunuzun dijital kimliğine ulaşın. <span className="text-stone-600 font-medium">Sade, hızlı ve güvenli.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <a href="/dashboard" className="w-full sm:w-auto bg-[#559632] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#457a29] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#559632]/20 flex items-center justify-center gap-3">
                Hemen Başlat <ArrowRight size={20} />
              </a>
              <a href="#how" className="text-stone-400 font-medium hover:text-stone-900 transition-colors py-2 px-8">
                Nasıl çalışır?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── NASIL ÇALIŞIR ── */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-24 border-t border-stone-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-stone-900 mb-4 tracking-tight">
            Dostuna giden <span className="text-[#559632] italic font-serif">en kısa yol</span>
          </h2>
          <p className="text-stone-400 font-light max-w-lg mx-auto">
            Aktivasyondan kavuşma anına kadar her adım, dostunuzun güvenliği için tasarlandı.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { 
              img: "/37.png", 
              t: "Hızlı Aktivasyon", 
              d: "Size ulaşan özel aktivasyon linkiyle saniyeler içinde kaydolun. Karmaşık formlarla uğraşmadan sisteminizi aktif edin." 
            },
            { 
              img: "/36.png", 
              t: "Profilini Hazırla", 
              d: "Dostunuzun adını, alerji bilgilerini ve kendi iletişim bilgilerinizi girin. Dijital kimliği her an güncellenebilir olsun." 
            },
            { 
              img: "/33.png", 
              t: "Anında Erişim", 
              d: "Dostunuz kaybolursa, bulan kişi NFC veya QR kodu tarattığı anda telefonunda tüm sağlık ve iletişim bilgileriniz belirir." 
            },
            { 
              img: "/38.png", 
              t: "Hızlı Kavuşma", 
              d: "Kayıp modunu açtığınızda, bulucuya özel kırmızı uyarı gösterilir. En yakın veteriner bilgisiyle dostunuz emin ellerde kalır." 
            }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center lg:items-start text-center lg:text-left group">
              <div className="h-32 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <img src={item.img} alt={item.t} className="max-h-full drop-shadow-xl" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold bg-[#559632]/10 text-[#559632] px-2 py-0.5 rounded-md">Adım {i + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-stone-800 mb-3">{item.t}</h3>
              <p className="text-sm text-stone-400 font-light leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>

        {/* Kayıp Modu Vurgusu */}
        <div className="mt-20 bg-[#559632]/5 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-[#559632]/10">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <span className="text-3xl animate-pulse">🆘</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-stone-800 mb-2">Acil Durum: Kayıp Alarmı</h4>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              Ona ulaşamadığınız an panelden <span className="font-bold text-red-500 uppercase">Kayıp</span> butonuna basmanız yeterlidir. Bu modda künye tarandığında, bulucuya dostunuzun özel ihtiyaçları ve en yakın veterinerin adresi otomatik olarak sunulur.
            </p>
          </div>
          <a href="/dashboard" className="bg-[#559632] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#457a29] transition-colors whitespace-nowrap">
            Hemen Başla
          </a>
        </div>
      </section>
    </div>
  );
}