import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Phone, Shield, AlertTriangle, Heart, MapPin, Gift } from "lucide-react";
import Loading from "../components/ui/Loading";
import NotFound from "../components/ui/NotFound";
import PetHeader from "../components/pet/PetHeader";
import InfoCard from "../components/pet/InfoCard";

export default function PetProfilePage() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [locationSent, setLocationSent] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(db, "pets", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setPet(docSnap.data());
      else setNotFound(true);
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`; // URL düzeltildi
      const phone = pet?.ownerPhone?.replace(/\s/g, "");
      if (phone) {
        window.open(`https://wa.me/${phone}?text=Hayvanınızı buldum! Konumum: ${mapsUrl}`, "_blank");
      }
      setLocationSent(true);
    });
  };

  if (loading) return <Loading />;
  if (notFound) return <NotFound />;

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

        {/* Butonlar */}
        <div className="flex flex-col gap-3 mb-6">
          {pet.ownerPhone && (
            <a href={`tel:${pet.ownerPhone}`} className="flex items-center justify-center gap-2 bg-black text-white py-4 rounded-2xl font-medium text-sm">
              <Phone size={16} /> {pet.isLost ? "Ailemi Ara 🎉" : "Sahibini Ara"}
            </a>
          )}
          <button onClick={handleLocation} className="flex items-center justify-center gap-2 bg-gray-100 text-gray-900 py-4 rounded-2xl font-medium text-sm">
            <MapPin size={16} /> {locationSent ? "✓ Konum Gönderildi!" : "Konumumu Gönder"}
          </button>
        </div>

        {/* Ödül & Notlar */}
        {pet.isLost && (pet.reward || pet.calmingNote) && (
          <div className="space-y-3 mb-4">
            {pet.reward && (
              <div className="bg-amber-50 rounded-2xl p-4 flex items-center gap-3">
                <Gift size={18} className="text-amber-500" />
                <div><p className="text-xs font-medium text-amber-600 uppercase">Ödül</p><p className="text-sm">{pet.reward}</p></div>
              </div>
            )}
            {pet.calmingNote && (
              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-xs font-medium text-blue-500 uppercase mb-2">💡 Nasıl Sakinleştirirsin?</p>
                <p className="text-sm text-gray-700">{pet.calmingNote}</p>
              </div>
            )}
          </div>
        )}

        <InfoCard title="Sahibi">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{pet.ownerName || "—"}</p>
              <p className="text-gray-400 text-sm">{pet.ownerPhone || "—"}</p>
            </div>
            {pet.ownerPhone && (
              <a href={`tel:${pet.ownerPhone}`} className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
                <Phone size={14} /> Ara
              </a>
            )}
          </div>
        </InfoCard>

        {(vaccines.length > 0 || allergies.length > 0 || pet.vet) && (
          <InfoCard title="Sağlık">
            {vaccines.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2"><Shield size={14} className="text-green-500" /><span className="text-sm font-medium">Aşılar</span></div>
                <div className="flex flex-wrap gap-2">
                  {vaccines.map((v) => <span key={v} className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">{v}</span>)}
                </div>
              </div>
            )}
            {pet.vet && <div className="mt-4"><div className="flex items-center gap-2 mb-1"><Heart size={14} className="text-red-400" /><span className="text-sm font-medium">Veteriner</span></div><p className="text-gray-400 text-sm">{pet.vet}</p></div>}
          </InfoCard>
        )}

        <p className="text-center text-gray-300 text-xs mt-8">🐾 PawTag · pawtag-tr.com</p>
      </div>
    </div>
  );
}