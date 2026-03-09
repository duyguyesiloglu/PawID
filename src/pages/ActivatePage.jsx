import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ActivatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      const docRef = doc(db, "dogs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().name) {
        // Künye aktif → profil sayfasına git
        navigate(`/dog/${id}`);
      } else {
        // Künye aktif değil → kayıt sayfasına yönlendir
        setChecking(false);
      }
    };
    check();
  }, [id, navigate]);

  if (checking) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-400 font-light">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen font-sans flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">

        {/* İkon */}
        <div className="w-20 h-20 rounded-3xl bg-stone-900 flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl">🐾</span>
        </div>

        {/* Başlık */}
        <h1 className="font-display text-3xl font-light text-stone-900 tracking-tight mb-3">
          Künyeni aktifleştir
        </h1>
        <p className="text-stone-400 font-light text-sm leading-relaxed mb-10">
          Bu künye henüz aktif değil. Hesap oluşturarak köpeğinin profilini oluşturabilirsin.
        </p>

        {/* Adımlar */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-6 text-left flex flex-col gap-4 shadow-sm">
          {[
            { num: "01", text: "Hesap oluştur" },
            { num: "02", text: "Köpeğinin bilgilerini doldur" },
            { num: "03", text: "Künye hazır! 🎉" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-4">
              <span className="font-display text-xl font-light text-stone-200">{s.num}</span>
              <span className="text-sm text-stone-600 font-light">{s.text}</span>
            </div>
          ))}
        </div>

        {/* Buton */}
        <a
          href={`/register?code=${id}`}
          className="block bg-stone-900 text-white py-4 rounded-2xl font-medium text-sm hover:bg-stone-700 transition-colors"
        >
          Başla →
        </a>

        <p className="text-stone-300 text-xs font-light mt-6">
          🐾 PawID · Akıllı NFC Köpek Künyesi
        </p>

      </div>
    </div>
  );
}
