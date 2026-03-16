export default function AdminStats({ total, active, lost }) {
  const stats = [
    { label: "Toplam Künye", value: total, color: "text-gray-900" },
    { label: "Aktif", value: active, color: "text-green-500" },
    { label: "Kayıp", value: lost, color: "text-red-500" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {stats.map((s) => (
        <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4 text-center">
          <p className={`text-2xl font-light ${s.color}`}>{s.value}</p>
          <p className="text-gray-400 text-xs mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}