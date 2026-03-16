export default function EmergencyBanner() {
  return (
    <div className="mt-20 bg-[#559632]/5 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-[#559632]/10">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm">
        <span className="text-3xl animate-pulse">🆘</span>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h4 className="text-xl font-bold text-stone-800 mb-2">Acil Durum: Kayıp Alarmı</h4>
        <p className="text-sm text-stone-500 font-light leading-relaxed">
          Ona ulaşamadığınız an panelden <span className="font-bold text-red-500 uppercase">Kayıp</span> butonuna basmanız yeterlidir. 
          Bu modda künye tarandığında, bulucuya dostunuzun özel ihtiyaçları ve en yakın veterinerin adresi sunulur.
        </p>
      </div>
      <a href="/dashboard" className="bg-[#559632] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#457a29] transition-all active:scale-95">
        Hemen Başla
      </a>
    </div>
  );
}