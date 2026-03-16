import { AlertTriangle, CheckCircle, User, ExternalLink, Copy, Mail } from "lucide-react";

export default function PetList({ pets, copied, handleCopy, handleMailto }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <p className="text-xs font-medium tracking-widest uppercase text-gray-300 mb-4">Künyeler ({pets.length})</p>
      <div className="flex flex-col">
        {pets.map((pet) => (
          <div key={pet.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
              {pet.isLost ? <AlertTriangle size={15} className="text-red-400" /> : 
               pet.name ? <CheckCircle size={15} className="text-green-400" /> : 
               <div className="w-4 h-4 rounded-full border-2 border-gray-200" />}
              <div>
                <p className="text-sm font-medium text-gray-800">{pet.id}</p>
                <p className="text-xs text-gray-400">{pet.name || pet.customerEmail || "Beklemede"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
               {/* ✉️ handleMailto burada devreye giriyor */}
               {pet.customerEmail && !pet.name && (
                 <button 
                   onClick={() => handleMailto(pet.id, pet.customerEmail)} 
                   className="text-gray-400 hover:text-green-500 transition-colors"
                 >
                   <Mail size={14} />
                 </button>
               )}

               <button onClick={() => handleCopy(pet.id)} className="text-gray-400">
                 {copied === pet.id ? <span className="text-green-500 text-xs font-bold">✓</span> : <Copy size={13} />}
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}