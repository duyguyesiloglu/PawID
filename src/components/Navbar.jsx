import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/about" },
  { label: "Nasıl Çalışır?", href: "/#how" },
  { label: "İletişim", href: "/contact" },
];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-3xl rounded-2xl border border-stone-200 bg-white/80 backdrop-blur-xl shadow-sm px-5 py-3">

        {/* Üst satır */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center">
              <span className="text-white text-sm">🐾</span>
            </div>
            <span className="font-display font-light text-lg text-stone-900 tracking-tight">
              Paw<span className="italic text-blue-400">ID</span>
            </span>
          </a>

          {/* Desktop Linkler */}
          <ul className="hidden sm:flex items-center gap-1 list-none m-0 p-0">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-light text-stone-500 px-3 py-1.5 rounded-xl hover:text-stone-900 hover:bg-stone-100 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/dashboard"
                className="text-sm font-medium text-white px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-700 transition-colors ml-2"
              >
                Başla →
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-1.5 rounded-xl text-stone-500 hover:bg-stone-100 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobil Menü */}
        {isOpen && (
          <div className="sm:hidden mt-3 flex flex-col gap-1 border-t border-stone-100 pt-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-light text-stone-600 px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-white text-center px-4 py-2 rounded-xl bg-stone-900 mt-1"
            >
              Başla →
            </a>
          </div>
        )}

      </nav>
    </div>
  );
}