import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Phone, Shield, AlertTriangle, Heart } from "lucide-react";

export default function DogProfilePage() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(db, "dogs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDog(docSnap.data());
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-400 font-light">Yükleniyor...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center text-center px-6">
        <div>
          <div className="text-5xl mb-4">🐾</div>
          <h1 className="font-display text-2xl font-light text-stone-900 mb-2">Künye bulunamadı</h1>
          <p className="text-stone-400 font-light text-sm">Bu künye henüz kayıtlı değil.</p>
        </div>
      </div>
    );
  }

  const vaccines = dog.vaccines ? dog.vaccines.split(",").map((v) => v.trim()) : [];
  const allergies = dog.allergies ? dog.allergies.split(",").map((a) => a.trim()) : [];

  return (
    <div className="bg-stone-50 min-h-screen font-sans pb-16">

      {/* Kayıp Uyarısı */}
      {dog.isLost && (
        <div className="bg-red-500 text-white text-center py-4 px-6 flex items-center justify-center gap-2 font-medium">
          <AlertTriangle size={18} />
          Bu köpek kayıp! Lütfen sahibiyle iletişime geçin.
        </div>
      )}

      <div className="max-w-lg mx-auto px-6 pt-12">

        {/* Fotoğraf + İsim */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            {dog.photo ? (
              <img
                src={dog.photo}
                alt={dog.name}
                className="w-36 h-36 rounded-3xl object-cover shadow-lg"
              />
            ) : (
              <div className="w-36 h-36 rounded-3xl bg-stone-200 flex items-center justify-center shadow-lg">
                <span className="text-5xl">🐾</span>
              </div>
            )}
            {dog.isLost && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                Kayıp
              </span>
            )}
          </div>
          <h1 className="font-display text-4xl font-light text-stone-900 tracking-tight mb-1">
            {dog.name || "İsimsiz"}
          </h1>
          <p className="text-stone-400 font-light">
            {dog.breed} {dog.age ? `· ${dog.age}` : ""}
          </p>
        </div>

        {/* Sahibi Ara */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-4 shadow-sm">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300 mb-4">Sahibi</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stone-900 font-medium">{dog.ownerName || "—"}</p>
              <p className="text-stone-400 text-sm font-light">{dog.ownerPhone || "—"}</p>
            </div>
            {dog.ownerPhone && (
              <a
                href={`tel:${dog.ownerPhone}`}
                className="flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-stone-700 transition-colors"
              >
                <Phone size={15} />
                Ara
              </a>
            )}
          </div>
        </div>

        {/* Sağlık Bilgileri */}
        {(vaccines.length > 0 || allergies.length > 0 || dog.vet) && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-4 shadow-sm">
            <p className="text-xs font-medium tracking-widest uppercase text-stone-300 mb-4">Sağlık</p>

            {vaccines.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={15} className="text-blue-400" />
                  <span className="text-sm font-medium text-stone-700">Aşılar</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {vaccines.map((v) => (
                    <span key={v} className="bg-blue-50 text-blue-500 text-xs font-medium px-3 py-1 rounded-full">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {allergies.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={15} className="text-amber-400" />
                  <span className="text-sm font-medium text-stone-700">Alerjiler</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allergies.map((a) => (
                    <span key={a} className="bg-amber-50 text-amber-500 text-xs font-medium px-3 py-1 rounded-full">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {dog.vet && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={15} className="text-red-400" />
                  <span className="text-sm font-medium text-stone-700">Veteriner</span>
                </div>
                <p className="text-stone-400 text-sm font-light">{dog.vet}</p>
              </div>
            )}
          </div>
        )}

        <p className="text-center text-stone-300 text-xs font-light mt-8">
          🐾 PawID ile korunuyor
        </p>

      </div>
    </div>
  );
}