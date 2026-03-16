import { ChevronRight } from "lucide-react";

export default function DashboardSection({ title, id, activeSection, setActiveSection, children }) {
  const isActive = activeSection === id;
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden mb-3 border border-gray-50 shadow-sm">
      <button
        onClick={() => setActiveSection(isActive ? null : id)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <p className="font-semibold text-gray-800 text-sm">{title}</p>
        <ChevronRight
          size={16}
          className={`text-gray-300 transition-transform duration-300 ${isActive ? "rotate-90" : ""}`}
        />
      </button>
      
      {isActive && (
        <div className="border-t border-gray-50 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
}