import { CalendarDaysIcon, MonitorSmartphone, Search } from "lucide-react";
import { Card } from "../components/card";
import { ProgressBar } from "../components/progressBar";

export function Consumption() {
  return (
    <div className="w-full">
      <div
        className="flex items-center border border-gray-200
        rounded-md w-fit justify-self-end mt-8"
      >
        <input
          type="text"
          placeholder="pesquisar..."
          className="pl-1 text-sm text-gray-600"
        />
        <Search className="p-1 bg-blue-700 text-gray-50 rounded-e-md" />
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-3 
      lg:grid-cols-[auto_auto_auto_auto] gap-6 mt-10"
      >
        <Card>
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex justify-between items-center">
              <p className="text-gray-700 text-md font-bold mb-2">Nome</p>
              <MonitorSmartphone
                width={30}
                height={30}
                className="p-1 bg-blue-600 text-gray-50 rounded-full"
              />
            </div>
            <div>
              <ProgressBar total={100} consumed={20} />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              className="text-xs uppercase font-semibold px-2 py-1
          bg-blue-700 rounded-sm text-gray-50 mt-5 hover:bg-blue-800"
            >
              atualizar uso
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
