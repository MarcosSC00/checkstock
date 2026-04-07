import {
  ArchiveRestore,
  Box,
  ChartLine,
  History,
  TabletSmartphone,
} from "lucide-react";
import { Card } from "../components/card";
import { useEffect, useState } from "react";
import {
  getDashboardSumary,
  getMonthlyConsumption,
  getRecentConsumptions,
} from "../services/dashboard";
import { toast } from "sonner";
import { Loading } from "../components/loading";
import { RecentConsumptionCard } from "../components/recentConsumptionCard";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RecentConsumptions } from "../types/recentConsumptions";

export function Dashboard() {
  const [dashboardSumary, setDashBoardSumary] = useState<any>([]);
  const [recentConsumptions, setRecentConsumptions] = useState<
    RecentConsumptions[]
  >([]);
  const [monthlyConsumption, setMonthlyConsumption] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [dashboardSumary, recentConsumptions, monthlyConsumption] =
        await Promise.all([
          getDashboardSumary(),
          getRecentConsumptions(),
          getMonthlyConsumption(),
        ]);
      setDashBoardSumary(dashboardSumary);
      setRecentConsumptions(recentConsumptions);
      setMonthlyConsumption(monthlyConsumption);
    } catch (error) {
      toast.error("Erro ao carregar dados.", {
        id: "erroLoadDashboard",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="mt-10">
      {loading ? (
        <div className="w-full h-full flex justify-center mt-40">
          <Loading />
        </div>
      ) : (
        <div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 
      lg:grid-cols-[auto_auto_auto] gap-6"
          >
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">
                    Total de Equipamentos
                  </p>
                  <p className="text-2xl font-bold text-green-500">
                    {dashboardSumary.total_equipaments}
                  </p>
                </div>
                <TabletSmartphone className="w-6 h-6 text-green-300" />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm font-medium">
                    Estoque Total
                  </p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {dashboardSumary.total_stock}
                  </p>
                </div>
                <Box className="w-6 h-6 text-yellow-300" />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">
                    Total Consumido
                  </p>
                  <p className="text-2xl font-bold text-blue-300">
                    {dashboardSumary.total_consumed}
                  </p>
                </div>
                <ArchiveRestore className="w-6 h-6 text-blue-300" />
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/*Month Consume */}
            <div
              className="bg-white rounded-xl shadow-xs border 
            border-gray-200 p-6"
            >
              <div
                className="flex items-center gap-4 text-gray-50
              rounded-md bg-blue-800 w-fit px-2 py-0.5 mb-10"
              >
                <h4 className="font-bold text-sm">Consumo Mensal</h4>
                <ChartLine size={18} />
              </div>
              {monthlyConsumption && monthlyConsumption.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    className=""
                    data={monthlyConsumption}
                    margin={{ left: -30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString("pt-BR", {
                          month: "short",
                        })
                      }
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(value) =>
                        new Date(value).toLocaleDateString("pt-BR", {
                          month: "long",
                          year: "numeric",
                        })
                      }
                    />
                    <Bar
                      dataKey="total_consumed"
                      barSize={20}
                      fill="#193cb8"
                      isAnimationActive={true}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <span className="text-xs text-red-500 mt-5">
                  Nenhum histórico de consumo.
                </span>
              )}
            </div>
            {/*Recent Uses */}
            <div
              className="bg-white rounded-xl shadow-xs border 
            border-gray-200 p-6"
            >
              <div
                className="flex items-center gap-4 text-gray-50
              rounded-md bg-blue-800 w-fit px-2 py-0.5 mb-10"
              >
                <h4 className="font-bold text-sm">Consumos Recentes</h4>
                <History size={18} />
              </div>

              {recentConsumptions && recentConsumptions.length > 0 ? (
                <div className="w-full overflow-x-auto">
                  <RecentConsumptionCard
                    data={recentConsumptions.slice(0, 5)}
                  />
                </div>
              ) : (
                <span className="text-xs text-red-500">
                  Nenhum histórico de consumo.
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
