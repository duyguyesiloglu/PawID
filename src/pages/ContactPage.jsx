import { useState } from "react";
import { Mail, Instagram, Send } from "lucide-react"; 
import Input from "../components/ui/Input";
import ContactMethod from "../components/contact/ContactMethod";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-stone-50 min-h-screen pt-28 pb-16">
      <div className="max-w-lg mx-auto px-6">
        
        {/* Header */}
        <header className="mb-10">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300 mb-3">İletişim</p>
          <h1 className="text-4xl font-light text-stone-900 tracking-tight leading-tight mb-4">
            Merhaba, <br />
            <span className="italic">nasıl yardımcı olabiliriz?</span>
          </h1>
        </header>

        {/* İletişim Kanalları */}
        <div className="flex flex-col gap-3 mb-6">
          <ContactMethod 
            href="mailto:info@pawtag-tr.com" 
            icon={Mail} 
            title="E-posta" 
            value="info@pawtag-tr.com" 
          />
          <ContactMethod 
            href="https://instagram.com/pawtag-tr" 
            icon={Instagram} 
            title="Instagram" 
            value="@pawtag-tr" 
          />
        </div>

        {/* Form */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300">Mesaj Gönder</p>
          
          <Input 
            label="Adın" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
          />
          <Input 
            label="E-posta" 
            name="email" 
            type="email" 
            value={form.email} 
            onChange={handleChange} 
            placeholder="user@email.com" 
          />
          <Input 
            label="Mesajın" 
            name="message" 
            isTextArea 
            value={form.message} 
            onChange={handleChange} 
            placeholder="Merhaba, ürününüz hakkında..." 
          />

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