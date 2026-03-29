import { Box, TabletSmartphone } from "lucide-react";
import { Card } from "../components/card";

export function Dashboard() {
  return (
    <div className="mt-10">
      <div
        className="grid grid-cols-1 md:grid-cols-2 
      lg:grid-cols-[auto_auto_auto_auto] gap-6"
      >
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">
                Total de Equipamentos
              </p>
              <p className="text-2xl font-bold text-green-500">50</p>
            </div>
            <Box className="w-6 h-6 text-green-300" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-300 text-sm font-medium">
                Baixo Estoque
              </p>
              <p className="text-2xl font-bold text-yellow-500">50</p>
            </div>
            <TabletSmartphone className="w-6 h-6 text-yellow-300" />
          </div>
        </Card>
      </div>
    </div>
  );
}
