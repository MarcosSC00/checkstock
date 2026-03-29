import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation";
import { Footer } from "./footer";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header>
        <div className="flex items-center justify-between p-5">
          <div className="text-left gap-2">
            <h2 className="font-bold text-blue-900 text-xl">CheckStock</h2>
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

      <main className="flex-1 max-w-360 w-full">
        <div className="px-4 mb-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
