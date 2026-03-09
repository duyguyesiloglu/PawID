import { useState } from "react";
import { Mail, Instagram, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    // Şimdilik sadece görsel feedback
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans pt-28 pb-16">
      <div className="max-w-lg mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300 mb-3">İletişim</p>
          <h1 className="font-display text-4xl font-light text-stone-900 tracking-tight leading-tight mb-4">
            Merhaba, <br />
            <span className="italic">nasıl yardımcı olabiliriz?</span>
          </h1>
          <p className="text-stone-500 font-light text-sm leading-relaxed">
            Ürün hakkında sorunuz mu var? Bize ulaşın, en kısa sürede dönelim.
          </p>
        </div>

        {/* İletişim Kanalları */}
        <div className="flex flex-col gap-3 mb-6">
          <a
            href="mailto:info@pawtag-tr.com"
            className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:border-stone-400 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
              <Mail size={18} className="text-stone-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-stone-800">E-posta</p>
              <p className="text-xs text-stone-400 font-light">info@pawtag-tr.com</p>
            </div>
          </a>

          <a
            href="https://instagram.com/pawtag-tr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:border-stone-400 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
              <Instagram size={18} className="text-stone-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-stone-800">Instagram</p>
              <p className="text-xs text-stone-400 font-light">@pawtag-tr</p>
            </div>
          </a>
        </div>

        {/* Form */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300">Mesaj Gönder</p>

          {[
            { label: "Adın", key: "name", placeholder: "" },
            { label: "E-posta", key: "email", placeholder: "user@email.com" },
          ].map((f) => (
            <div key={f.key} className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-500">{f.label}</label>
              <input
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
              />
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-stone-500">Mesajın</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Merhaba, ürününüz hakkında..."
              rows={4}
              className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 bg-stone-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            <Send size={15} />
            {sent ? "Gönderildi ✓" : "Gönder"}
          </button>
        </div>

      </div>
    </div>
  );
}
