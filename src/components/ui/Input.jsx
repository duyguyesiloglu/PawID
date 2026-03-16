export default function Input({ label, isTextArea, ...props }) {
  const baseClass = "bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors";
  
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-xs font-medium text-stone-500">{label}</label>}
      {isTextArea ? (
        <textarea {...props} className={`${baseClass} resize-none`} rows={4} />
      ) : (
        <input {...props} className={baseClass} />
      )}
    </div>
  );
}