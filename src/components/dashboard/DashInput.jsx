export default function DashInput({ label, value, onChange, placeholder, isTextArea }) {
  const baseClass = "text-sm text-gray-900 outline-none placeholder:text-gray-200 bg-transparent";
  
  return (
    <div className={`flex ${isTextArea ? 'flex-col gap-2' : 'items-center'} px-5 py-3.5 border-b border-gray-50 last:border-0`}>
      <label className="text-sm text-gray-400 w-28 flex-shrink-0">{label}</label>
      {isTextArea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClass} bg-gray-50 p-3 rounded-xl resize-none`}
          rows={3}
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClass} flex-1 text-right`}
        />
      )}
    </div>
  );
}