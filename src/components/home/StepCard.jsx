export default function StepCard({ stepNumber, title, description, image }) {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left group">
      <div className="h-32 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
        <img src={image} alt={title} className="max-h-full drop-shadow-xl" />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold bg-[#559632]/10 text-[#559632] px-2 py-0.5 rounded-md">
          Adım {stepNumber}
        </span>
      </div>
      <h3 className="text-lg font-bold text-stone-800 mb-3">{title}</h3>
      <p className="text-sm text-stone-400 font-light leading-relaxed">{description}</p>
    </div>
  );
}