import { useState } from "react";
import { ChevronRight, ChevronLeft, ShoppingBag, HelpCircle, Phone, Type, Palette, Check } from "lucide-react";

export default function ProductsPage() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    ringColor: "Gümüş",
    tagColor: "Beyaz", // Canlı değişim için eklendi
    size: "Orta",
    petName: "",
    phone: "",
    extraText: "",
    showExtra: false,
    font: "NaN Holo",
    fontColor: "Siyah",
  });

 const fonts = ["CHIVAS", "COOKIE", "PEANUT", "TEDDY"];

  // Künye Renkleri (Görseli boyayanlar)
  const tagColors = [
    { name: "Beyaz", hex: "#F1F1F1" },
    { name: "Kırmızı", hex: "#E11D48" },
    { name: "Mor", hex: "#7C3AED" },
    { name: "Mavi", hex: "#2563EB" },
    { name: "Sarı", hex: "#FACC15" },
    { name: "Yeşil", hex: "#16A34A" },
    { name: "Siyah", hex: "#1C1917" },
  ];

  const ringColors = ["Gümüş", "Altın", "Pembe", "Sarı", "Kırmızı", "Turuncu", "Mor"];

  const fontColors = [
    { name: "Beyaz", hex: "#FFFFFF", class: "bg-white border-stone-200" },
    { name: "Siyah", hex: "#1C1917", class: "bg-stone-900" },
    { name: "Altın", hex: "#D4AF37", class: "bg-yellow-600" },
    { name: "Pembe", hex: "#ed429d", class: "bg-pink-500" },
  ];

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleCheckout = () => {
    const orderDetails = `İsim: ${config.petName} | Tel: ${config.phone} | Künye: ${config.tagColor} | Halka: ${config.ringColor} | Font: ${config.font}`;
    window.location.href = `https://www.shopier.com/SiparisLinkin?not=${encodeURIComponent(orderDetails)}`;
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr,minmax(auto,500px)] gap-16 items-start">
        
        {/* ── SOL: CANLI KEMİK ÖNİZLEME ── */}
        <div className="lg:sticky lg:top-40 flex flex-col items-center">
          <p className="text-[10px] tracking-[0.3em] text-stone-300 uppercase mb-8">Premium Kemik Künye</p>
          
          <div className="relative w-full max-w-xl aspect-[2/1] flex items-center justify-center">
            
            {/* 1. KATMAN: KÜNYE RENGİ (Maskeleme ile boyanan alan) */}
            <div 
              className="absolute inset-0 transition-all duration-500"
              style={{ 
                backgroundColor: tagColors.find(c => c.name === config.tagColor)?.hex,
                maskImage: 'url("/image_2.png")',
                WebkitMaskImage: 'url("/image_2.png")',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center'
              }}
            />

            {/* 2. KATMAN: ORİJİNAL DOKU (Gölgeler için düşük opaklık) */}
            <img 
              src="/image_2.png"
              alt="Kemik Künye" 
              className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none mix-blend-multiply"
            />
            
            {/* 3. KATMAN: YAZI (Sadece İsim) */}
            <div className="relative z-10 text-center px-16 w-full">
               <h2 
                 className="text-5xl md:text-5xl font-bold break-words leading-none transition-all duration-300"
                 style={{ 
                   fontFamily: config.font, 
                   color: fontColors.find(c => c.name === config.fontColor)?.hex 
                 }}
               >
                  {config.petName || "LUNA"}
               </h2>
            </div>
          </div>
          
          <div className="mt-12 flex gap-3">
             <div className="px-5 py-2.5 bg-white border border-stone-100 rounded-full text-[10px] font-bold text-stone-400 uppercase tracking-widest">
               Halka: {config.ringColor}
             </div>
             <div className="px-5 py-2.5 bg-white border border-stone-100 rounded-full text-[10px] font-bold text-stone-400 uppercase tracking-widest">
               Künye: {config.tagColor}
             </div>
          </div>
        </div>

        {/* ── SAĞ: ADIM ADIM FORM ── */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-10">
          
          <div className="flex gap-2 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${step >= i ? 'bg-[#559632]' : 'bg-stone-100'}`} />
            ))}
          </div>

          {/* ADIM 1: HALKA VE KÜNYE RENGİ */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-10">
              <div>
                <h3 className="text-2xl font-bold text-stone-800 mb-2">Renk Seçimi</h3>
                <p className="text-stone-400 mb-8 text-sm">Halka ve künye rengini kombinleyin.</p>
                
                <label className="text-xs text-stone-400 font-bold mb-4 block uppercase tracking-wider">1) Halka Rengi</label>
                <div className="flex flex-wrap gap-2 mb-8">
                  {ringColors.map(r => (
                    <button key={r} onClick={() => setConfig({...config, ringColor: r})}
                      className={`px-4 py-2 rounded-xl border-2 text-xs font-bold transition-all ${config.ringColor === r ? 'border-[#559632] bg-green-50 text-[#559632]' : 'border-stone-50 text-stone-400'}`}>
                      {r}
                    </button>
                  ))}
                </div>

                <label className="text-xs text-stone-400 font-bold mb-4 block uppercase tracking-wider">2) Künye Rengi (Canlı Değişir)</label>
                <div className="flex flex-wrap gap-3">
                  {tagColors.map(c => (
                    <button key={c.name} onClick={() => setConfig({...config, tagColor: c.name})}
                      className={`w-10 h-10 rounded-full border-4 transition-all shadow-sm ${config.tagColor === c.name ? 'border-[#559632] scale-110' : 'border-white'}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ADIM 2: İSİM VE TELEFON */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-8">
              <h3 className="text-2xl font-bold text-stone-800">Künye Bilgileri</h3>
              <input 
                placeholder="Örn: LUNA"
                className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-5 outline-none focus:ring-2 ring-[#559632]/20 font-bold text-lg"
                value={config.petName}
                onChange={(e) => setConfig({...config, petName: e.target.value.toUpperCase()})}
              />
              <div className="relative">
                <Phone size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300" />
                <input 
                  placeholder="0555 123 45 67"
                  className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-16 pr-6 py-5 outline-none focus:ring-2 ring-[#559632]/20 font-mono"
                  value={config.phone}
                  onChange={(e) => setConfig({...config, phone: e.target.value})}
                />
              </div>
            </div>
          )}

          {/* ADIM 3: FONT VE YAZI RENGİ */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-10">
              <h3 className="text-2xl font-bold text-stone-800">Tasarım Detayları</h3>
              <div>
                <label className="text-xs text-stone-400 font-bold mb-5 block uppercase tracking-wider">Font Seçimi</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {fonts.map(f => (
                    <button key={f} onClick={() => setConfig({...config, font: f})}
                      className={`py-3 rounded-xl border-2 text-[10px] font-bold transition-all ${config.font === f ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 text-stone-400 border-transparent'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-stone-400 font-bold mb-5 block uppercase tracking-wider">Yazı Rengi</label>
                <div className="flex gap-4">
                  {fontColors.map(c => (
                    <button key={c.name} onClick={() => setConfig({...config, fontColor: c.name})}
                      className={`w-12 h-12 rounded-full border-4 transition-all ${c.class} ${config.fontColor === c.name ? 'border-[#559632] scale-110 shadow-lg' : 'border-transparent'}`} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ADIM 4: SATIN AL */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-10 text-center">
              <h3 className="text-2xl font-bold text-stone-800">Hazırız!</h3>
              <div className="bg-stone-50 rounded-3xl p-8 space-y-3 text-left">
                <div className="flex justify-between text-sm"><span className="text-stone-400">İsim:</span> <span className="font-bold">{config.petName}</span></div>
                <div className="flex justify-between text-sm"><span className="text-stone-400">Künye Rengi:</span> <span className="font-bold">{config.tagColor}</span></div>
                <div className="flex justify-between text-sm"><span className="text-stone-400">Halka Rengi:</span> <span className="font-bold">{config.ringColor}</span></div>
              </div>
              <button onClick={handleCheckout}
                className="w-full bg-[#559632] text-white py-6 rounded-2xl font-bold text-xl shadow-2xl shadow-[#559632]/30 hover:bg-[#457a29] transition-all flex items-center justify-center gap-4">
                <ShoppingBag size={24} /> Satın Al
              </button>
            </div>
          )}

          {/* Navigasyon Butonları */}
          <div className="flex justify-between mt-16 pt-10 border-t border-stone-50">
            {step > 1 ? (
              <button onClick={prevStep} className="flex items-center gap-2.5 text-stone-400 font-semibold hover:text-stone-800">
                <ChevronLeft size={22} /> Geri Dön
              </button>
            ) : <div />}
            
            {step < 4 && (
              <button onClick={nextStep} className="flex items-center gap-2.5 bg-stone-900 text-white px-9 py-4 rounded-xl font-semibold hover:bg-stone-700 active:scale-95 transition-all">
                Devam Et <ChevronRight size={22} />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}