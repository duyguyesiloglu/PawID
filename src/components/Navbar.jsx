import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Profil", href: "/profile" },
    { label: "Nasıl Çalışır?", href: "/how-it-works" },
    { label: "İletişim", href: "/contact" },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-3xl rounded-2xl border border-white/40 bg-white/20 backdrop-blur-xl shadow-lg px-5 py-3">

        {/* Üst satır: Logo + Linkler + Hamburger */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">🐾</span>
            </div>
            <span className="font-bold text-lg text-slate-800 tracking-tight">
              Paw<span className="text-blue-500">ID</span>
            </span>
          </a>

          {/* Desktop Linkler */}
          <ul className="hidden sm:flex items-center gap-1 list-none">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-700 px-3 py-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-500 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/scan"
                className="text-sm font-semibold text-white px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-400 to-teal-400 shadow-md hover:opacity-90 transition-opacity"
              >
                NFC Tara 📱
              </a>
            </li>
          </ul>

          {/* Hamburger (mobil) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-1.5 rounded-xl text-slate-700 hover:bg-blue-50 transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobil Menü */}
        {isOpen && (
          <div className="sm:hidden mt-3 flex flex-col gap-1 border-t border-white/40 pt-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-slate-700 px-3 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/scan"
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-white text-center px-4 py-2 rounded-xl bg-gradient-to-r from-blue-400 to-teal-400 shadow-md mt-1"
            >
              📱 NFC Tara
            </a>
          </div>
        )}

      </nav>
    </div>
  );
}
