import { ArrowRight, Sparkles } from "lucide-react";
import { auth } from "../firebase"; 
import { useEffect, useState } from "react";
import StepCard from "../components/home/StepCard";
import EmergencyBanner from "../components/home/EmergencyBanner";

const STEPS = [
  { img: "/37.png", t: "Hızlı Aktivasyon", d: "Özel aktivasyon linkiyle saniyeler içinde kaydolun." },
  { img: "/36.png", t: "Profilini Hazırla", d: "Dostunuzun dijital kimliğini her an güncelleyin." },
  { img: "/33.png", t: "Anında Erişim", d: "NFC veya QR kodu tarattığı anda bilgileriniz belirir." },
  { img: "/38.png", t: "Hızlı Kavuşma", d: "Kayıp modunda dostunuz emin ellerde kalır." }
];

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase üzerinden giriş durumunu dinle
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-[#FDFCF9] min-h-screen font-sans overflow-x-hidden">
      {/* ── ARKA PLAN ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-[#559632]/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-[#559632]/3 rounded-full blur-[60px]" />
      </div>

      {/* ── HERO SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Görsel Alanı */}
          <div className="w-full lg:w-1/2 relative flex justify-center order-1 lg:order-none">
            <div className="absolute inset-0 bg-[#559632]/5 rounded-full blur-3xl" />
            <img src="/32.png" className="relative z-10 w-64 md:w-80 lg:w-[450px] animate-float" alt="PawTag Pet" />
            <img src="/33.png" className="absolute -right-4 top-10 w-12 md:w-20 animate-bounce-slow opacity-80" alt="Icon" />
          </div>

          {/* Metin Alanı */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-stone-100 px-4 py-2 rounded-full shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-[#559632] animate-pulse" />
              <span className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Yeni Nesil Güvence</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-stone-900 leading-[1.1] mb-8">
              Dostunu <span className="italic font-serif text-[#559632] relative">PawTag</span> ile koru
            </h1>

            <p className="text-stone-400 font-light text-lg mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Karmaşık sistemleri unutun. Sadece bir dokunuşla dostunuzun dijital kimliğine ulaşın ve onu her zaman güvende tutun.
            </p>

            {/* 🔥 DİNAMİK BUTONLAR 🔥 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="/products" 
                className="group bg-[#559632] text-white px-10 py-5 rounded-full font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-[#4a832b] transition-all transform hover:scale-105"
              >
                Künyeni Tasarla 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Yükleme ekranı bittiğinde butonu gösteriyoruz */}
              {!loading && (
                <a 
                  href={user ? "/activate" : "/login"} 
                  className="bg-white text-stone-600 border border-stone-200 px-10 py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm"
                >
                  Künyeni Aktif Et
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── NASIL ÇALIŞIR ── */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-24 border-t border-stone-100">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4 text-[#559632]">
            <Sparkles size={24} />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-stone-900 mb-4 tracking-tight">
            Dostuna giden <span className="text-[#559632] italic font-serif">en kısa yol</span>
          </h2>
          <p className="text-stone-400 text-sm max-w-md mx-auto">
            Saniyeler süren kurulumdan sonra dostunuz ömür boyu güvende.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {STEPS.map((step, i) => (
            <StepCard key={i} stepNumber={i + 1} title={step.t} description={step.d} image={step.img} />
          ))}
        </div>

        <EmergencyBanner />
      </section>
    </div>
  );
}