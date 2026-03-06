export default function HomePage() {
  return (
    <div className="bg-stone-50 min-h-screen font-sans">

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        
        {/* Tag */}
        <span className="bg-white border border-stone-200 text-stone-400 text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full mb-10 shadow-sm">
          🐾 Akıllı NFC Köpek Künyesi
        </span>

        {/* Başlık */}
        <h1 className="font-display text-5xl sm:text-7xl font-light text-stone-900 leading-tight tracking-tight mb-6 max-w-2xl">
          Kayıp köpeğini{" "}
          <span className="italic text-blue-400">saniyeler içinde</span>{" "}
          bul
        </h1>

        {/* Açıklama */}
        <p className="text-stone-400 font-light text-lg max-w-md leading-relaxed mb-12">
          NFC çipli künyeye telefon dokunduğunda köpeğinin bilgileri anında açılır. Uygulama gerekmez.
        </p>

        {/* Butonlar */}
        <div className="flex gap-3 flex-wrap justify-center">
          <a href="/dashboard" className="bg-stone-900 text-white px-8 py-3.5 rounded-full font-medium hover:bg-stone-700 transition-colors">
            Başla →
          </a>
          <a href="#how" className="bg-white text-stone-700 px-8 py-3.5 rounded-full font-medium border border-stone-200 hover:shadow-md transition-shadow">
            Nasıl çalışır?
          </a>
        </div>
      </section>

      {/* Özellikler */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-center text-xs font-medium tracking-widest uppercase text-stone-300 mb-12">
          Özellikler
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-stone-200 rounded-3xl overflow-hidden">
          {[
            { icon: "📱", title: "Uygulama gerekmez", desc: "Herhangi bir telefon künyeye dokunduğunda profil açılır." },
            { icon: "🆘", title: "Kayıp bildirimi", desc: "Tek tuşla tüm profilinde kayıp uyarısı çıkar." },
            { icon: "🏥", title: "Sağlık bilgileri", desc: "Aşılar, alerjiler ve veteriner bilgileri hep erişilebilir." },
          ].map((f) => (
            <div key={f.title} className="bg-stone-50 hover:bg-white transition-colors p-10">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-stone-900 font-medium mb-2">{f.title}</h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nasıl çalışır */}
      <section id="how" className="max-w-xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display text-4xl font-light text-stone-900 tracking-tight mb-12">
          Nasıl çalışır?
        </h2>
        <div className="flex flex-col divide-y divide-stone-200">
          {[
            { num: "01", title: "Profil oluştur", desc: "Köpeğinin fotoğrafını, bilgilerini ve iletişim numaranı ekle." },
            { num: "02", title: "NFC künyeyi tak", desc: "Epoksi NFC künyeyi köpeğinin boynuna takıyorsun." },
            { num: "03", title: "Birisi bulduğunda", desc: "Telefonu künyeye dokunduruyor, profil açılıyor ve seni arıyor." },
          ].map((s) => (
            <div key={s.num} className="flex items-start gap-5 py-6 text-left">
              <span className="font-display text-2xl font-light text-stone-200 min-w-8">{s.num}</span>
              <div>
                <h3 className="text-stone-800 font-medium mb-1">{s.title}</h3>
                <p className="text-stone-400 text-sm font-light leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-stone-900 rounded-3xl px-10 py-16 text-center">
          <h2 className="font-display text-4xl font-light text-white tracking-tight mb-4">
            Köpeğini korumaya<br />hemen başla
          </h2>
          <p className="text-stone-400 font-light mb-8">
            Ücretsiz profil oluştur, istediğin zaman güncelle.
          </p>
          <a href="/dashboard" className="bg-white text-stone-900 px-8 py-3.5 rounded-full font-medium hover:bg-stone-100 transition-colors inline-block">
            Profil Oluştur →
          </a>
        </div>
      </section>

    </div>
  );
}