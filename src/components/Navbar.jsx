import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, PawPrint, User, LogOut, ChevronDown } from "lucide-react";
import { auth } from "../firebase"; // Firebase yolunu kontrol et
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  // Firebase Auth Takibi
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const hiddenRoutes = ["/dashboard", "/admin"];
  const isDogPage = location.pathname.startsWith("/pet/");
  const isActivatePage = location.pathname.startsWith("/activate/");

  if (hiddenRoutes.includes(location.pathname) || isDogPage || isActivatePage) return null;

  const links = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Ürünler", href: "/products" },
    { label: "Hakkımızda", href: "/about" },
    { label: "İletişim", href: "/contact" },
  ];

  const handleLogout = () => {
    signOut(auth);
    setIsProfileOpen(false);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 font-sans">
      <nav className="w-full max-w-5xl rounded-[32px] border border-white/40 bg-white/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(85,150,50,0.05)] px-6 py-3.5 transition-all duration-500">
        
        <div className="flex items-center justify-between">
          
          {/* Logo Alanı */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#559632] opacity-20 rounded-2xl rotate-6 group-hover:rotate-45 transition-transform duration-500"></div>
              <div className="relative w-10 h-10 rounded-2xl bg-[#559632] flex items-center justify-center shadow-lg shadow-[#559632]/20">
                <PawPrint size={20} className="text-white fill-current" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-xl text-stone-800 tracking-tight leading-none">
                Paw<span className="text-[#559632]">Tag</span>
              </span>
              <span className="text-[9px] font-black tracking-[0.3em] text-[#559632]/50 uppercase mt-1">Güvende</span>
            </div>
          </Link>

          {/* Masaüstü Menü */}
          <ul className="hidden md:flex items-center gap-3 list-none m-0 p-0">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-sm font-semibold text-stone-500 px-5 py-2.5 rounded-full hover:text-[#559632] hover:bg-[#559632]/5 transition-all duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            
            <li className="ml-4 relative">
              {user ? (
                /* Giriş Yapılmışsa: Profil Menüsü */
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 bg-white/80 border border-stone-200 pl-3 pr-4 py-2 rounded-full hover:border-[#559632]/30 transition-all shadow-sm group"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#559632] flex items-center justify-center text-white shadow-md shadow-[#559632]/20">
                      <User size={14} />
                    </div>
                    <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">Hesabım</span>
                    <ChevronDown size={14} className={`text-stone-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 top-14 w-56 bg-white border border-stone-100 rounded-3xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-stone-600 hover:bg-[#559632]/5 hover:text-[#559632] rounded-2xl transition-all"
                      >
                        <PawPrint size={18} />
                        Evcil Hayvanlarım
                      </Link>
                      <div className="h-px bg-stone-50 my-1 mx-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                      >
                        <LogOut size={18} />
                        Çıkış Yap
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Giriş Yapılmamışsa: Standart Buton */
                <Link
                  to="/login"
                  className="text-sm font-bold text-white px-7 py-3 rounded-full bg-[#559632] hover:bg-[#457a29] shadow-lg transition-all duration-300 block"
                >
                  Giriş Yap →
                </Link>
              )}
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

        {/* Mobil Menü İçeriği */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-2 border-t border-stone-100 pt-5 pb-3 animate-in fade-in slide-in-from-top-5 duration-500 text-left">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-stone-600 px-5 py-3 rounded-2xl hover:bg-[#559632]/5 hover:text-[#559632] transition-all"
              >
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-stone-600 px-5 py-3 rounded-2xl hover:bg-[#559632]/5 hover:text-[#559632] transition-all flex items-center gap-3"
                >
                  <PawPrint size={20} /> Evcil Hayvanlarım
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-lg font-bold text-red-500 px-5 py-4 rounded-[20px] bg-red-50 mt-2 text-left flex items-center gap-3"
                >
                  <LogOut size={20} /> Çıkış Yap
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-white text-center px-5 py-4 rounded-[20px] bg-[#559632] mt-4"
              >
                Giriş Yap →
              </Link>
            )}
          </div>
        )}

      </nav>
    </div>
  );
}