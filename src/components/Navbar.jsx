import { useState } from "react";
import { Menu, X, PawPrint } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımızda", href: "/about" },
    { label: "Nasıl Çalışır?", href: "/#how" },
    { label: "İletişim", href: "/contact" },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      {/* Navbar Gövdesi: Cam efekti artırılmış ve köşeler daha yumuşak */}
      <nav className="w-full max-w-5xl rounded-[32px] border border-white/40 bg-white/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(85,150,50,0.05)] px-6 py-3.5 transition-all duration-500">
        
        <div className="flex items-center justify-between">
          
          {/* Logo Alanı: Daha minimal ve şık */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Arkadaki hareketli yeşil halka */}
              <div className="absolute inset-0 bg-[#559632] opacity-20 rounded-2xl rotate-6 group-hover:rotate-45 transition-transform duration-500"></div>
              {/* Ana İkon Kutusu */}
              <div className="relative w-10 h-10 rounded-2xl bg-[#559632] flex items-center justify-center shadow-lg shadow-[#559632]/20 group-hover:-rotate-12 transition-transform duration-500">
                <PawPrint size={20} className="text-white fill-current" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-stone-800 tracking-tight leading-none">
                Paw<span className="text-[#559632]">Tag</span>
              </span>
              <span className="text-[9px] font-black tracking-[0.3em] text-[#559632]/50 uppercase mt-1">
                Güvende
              </span>
            </div>
          </a>

          {/* Masaüstü Linkler: Daha ferah aralıklar */}
          <ul className="hidden md:flex items-center gap-3 list-none m-0 p-0">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-semibold text-stone-500 px-5 py-2.5 rounded-full hover:text-[#559632] hover:bg-[#559632]/5 transition-all duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="ml-4">
              <a
                href="/dashboard"
                className="text-sm font-bold text-white px-7 py-3 rounded-full bg-[#559632] hover:bg-[#457a29] shadow-[0_10px_20px_rgba(85,150,50,0.2)] hover:shadow-[0_12px_25px_rgba(85,150,50,0.3)] transition-all duration-300 flex items-center gap-2 group/btn"
              >
                Giriş Yap
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </li>
          </ul>

          {/* Mobil Menü Butonu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-2xl text-stone-500 hover:bg-stone-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobil Menü: Chill bir slide-down efekti */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-2 border-t border-stone-100 pt-5 pb-3 animate-in fade-in slide-in-from-top-5 duration-500">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-stone-600 px-5 py-3 rounded-2xl hover:bg-[#559632]/5 hover:text-[#559632] transition-all"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-white text-center px-5 py-4 rounded-[20px] bg-[#559632] mt-4 shadow-lg shadow-[#559632]/10"
            >
              Hemen Başla →
            </a>
          </div>
        )}

      </nav>
    </div>
  );
}