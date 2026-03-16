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
      const docRef = doc(db, "pets", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().name) {
        navigate(`/pet/${id}`);
      } else {
        setChecking(false);
      }
    };
    check();
  }, [id, navigate]);

  if (checking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 text-sm">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">

        <div className="w-20 h-20 rounded-3xl bg-black flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl">🐾</span>
        </div>

        <h1 className="text-3xl font-light text-gray-900 tracking-tight mb-3">
          Künyeni aktifleştir
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Bu künye henüz aktif değil. Hesap oluşturarak hayvanının profilini oluşturabilirsin.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left flex flex-col gap-4">
          {[
            { num: "01", text: "Hesap oluştur" },
            { num: "02", text: "Hayvanının bilgilerini doldur" },
            { num: "03", text: "Künye hazır! 🎉" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-4">
              <span className="text-xl font-light text-gray-200">{s.num}</span>
              <span className="text-sm text-gray-600">{s.text}</span>
            </div>
          ))}
        </div>

        <a
          href={`/register?code=${id}`}
          className="block bg-black text-white py-4 rounded-2xl font-medium text-sm hover:bg-gray-800 transition-colors"
        >
          Başla →
        </a>

        <p className="text-gray-300 text-xs mt-6">
          🐾 PawTag · Akıllı NFC Evcil Hayvan Künyesi
        </p>

      </div>
    </div>
  );
}