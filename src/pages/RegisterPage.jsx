import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/ui/Input";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🛡️ KRİTİK ADIM: Künyeyi kullanıcıya bağla
      // merge: true sayesinde adminin daha önce girdiği veriler silinmez
      const petId = code || `USER-${user.uid.substring(0, 5)}`;
      
      await setDoc(doc(db, "pets", petId), {
        ownerId: user.uid,
        activated: true,
        updatedAt: new Date().toISOString(),
        isLost: false
      }, { merge: true });

      navigate("/dashboard");
    } catch (err) {
      // Firebase hata mesajlarını daha samimi hale getirelim
      const message = err.code === "auth/email-already-in-use" 
        ? "bu e-posta zaten kullanımda." 
        : err.message;
      setError(message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title={code ? "Künyeni Sahiplen" : "PawTag'e Katıl"} 
      subtitle={code ? `${code} kodlu künyen bu hesaba bağlanacak.` : "Dostunu korumaya başlamak için ilk adımı at."}
    >
      <div className="flex flex-col gap-4">
        {code && (
          <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-3 mb-2">
            <div className="bg-green-600 p-2 rounded-xl text-white">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-green-600 tracking-widest">Aktivasyon Kodu</p>
              <p className="text-sm font-bold text-stone-700">{code}</p>
            </div>
          </div>
        )}

        <Input 
          label="E-posta" 
          type="email" 
          placeholder="merhaba@ornek.com"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <Input 
          label="Şifre" 
          type="password" 
          placeholder="••••••••"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        {error && (
          <div className="text-red-500 text-xs bg-red-50 p-4 rounded-2xl border border-red-100 animate-shake">
             ⚠️ {error}
          </div>
        )}

        <button 
          onClick={handleRegister} 
          disabled={loading} 
          className="bg-stone-900 text-white py-5 rounded-[2rem] font-bold text-sm hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 mt-4 shadow-xl shadow-stone-200 flex items-center justify-center gap-2"
        >
          {loading ? "Hesabın Hazırlanıyor..." : "Hesabı Oluştur ve Başla"}
          {!loading && <Sparkles size={16} className="text-yellow-400" />}
        </button>

        <p className="text-center text-stone-400 text-xs font-medium mt-6 uppercase tracking-widest">
          Zaten üye misin?  
          <Link to="/login" className="text-green-600 font-black ml-2 hover:underline">Giriş Yap</Link>
        </p>
      </div>
    </AuthLayout>
  );
}