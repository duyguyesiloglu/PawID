export default function PetHeader({ pet }) {
  return (
    <div className="text-center mb-8">
      <div className="relative inline-block mb-4">
        {pet.photo ? (
          <img src={pet.photo} alt={pet.name} className="w-32 h-32 rounded-3xl object-cover" />
        ) : (
          <div className="w-32 h-32 rounded-3xl bg-gray-100 flex items-center justify-center">
            <span className="text-5xl">🐾</span>
          </div>
        )}
        {pet.isLost && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full animate-bounce">
            Kayıp
          </span>
        )}
      </div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-1">{pet.name || "İsimsiz"}</h1>
      <p className="text-gray-400">{pet.breed}{pet.age ? ` · ${pet.age}` : ""}</p>
    </div>
  );
}