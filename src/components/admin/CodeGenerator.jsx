import { Plus, Copy, Mail } from "lucide-react";

export default function CodeGenerator({ 
  customerEmail, setCustomerEmail, handleGenerate, newCode, handleCopy, copied, handleMailto, mailSent 
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4">
      <p className="text-xs font-medium tracking-widest uppercase text-gray-300 mb-4">Yeni Künye Üret</p>
      <div className="flex flex-col gap-3">
        <input
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="müşteri@gmail.com"
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400"
        />
        <button onClick={handleGenerate} className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium text-sm w-fit">
          <Plus size={16} /> Kod Üret
        </button>
      </div>

      {newCode && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-medium text-gray-900">{newCode}</p>
              <p className="text-gray-400 text-xs mt-0.5">Aktivasyon bekliyor...</p>
            </div>
            <button onClick={() => handleCopy(newCode)} className="bg-black text-white px-4 py-2 rounded-xl text-xs font-medium">
              {copied === newCode ? "Kopyalandı ✓" : "Linki Kopyala"}
            </button>
          </div>
          {customerEmail && (
            <button onClick={() => handleMailto(newCode, customerEmail)} className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl text-sm font-medium">
              <Mail size={15} /> {mailSent[newCode] ? "Mail Açıldı ✓" : "Mail Hazırla"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}