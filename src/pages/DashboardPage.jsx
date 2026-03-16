import { useRef, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LogOut, Camera, AlertTriangle, CheckCircle, ChevronLeft, Home } from "lucide-react";

import DashboardSection from "../components/dashboard/DashboardSection";
import DashInput from "../components/dashboard/DashInput";
import Loading from "../components/ui/Loading";
import { usePetDashboard } from "../hooks/usePetDashboard";

export default function DashboardPage() {
  const navigate = useNavigate();
  const fileRef = useRef();
  const [activeSection, setActiveSection] = useState("pet");
  
  const { pet, setPet, loading, saving, saved, uploading, handleSave, handlePhoto } = usePetDashboard();

  const updatePet = (key, value) => setPet(prev => ({ ...prev, [key]: value }));

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#FDFCF9] pb-40 font-sans relative">
      
      {/* ── ARKA PLAN DEKOR (Korkutucu beyazlığı kırar) ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#559632]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-red-500/5 rounded-full blur-[80px]" />
      </div>

      {/* ── ÜST NAVİGASYON (Geri dönüş yolu) ── */}
      <nav className="bg-white/80 backdrop-blur-md px-6 h-16 flex items-center justify-between border-b border-stone-100 sticky top-0 z-50">
        <button 
          onClick={() => navigate("/")} 
          className="flex items-center gap-2 text-stone-400 hover:text-[#559632] transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-white border border-transparent group-hover:border-stone-100">
            <ChevronLeft size={18} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider">Ana Sayfa</span>
        </button>
        
        <div className="font-serif italic text-[#559632] text-lg">PawTag</div>

        <button 
          onClick={() => { signOut(auth); navigate("/login"); }} 
          className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-red-500 transition-colors"
          title="Çıkış Yap"
        >
          <LogOut size={18}/>
        </button>
      </nav>

      <div className="max-w-lg mx-auto px-6 pt-8 relative z-10">
        
        {/* ── PROFİL KARTI ── */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-stone-100 mb-6 text-center">
          <div className="relative inline-block mb-4">
            <div className="w-28 h-28 rounded-[2.5rem] overflow-hidden bg-stone-50 border-4 border-white shadow-md">
              {pet.photo ? (
                <img src={pet.photo} className="w-full h-full object-cover" alt="Pet"/>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-stone-50 text-4xl grayscale opacity-50">🐾</div>
              )}
            </div>
            <button 
              onClick={() => fileRef.current.click()} 
              className="absolute -bottom-1 -right-1 bg-[#559632] p-2.5 rounded-2xl text-white shadow-lg border-2 border-white hover:scale-110 transition-transform"
            >
              <Camera size={16}/>
            </button>
            <input ref={fileRef} type="file" onChange={(e) => handlePhoto(e.target.files[0])} className="hidden" />
          </div>
          <h2 className="text-2xl font-bold text-stone-800">{pet.name || "Dostunun Adı"}</h2>
          <p className="text-stone-400 text-xs font-medium mt-1 uppercase tracking-widest italic">{pet.breed || "Cins Belirtilmedi"}</p>
          {uploading && <div className="mt-3 text-[#559632] text-[10px] font-bold animate-pulse">FOTOĞRAF YÜKLENİYOR...</div>}
        </div>

        {/* ── KAYIP MODU (Görsel olarak daha net) ── */}
        <button 
          onClick={() => updatePet("isLost", !pet.isLost)}
          className={`w-full p-6 rounded-3xl mb-8 flex items-center justify-between transition-all duration-300 transform active:scale-[0.98] ${
            pet.isLost 
              ? 'bg-red-500 text-white shadow-xl shadow-red-200 ring-4 ring-red-50' 
              : 'bg-white text-stone-800 border border-stone-100 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${pet.isLost ? 'bg-white/20' : 'bg-green-50'}`}>
              {pet.isLost ? <AlertTriangle size={24}/> : <CheckCircle size={24} className="text-green-500"/>}
            </div>
            <div className="text-left">
              <p className="font-black text-sm tracking-tight">{pet.isLost ? "KAYIP MODU AKTİF" : "DURUM: GÜVENDE"}</p>
              <p className={`text-xs ${pet.isLost ? 'text-red-100' : 'text-stone-400'}`}>Bilgileri güncellemek için dokun</p>
            </div>
          </div>
          <div className={`w-2 h-2 rounded-full animate-ping ${pet.isLost ? 'bg-white' : 'bg-green-500'}`} />
        </button>

        {/* ── BİLGİ ALANLARI ── */}
        <div className="space-y-4">
          <DashboardSection title="🐶 Genel Bilgiler" id="pet" activeSection={activeSection} setActiveSection={setActiveSection}>
            <DashInput label="Dostunun İsmi" value={pet.name} onChange={e => updatePet("name", e.target.value)} placeholder="Örn: Chivas" />
            <DashInput label="Cinsi" value={pet.breed} onChange={e => updatePet("breed", e.target.value)} placeholder="Örn: Golden Retriever" />
          </DashboardSection>

          <DashboardSection title="🏥 Sağlık Bilgileri" id="health" activeSection={activeSection} setActiveSection={setActiveSection}>
            <DashInput label="Önemli Aşılar" value={pet.vaccines} onChange={e => updatePet("vaccines", e.target.value)} />
            <DashInput label="Alerji veya Hastalık" value={pet.allergies} onChange={e => updatePet("allergies", e.target.value)} />
          </DashboardSection>

          <DashboardSection title="👤 İletişim Detayları" id="owner" activeSection={activeSection} setActiveSection={setActiveSection}>
            <DashInput label="Sahibi / İletişim Kişisi" value={pet.ownerName} onChange={e => updatePet("ownerName", e.target.value)} />
            <DashInput label="Acil Durum Telefonu" value={pet.ownerPhone} onChange={e => updatePet("ownerPhone", e.target.value)} />
            <DashInput label="Bulan Kişiye Not" value={pet.calmingNote} onChange={e => updatePet("calmingNote", e.target.value)} isTextArea placeholder="Örn: Çok uysaldır, lütfen su verin..." />
          </DashboardSection>
        </div>
      </div>

      {/* ── ALT KAYDET BAR (Yüzen butona çevrildi) ── */}
      <div className="fixed bottom-0 inset-x-0 p-6 z-40 bg-gradient-to-t from-[#FDFCF9] via-[#FDFCF9]/90 to-transparent">
        <button 
          onClick={handleSave}
          disabled={saving}
          className={`w-full max-w-lg mx-auto py-5 rounded-[2rem] font-black tracking-widest text-xs shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 ${
            saved 
              ? 'bg-green-500 text-white shadow-green-200' 
              : 'bg-black text-white hover:bg-stone-800'
          }`}
        >
          {saving ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              GÜNCELLENİYOR...
            </div>
          ) : saved ? (
            <>KAYDEDİLDİ <CheckCircle size={18} /></>
          ) : (
            "DEĞİŞİKLİKLERİ KAYDET"
          )}
        </button>
      </div>
    </div>
  );
}