import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Loading from "../components/ui/Loading";

export default function ActivatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const docRef = doc(db, "pets", id);
        const docSnap = await getDoc(docRef);

        // Eğer hayvan ismi varsa zaten aktive edilmiştir, profile gönder
        if (docSnap.exists() && docSnap.data().name) {
          navigate(`/pet/${id}`);
        } else {
          setChecking(false);
        }
      } catch (error) {
        console.error("Kontrol hatası:", error);
        setChecking(false);
      }
    };
    check();
  }, [id, navigate]);

  if (checking) return <Loading />;

  return (
    <div className="min-h-screen bg-[#FDFCF9] font-sans flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        
        {/* İkon Alanı */}
        <div className="relative mb-10 flex justify-center">
          <div className="absolute inset-0 bg-[#559632]/10 rounded-full blur-3xl animate-pulse" />
          <div className="relative w-24 h-24 bg-white rounded-[2.5rem] shadow-2xl shadow-[#559632]/10 flex items-center justify-center border border-stone-100 group transition-transform hover:scale-105 duration-500">
             <div className="w-16 h-16 rounded-[1.8rem] bg-[#559632] flex items-center justify-center text-white shadow-lg shadow-[#559632]/20">
                <Sparkles size={32} />
             </div>
          </div>
        </div>

        <h1 className="text-4xl font-light text-stone-900 tracking-tight mb-4">
          Yeni Bir <span className="text-[#559632] italic font-serif">Başlangıç</span>
        </h1>
        <p className="text-stone-400 text-sm leading-relaxed mb-10 px-4">
          Künyen henüz aktif değil. Dostunun dijital kimliğini oluşturmak için hazırsan başlayalım!
        </p>

        {/* Adımlar Kartı */}
        <div className="bg-white rounded-[2.5rem] p-8 mb-8 text-left shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-stone-50 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <ShieldCheck size={100} className="text-[#559632]" />
          </div>

          {[
            { num: "01", text: "Hızlıca bir hesap oluştur" },
            { num: "02", text: "Dostunun bilgilerini doldur" },
            { num: "03", text: "Güvenliğin tadını çıkar! 🎉" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-5 group">
              <span className="text-xs font-black text-[#559632]/20 tracking-widest group-hover:text-[#559632] transition-colors">{s.num}</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#559632]/30" />
                <span className="text-[13px] font-bold text-stone-600 tracking-wide">{s.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Aksiyon Butonu */}
        <Link
          to={`/register?code=${id}`}
          className="w-full bg-[#559632] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#559632]/20 hover:bg-[#4a832b] hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex items-center justify-center gap-3 group"
        >
          Hadi Başlayalım
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        <footer className="mt-12 flex items-center justify-center gap-2 text-[10px] font-black tracking-[0.2em] text-stone-300 uppercase italic">
          <ShieldCheck size={12} />
          PawTag Güvenlik Sistemi
        </footer>

      </div>
    </div>
  );
}