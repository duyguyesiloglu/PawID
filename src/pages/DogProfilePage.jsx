import { Phone, Heart, AlertTriangle, Shield } from "lucide-react";

// Şimdilik sahte veri — ileride veritabanından gelecek
const dog = {
  name: "Karabaş",
  breed: "Golden Retriever",
  age: "3 yaşında",
  photo: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
  isLost: true,
  owner: {
    name: "Duygu Yeşiloğlu",
    phone: "+90 555 123 45 67",
  },
  health: {
    vaccines: ["Karma Aşı", "Kuduz", "Bordetella"],
    allergies: ["Tavuk eti"],
    vet: "Dr. Ahmet Kaya — 0212 555 00 11",
  },
};

export default function DogProfilePage() {
  return (
    <div className="bg-stone-50 min-h-screen font-sans pb-16">

      {/* Kayıp Uyarısı */}
      {dog.isLost && (
        <div className="bg-red-500 text-white text-center py-4 px-6 flex items-center justify-center gap-2 font-medium">
          <AlertTriangle size={18} />
          Bu köpek kayıp! Lütfen sahibiyle iletişime geçin.
        </div>
      )}

      <div className="max-w-lg mx-auto px-6 pt-12">

        {/* Fotoğraf + İsim */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <img
              src={dog.photo}
              alt={dog.name}
              className="w-36 h-36 rounded-3xl object-cover shadow-lg"
            />
            {dog.isLost && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                Kayıp
              </span>
            )}
          </div>
          <h1 className="font-display text-4xl font-light text-stone-900 tracking-tight mb-1">
            {dog.name}
          </h1>
          <p className="text-stone-400 font-light">{dog.breed} · {dog.age}</p>
        </div>

        {/* Sahibi Ara */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-4 shadow-sm">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300 mb-4">Sahibi</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stone-900 font-medium">{dog.owner.name}</p>
              <p className="text-stone-400 text-sm font-light">{dog.owner.phone}</p>
            </div>
            <a
              href={`tel:${dog.owner.phone}`}
              className="flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-stone-700 transition-colors"
            >
              <Phone size={15} />
              Ara
            </a>
          </div>
        </div>

        {/* Sağlık Bilgileri */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-4 shadow-sm">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-300 mb-4">Sağlık</p>

          {/* Aşılar */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={15} className="text-blue-400" />
              <span className="text-sm font-medium text-stone-700">Aşılar</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {dog.health.vaccines.map((v) => (
                <span key={v} className="bg-blue-50 text-blue-500 text-xs font-medium px-3 py-1 rounded-full">
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Alerjiler */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={15} className="text-amber-400" />
              <span className="text-sm font-medium text-stone-700">Alerjiler</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {dog.health.allergies.map((a) => (
                <span key={a} className="bg-amber-50 text-amber-500 text-xs font-medium px-3 py-1 rounded-full">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Veteriner */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart size={15} className="text-red-400" />
              <span className="text-sm font-medium text-stone-700">Veteriner</span>
            </div>
            <p className="text-stone-400 text-sm font-light">{dog.health.vet}</p>
          </div>
        </div>

        {/* Alt not */}
        <p className="text-center text-stone-300 text-xs font-light mt-8">
          🐾 PawID ile korunuyor
        </p>

      </div>
    </div>
  );
}