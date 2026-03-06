import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-stone-900 flex items-center justify-center mx-auto mb-4">
            <span className="text-xl">🐾</span>
          </div>
          <h1 className="font-display text-3xl font-light text-stone-900 tracking-tight">
            {isLogin ? "Tekrar hoş geldin" : "Hesap oluştur"}
          </h1>
          <p className="text-stone-400 font-light text-sm mt-2">
            {isLogin ? "Devam etmek için giriş yap" : "Köpeğini korumaya başla"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-stone-500 tracking-wide">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@mail.com"
              className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-stone-500 tracking-wide">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
            />
          </div>

          {/* Hata mesajı */}
          {error && (
            <p className="text-red-400 text-xs font-light bg-red-50 px-4 py-3 rounded-xl">
              {error}
            </p>
          )}

          {/* Buton */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-stone-900 text-white py-3 rounded-xl font-medium text-sm hover:bg-stone-700 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? "Yükleniyor..." : isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>

        </div>

        {/* Geçiş */}
        <p className="text-center text-stone-400 text-sm font-light mt-6">
          {isLogin ? "Hesabın yok mu?" : "Zaten hesabın var mı?"}{" "}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            className="text-stone-700 font-medium hover:underline"
          >
            {isLogin ? "Kayıt ol" : "Giriş yap"}
          </button>
        </p>

      </div>
    </div>
  );
}
