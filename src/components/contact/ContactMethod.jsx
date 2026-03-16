export default function ContactMethod({ href, Icon, title, value }) {
  if (!Icon) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:border-stone-400 transition-colors"
    >
      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
        <Icon size={18} className="text-stone-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-stone-800">{title}</p>
        <p className="text-xs text-stone-400 font-light">{value}</p>
      </div>
    </a>
  );
}