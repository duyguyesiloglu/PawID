export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="bg-stone-50 min-h-screen font-sans flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-stone-900 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-stone-200">
            <span className="text-xl">🐾</span>
          </div>
          <h1 className="text-3xl font-light text-stone-900 tracking-tight">{title}</h1>
          <p className="text-stone-400 font-light text-sm mt-2">{subtitle}</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-[2rem] p-8 shadow-sm flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}