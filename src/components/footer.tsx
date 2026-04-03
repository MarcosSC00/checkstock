import { PhoneIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="px-6 py-6">
        <div
          className="flex flex-col md:flex-row items-start 
        md:items-center md:justify-between gap-4"
        >
          <div className="w-full flex justify-between items-center mb-4">
            <h3
              className="text-slate-800 font-medium 
            text-sm md:text-md"
            >
              Desenvolvido por{" "}
              <span className="font-bold">Marcos Silva Chaves</span>
            </h3>
            <div className="flex items-center gap-2">
              <PhoneIcon size={18} />
              <span className="text-sm font-bold text-gray-700">
                (98) 98248-8698
              </span>
            </div>
          </div>
        </div>

        {/* Linha inferior */}
        <div
          className="border-t border-gray-400 text-center 
        text-xs md:text-sm text-gray-500"
        >
          © {new Date().getFullYear()} CheckStock. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
