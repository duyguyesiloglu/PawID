import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/ui/Input";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const petId = code || user.uid;

      await setDoc(doc(db, "pets", petId), {
        ownerId: user.uid,
        activated: !!code, // Eğer kod varsa aktif edilmiş sayılır
        createdAt: new Date().toISOString(),
        isLost: false
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Hesap oluştur" subtitle={code ? `Künye kodu: ${code}` : "Dostunu korumaya başla"}>
      <Input label="E-posta" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Şifre" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {error && <p className="text-red-400 text-xs bg-red-50 p-3 rounded-xl">{error}</p>}

      <button onClick={handleRegister} disabled={loading} className="bg-stone-900 text-white py-4 rounded-2xl font-medium text-sm hover:bg-stone-700 transition-all active:scale-95 disabled:opacity-50 mt-2">
        {loading ? "Hesap açılıyor..." : "Kaydı Tamamla →"}
      </button>

      <p className="text-center text-stone-400 text-sm font-light mt-4">
        Zaten üye misin? <Link to="/login" className="text-stone-700 font-medium hover:underline">Giriş yap</Link>
      </p>
    </AuthLayout>
  );
}