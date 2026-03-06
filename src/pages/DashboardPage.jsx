import { useState, useEffect, useRef } from "react";
import { auth, db, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { LogOut, AlertTriangle, CheckCircle, Camera, Save } from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const fileRef = useRef();
  const user = auth.currentUser;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [dog, setDog] = useState({
    name: "",
    breed: "",
    age: "",
    photo: "",
    isLost: false,
    vaccines: "",
    allergies: "",
    vet: "",
    ownerName: "",
    ownerPhone: "",
  });

  // Firestore'dan veri çek
  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    const fetchDog = async () => {
      const docRef = doc(db, "dogs", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setDog(docSnap.data());
      setLoading(false);
    };
    fetchDog();
  }, [user, navigate]);

  // Kaydet
  const handleSave = async () => {
    setSaving(true);
    await setDoc(doc(db, "dogs", user.uid), dog);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Fotoğraf yükle
  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const storageRef = ref(storage, `dogs/${user.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setDog({ ...dog, photo: url });
    setUploading(false);
  };

  // Çıkış
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-400 font-light">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen font-sans pb-16">

      {/* Header */}
      <div className="max-w-lg mx-auto px-6 pt-12 mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-light text-stone-900 tracking-tight">Dashboard</h1>
          <p className="text-stone-400 font-light text-sm mt-1">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 transition-colors"
        >
          <LogOut size={16} />
          Çıkış
        </button>
      </div>

      <div className="max-w-lg mx-auto px-6 flex flex-col gap-4">

        {/* Kayıp Durumu */}
        <div className={`rounded-2xl p-5 flex items-center justify-between border ${dog.isLost ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
          <div className="flex items-center gap-3">
            {dog.isLost
              ? <AlertTriangle size={20} className="text-red-500" />
              : <CheckCircle size={20} className="text-green-500" />
            }
            <div>
              <p className={`font-medium text-sm ${dog.isLost ? "text-red-700" : "text-green-700"}`}>
                {dog.isLost ? "Kayıp ilan edildi" : "Köpeğin güvende"}
              </p>
              <p className={`text-xs font-light ${dog.isLost ? "text-red-400" : "text-green-400"}`}>
                {dog.isLost ? "Profilde kırmızı uyarı görünüyor" : "Profilde uyarı yok"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setDog({ ...dog, isLost: !dog.isLost })}
            className={`text-xs font-medium px-4 py-2 rounded-xl transition-colors ${dog.isLost ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"}`}
          >
            {dog.isLost ? "İptal Et" : "Kayıp İlan Et"}
          </button>
        </div>

        {/* Fotoğraf */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300 mb-4">Fotoğraf</p>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-stone-100 overflow-hidden flex items-center justify-center">
              {dog.photo
                ? <img src={dog.photo} alt="köpek" className="w-full h-full object-cover" />
                : <span className="text-3xl">🐾</span>
              }
            </div>
            <button
              onClick={() => fileRef.current.click()}
              disabled={uploading}
              className="flex items-center gap-2 bg-stone-100 text-stone-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-stone-200 transition-colors disabled:opacity-50"
            >
              <Camera size={15} />
              {uploading ? "Yükleniyor..." : "Fotoğraf Seç"}
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
          </div>
        </div>

        {/* Köpek Bilgileri */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300">Köpek Bilgileri</p>

          {[
            { label: "İsim", key: "name", placeholder: "Karabaş" },
            { label: "Cins", key: "breed", placeholder: "Golden Retriever" },
            { label: "Yaş", key: "age", placeholder: "3 yaşında" },
          ].map((f) => (
            <div key={f.key} className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-500">{f.label}</label>
              <input
                value={dog[f.key]}
                onChange={(e) => setDog({ ...dog, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Sağlık Bilgileri */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300">Sağlık</p>

          {[
            { label: "Aşılar (virgülle ayır)", key: "vaccines", placeholder: "Karma Aşı, Kuduz" },
            { label: "Alerjiler", key: "allergies", placeholder: "Tavuk eti" },
            { label: "Veteriner", key: "vet", placeholder: "Dr. Ahmet — 0212 555 00 11" },
          ].map((f) => (
            <div key={f.key} className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-500">{f.label}</label>
              <input
                value={dog[f.key]}
                onChange={(e) => setDog({ ...dog, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Sahip Bilgileri */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300">Sahip Bilgileri</p>

          {[
            { label: "Adın", key: "ownerName", placeholder: "Duygu Yeşiloğlu" },
            { label: "Telefon", key: "ownerPhone", placeholder: "+90 555 123 45 67" },
          ].map((f) => (
            <div key={f.key} className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-500">{f.label}</label>
              <input
                value={dog[f.key]}
                onChange={(e) => setDog({ ...dog, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Kaydet Butonu */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-stone-900 text-white py-4 rounded-2xl font-medium hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Kaydediliyor..." : saved ? "Kaydedildi ✓" : "Kaydet"}
        </button>

      </div>
    </div>
  );
}