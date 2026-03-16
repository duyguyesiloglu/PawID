import { useEffect, useState, useCallback } from "react"; // useCallback ekledik
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import AdminStats from "../components/admin/AdminStats";
import CodeGenerator from "../components/admin/CodeGenerator";
import PetList from "../components/admin/PetList";
import Loading from "../components/ui/Loading";

const ADMIN_EMAIL = "duyguyess7@gmail.com";

export default function AdminPage() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [copied, setCopied] = useState("");
  const [mailSent, setMailSent] = useState({});

  // 1. Önce fonksiyonu tanımlıyoruz (Kırmızılığı önlemek için yukarı taşıdık)
  const fetchPets = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "pets"));
      setPets(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Sonra useEffect içinde kullanıyoruz
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== ADMIN_EMAIL) {
        setAuthError(true);
        setLoading(false);
        if (!user) navigate("/login");
      } else {
        fetchPets();
      }
    });
    return () => unsubscribe();
  }, [navigate, fetchPets]); // Bağımlılıklara ekledik

  const handleGenerate = async () => {
    const code = `PAW-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    await setDoc(doc(db, "pets", code), {
      activated: false,
      customerEmail,
      createdAt: new Date().toISOString(),
      isLost: false
    });
    setNewCode(code);
    fetchPets(); // Kod üretince listeyi tazele
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(`https://pawtag-tr.com/activate/${id}`);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleMailto = (code, email) => {
    const activationLink = `https://pawtag-tr.com/activate/${code}`;
    const subject = encodeURIComponent("PawTag Künyeniz Hazır! 🐾");
    const body = encodeURIComponent(
      `Merhaba,\n\nPawTag siparişiniz hazırlandı! Künyenizi aktif etmek için aşağıdaki bağlantıya tıklayarak dostunuzun profilini oluşturabilirsiniz:\n\n👉 ${activationLink}\n\nSevgiler,\nPawTag Ekibi`
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    setMailSent((prev) => ({ ...prev, [code]: true }));
  };

  if (loading) return <Loading />;
  if (authError) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-10 text-center">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <p className="text-3xl mb-4">🔒</p>
        <p className="text-gray-900 font-medium">Erişim Yetkiniz Yok</p>
        <p className="text-gray-400 text-sm mt-1">Bu sayfa sadece yönetici erişimine açıktır.</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-16 font-sans">
      <div className="max-w-2xl mx-auto px-6 pt-12">
        <header className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 tracking-tight">Admin Paneli</h1>
          <p className="text-gray-400 text-sm mt-1">Sistem Genel Özeti</p>
        </header>
        
        <AdminStats 
          total={pets.length} 
          active={pets.filter(p => p.name).length} 
          lost={pets.filter(p => p.isLost).length} 
        />

        <CodeGenerator 
          customerEmail={customerEmail}
          setCustomerEmail={setCustomerEmail}
          handleGenerate={handleGenerate}
          newCode={newCode}
          handleCopy={handleCopy}
          copied={copied}
          mailSent={mailSent}
          handleMailto={handleMailto} 
        />

        <PetList 
          pets={pets} 
          copied={copied} 
          handleCopy={handleCopy} 
          handleMailto={handleMailto} 
        />
      </div>
    </div>
  );
}