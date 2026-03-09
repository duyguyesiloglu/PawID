export default function AboutPage() {
  return (
    <div className="bg-stone-50 min-h-screen font-sans pt-28 pb-16">
      <div className="max-w-lg mx-auto px-6">

        {/* Hero */}
        <div className="mb-12">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300 mb-3">Hakkımızda</p>
          <h1 className="font-display text-4xl font-light text-stone-900 tracking-tight leading-tight mb-4">
            Her tüylü dostun<br />
            <span className="italic">bir kimliği olmalı.</span>
          </h1>
          <p className="text-stone-500 font-light text-base leading-relaxed">
            PawID, köpeklerin kaybolması durumunda sahiplerine anında ulaşılabilmesi için tasarlanmış akıllı bir NFC künye sistemidir.
          </p>
        </div>

        {/* Hikaye */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm mb-4">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300 mb-4">Hikayemiz</p>
          <p className="text-stone-600 font-light text-sm leading-relaxed mb-3">
            Bir köpeğin kaybolması, hem hayvan hem de sahibi için son derece stresli bir deneyimdir. Geleneksel künye yöntemleri çoğu zaman yetersiz kalır — yazılar silinir, bilgiler güncel olmaz, iletişim kurulamaz.
          </p>
          <p className="text-stone-600 font-light text-sm leading-relaxed">
            Biz hayvanlara olan sevgimizden yola çıkarak bu soruna modern bir çözüm ürettik. PawID ile köpeğinizin künyesine dokunan herkes, saniyeler içinde sizinle iletişime geçebilir.
          </p>
        </div>

        {/* Değerler */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm mb-4">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300 mb-4">Ne Sunuyoruz</p>
          <div className="flex flex-col gap-4">
            {[
              { icon: "📱", title: "Uygulama Gerektirmez", desc: "Bulucu sadece telefonunu künyeye yaklaştırır, hepsi bu." },
              { icon: "⚡", title: "Anlık Erişim", desc: "Köpeğinizin profili, sağlık bilgileri ve iletişim numaranız saniyeler içinde görünür." },
              { icon: "🔴", title: "Kayıp Alarmı", desc: "Tek tuşla kayıp ilanı açın, profilde kırmızı uyarı belirir." },
              { icon: "🏥", title: "Sağlık Kartı", desc: "Aşılar, alerjiler ve veteriner bilgisi her an erişilebilir." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-medium text-stone-800">{item.title}</p>
                  <p className="text-xs text-stone-400 font-light mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-stone-900 rounded-2xl p-6 text-center">
          <p className="font-display text-xl font-light text-white mb-1">Tüylü dostunuzu koruyun.</p>
          <p className="text-stone-400 text-sm font-light mb-4">Hemen bir PawID künye edinin.</p>
          <a
            href="/dashboard"
            className="inline-block bg-white text-stone-900 text-sm font-medium px-6 py-3 rounded-xl hover:bg-stone-100 transition-colors"
          >
            Başla →
          </a>
        </div>

      </div>
    </div>
  );
}
