import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Phone, Shield, AlertTriangle, Heart, MapPin, Gift, Sparkles, ArrowRight } from "lucide-react";
import Loading from "../components/ui/Loading";
import NotFound from "../components/ui/NotFound";
import PetHeader from "../components/pet/PetHeader";
import InfoCard from "../components/pet/InfoCard";

export default function PetProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [locationSent, setLocationSent] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const docRef = doc(db, "pets", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPet(docSnap.data());
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Firestore Hatası:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <Loading />;
  if (notFound) return <NotFound />;

  // 🛡️ KRİTİK KONTROL: Eğer pet verisi yoksa veya henüz aktive edilmemişse (false veya undefined)
  if (!pet || pet.activated !== true) {
    return (
      <div className="min-h-screen bg-[#FDFCF9] flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
          <div className="relative mb-8 flex justify-center">
            <div className="absolute inset-0 bg-[#559632]/10 rounded-full blur-3xl" />
            <div className="relative w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center border border-stone-100 animate-float">
               <Sparkles size={40} className="text-[#559632]" />
            </div>
          </div>

          <h1 className="text-3xl font-light text-stone-900 mb-4 tracking-tight">
            Yeni Bir <span className="text-[#559632] italic font-serif">PawTag!</span>
          </h1>
          
          <p className="text-stone-500 mb-8 leading-relaxed text-sm">
            Bu künye (<strong>{id}</strong>) henüz aktive edilmemiş. <br />
            Dostunuzun dijital kimliğini oluşturmak için hazırsanız başlayalım!
          </p>

          <button 
            onClick={() => navigate(`/activate/${id}`)}
            className="w-full bg-[#559632] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-[#4a832b] transition-all flex items-center justify-center gap-3 group"
          >
            Künyeyi Aktive Et
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  // 🐾 AKTİF PROFİL: activated === true ise burası çalışır
  const vaccines = pet.vaccines ? pet.vaccines.split(",").map((v) => v.trim()).filter(Boolean) : [];
  const allergies = pet.allergies ? pet.allergies.split(",").map((a) => a.trim()).filter(Boolean) : [];

  return (
    <div className="bg-white min-h-screen font-sans pb-16">
      {pet.isLost && (
        <div className="bg-red-500 text-white text-center py-3 px-6 text-sm font-medium flex items-center justify-center gap-2">
          <AlertTriangle size={16} />
          Bu hayvan kayıp! Lütfen sahibiyle iletişime geçin.
        </div>
      )}

      <div className="max-w-lg mx-auto px-6 pt-10">
        <PetHeader pet={pet} />
        {/* ... Diğer profil kodların (Sahibi Ara, Konum Gönder vb.) ... */}
        
        {/* Test amaçlı basit bir içerik */}
        <div className="mt-10">
           <InfoCard title="Sahibi Bilgileri">
              <p className="text-sm">{pet.ownerName || "İsimsiz"}</p>
              <p className="text-sm font-bold">{pet.ownerPhone}</p>
           </InfoCard>
        </div>

        <p className="text-center text-gray-300 text-[10px] mt-12 tracking-widest font-bold uppercase">🐾 PawTag</p>
      </div>
    </div>
  );
}