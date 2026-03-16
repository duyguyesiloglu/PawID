export default function InfoCard({ title, children }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5 mb-4">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-semibold">
        {title}
      </p>
      {children}
    </div>
  );
}