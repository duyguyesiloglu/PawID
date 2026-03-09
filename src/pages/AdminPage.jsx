import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Plus, Copy, AlertTriangle, CheckCircle, User } from "lucide-react";

// ⚠️ Buraya kendi e-posta adresini yaz
const ADMIN_EMAIL = "duyguyess7@gmail.com";

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "PAW-";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCode, setNewCode] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }
      console.log("Giriş yapan email:", currentUser.email);
      fetchDogs();
    });
    
    return () => unsubscribe();
  }, []);

  const fetchDogs = async () => {
    const snap = await getDocs(collection(db, "dogs"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setDogs(list);
    setLoading(false);
  };

  const handleGenerate = async () => {
    const code = generateCode();
    await setDoc(doc(db, "dogs", code), {
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
      ownerId: "",
      activated: false,
      createdAt: new Date().toISOString(),
    });
    setNewCode(code);
    fetchDogs();
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(`https://pawid.com/activate/${code}`);
    setCopied(code);
    setTimeout(() => setCopied(""), 2000);
  };

  const activated = dogs.filter((d) => d.name);
  const lost = dogs.filter((d) => d.isLost);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-400 font-light">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen font-sans pb-16">
      <div className="max-w-2xl mx-auto px-6 pt-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-light text-stone-900 tracking-tight">Admin Paneli</h1>
          <p className="text-stone-400 font-light text-sm mt-1">{auth.currentUser?.email}</p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Toplam Künye", value: dogs.length, color: "text-stone-900" },
            { label: "Aktif", value: activated.length, color: "text-green-500" },
            { label: "Kayıp", value: lost.length, color: "text-red-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-stone-200 rounded-2xl p-4 text-center shadow-sm">
              <p className={`text-2xl font-display font-light ${s.color}`}>{s.value}</p>
              <p className="text-stone-400 text-xs font-light mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Yeni Kod Üret */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-6 shadow-sm">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300 mb-4">Yeni Künye</p>
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-stone-700 transition-colors"
          >
            <Plus size={16} />
            Kod Üret
          </button>

          {newCode && (
            <div className="mt-4 bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-display text-lg text-stone-900">{newCode}</p>
                <p className="text-stone-400 text-xs font-light">pawid.com/activate/{newCode}</p>
              </div>
              <button
                onClick={() => handleCopy(newCode)}
                className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors"
              >
                <Copy size={14} />
                {copied === newCode ? "Kopyalandı ✓" : "Linki Kopyala"}
              </button>
            </div>
          )}
        </div>

        {/* Künye Listesi */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300 mb-4">
            Tüm Künyeler ({dogs.length})
          </p>
          <div className="flex flex-col">
            {dogs.map((dog) => (
              <div key={dog.id} className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
                <div className="flex items-center gap-3">
                  {dog.isLost ? (
                    <AlertTriangle size={16} className="text-red-400" />
                  ) : dog.name ? (
                    <CheckCircle size={16} className="text-green-400" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-stone-200" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-stone-800">{dog.id}</p>
                    {dog.name ? (
                      <p className="text-xs text-stone-400 font-light flex items-center gap-1">
                        <User size={10} />
                        {dog.name} · {dog.ownerName || "—"}
                      </p>
                    ) : (
                      <p className="text-xs text-stone-300 font-light">Henüz aktif değil</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(dog.id)}
                  className="text-xs text-stone-400 hover:text-stone-700 transition-colors"
                >
                  {copied === dog.id ? "Kopyalandı ✓" : "Linki Kopyala"}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}