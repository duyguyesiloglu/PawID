import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F8F9F4] pt-20 pb-12 px-6 border-t border-stone-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Sütun: Marka Hikayesi */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[#559632] text-3xl font-serif italic tracking-tight">PawTag</h2>
            <p className="text-stone-500 text-sm leading-relaxed font-medium">
              İki kadın hayvansever mühendisten, kayıp dostlarımızı yuvalarına ulaştıran en ekonomik dokunuş. Güvenlik her dostumuzun hakkı. 🐾
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Twitter, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "https://instagram.com/thebarnieclub" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-10 h-10 rounded-full bg-white border border-stone-100 flex items-center justify-center text-[#559632] hover:bg-[#559632] hover:text-white transition-all shadow-sm">
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Sütun: Keşfet */}
          <div className="flex flex-col gap-6 lg:ml-12">
            <h3 className="text-stone-800 text-xs font-black uppercase tracking-[0.2em]">Keşfet</h3>
            <ul className="flex flex-col gap-3 text-stone-500 text-sm font-medium">
              <li className="hover:text-[#559632] cursor-pointer transition-colors">Ana Sayfa</li>
              <li className="hover:text-[#559632] cursor-pointer transition-colors">Hikayemiz</li>
              <li className="hover:text-[#559632] cursor-pointer transition-colors">Künyeler</li>
              <li className="hover:text-[#559632] cursor-pointer transition-colors">Sıkça Sorulanlar</li>
            </ul>
          </div>

          {/* 3. Sütun: Bize Ulaşın (Yeni Sütun) */}
          <div className="flex flex-col gap-6">
            <h3 className="text-stone-800 text-xs font-black uppercase tracking-[0.2em]">Bize Ulaşın</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-stone-500 text-sm">
                <div className="w-8 h-8 rounded-full bg-white border border-stone-100 flex items-center justify-center text-[#559632] shrink-0">
                  <Mail size={14} />
                </div>
                <a href="mailto:info@pawtag.com" className="hover:text-[#559632] transition-colors">info@pawtag.com</a>
              </li>
              <li className="flex items-start gap-3 text-stone-500 text-sm">
                <div className="w-8 h-8 rounded-full bg-white border border-stone-100 flex items-center justify-center text-[#559632] shrink-0 mt-0.5">
                  <MapPin size={14} />
                </div>
                <span>Ankara, Türkiye <br /> <span className="text-[10px] text-stone-400">Atölye ve Ofis</span></span>
              </li>
            </ul>
          </div>

          {/* 4. Sütun: Instagram */}
          <div className="flex flex-col gap-6">
            <h3 className="text-stone-800 text-xs font-black uppercase tracking-[0.2em]">
              Instagram <span className="text-[#559632] lowercase font-normal">@pawtag-tr</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="aspect-square rounded-xl overflow-hidden bg-stone-200 border border-white shadow-sm group">
                  <img 
                    src={`/ig${num}.png`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={`Instagram ${num}`} 
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Alt Bilgi */}
        <div className="pt-8 border-t border-stone-200/60 text-center">
          <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.4em]">
            © 2026 PawTag Akıllı NFC Evcil Hayvan Künyesi • Tüm hakları saklıdır
          </p>
        </div>
      </div>
    </footer>
  );
}