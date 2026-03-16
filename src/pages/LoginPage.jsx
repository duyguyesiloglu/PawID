import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/ui/Input"; // Daha önce yaptığımız Input

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Tekrar hoş geldin" subtitle="Devam etmek için giriş yap">
      <Input label="E-posta" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@mail.com" />
      <Input label="Şifre" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
      
      {error && <p className="text-red-400 text-xs font-light bg-red-50 p-3 rounded-xl">{error}</p>}

      <button onClick={handleLogin} disabled={loading} className="bg-stone-900 text-white py-4 rounded-2xl font-medium text-sm hover:bg-stone-700 transition-all active:scale-95 disabled:opacity-50 mt-2">
        {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>

      <p className="text-center text-stone-400 text-sm font-light mt-4">
        Hesabın yok mu? <Link to="/register" className="text-stone-900 font-medium hover:underline">Kayıt ol</Link>
      </p>
    </AuthLayout>
  );
}