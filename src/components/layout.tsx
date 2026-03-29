import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation";

export function Layout() {
  return (
    <div>
      <header>
        <div className="flex items-center justify-between p-5">
          <div className="text-left gap-2">
            <h2 className="font-bold text-blue-900">CheckStock</h2>
            <h4 className="text-sm text-gray-500">Santa Luzia - MA</h4>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
        <Navigation />
      </header>

      <main>
        <div className="px-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
