import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/ui/Input";
import { LogIn, Send } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      const message = err.code === "auth/user-not-found" ? "Kullanıcı bulunamadı." : 
                     err.code === "auth/wrong-password" ? "Hatalı şifre." : "Giriş yapılamadı.";
      setError(message); 
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google giriş hatası:", error);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Şifre sıfırlama linki için önce e-posta girin.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Şifre sıfırlama maili gönderildi!");
    } catch (err) {
      setError("Sıfırlama maili gönderilemedi.");
    }
  };

  return (
    <AuthLayout subtitle="Dostunun dünyasına kaldığın yerden devam et">
      <div className="flex flex-col gap-4">
        
        <Input 
          label="E-posta" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="merhaba@pawtag.com" 
        />
        
        <div className="relative">
          <Input 
            label="Şifre" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
          />
          <button 
            onClick={handleResetPassword}
            className="absolute right-0 top-0 text-[10px] font-black uppercase tracking-widest text-green-600 hover:text-green-700 transition-colors"
          >
            Şifremi Unuttum
          </button>
        </div>
        
        {error && (
          <div className="text-red-500 text-xs bg-red-50 p-4 rounded-2xl border border-red-100">
             ⚠️ {error}
          </div>
        )}

        <button 
          onClick={handleLogin} 
          disabled={loading} 
         className="bg-[#559632] text-white py-5 rounded-[2rem] font-bold text-sm hover:bg-[#4a832b] transition-all active:scale-[0.95] disabled:opacity-50 mt-4 shadow-xl shadow-[#559632]/20 flex items-center justify-center gap-2"
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          {!loading && <LogIn size={18} />}
        </button>

        {/* Ayırıcı Çizgi */}
        <div className="flex items-center gap-4 my-2">
          <div className="h-px bg-stone-100 flex-grow"></div>
          <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">veya</span>
          <div className="h-px bg-stone-100 flex-grow"></div>
        </div>

        {/* Google Giriş Butonu */}
        <button 
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white border border-stone-200 py-4 rounded-2xl font-bold text-stone-700 hover:bg-stone-50 transition-all shadow-sm active:scale-[0.98]"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
          Google ile Devam Et
        </button>

        <p className="text-center text-stone-400 text-xs font-medium mt-6 uppercase tracking-widest">
          Hesabın yok mu? 
          <Link to="/register" className="text-green-600 font-black ml-2 hover:underline">Kayıt Ol</Link>
        </p>
      </div>
    </AuthLayout>
  );
}