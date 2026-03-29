import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <div
      className="w-full bg-white border-b 
    border-gray-200 pt-5"
    >
      <nav>
        <ul
          className="flex items-start text-right text-sm 
        font-semibold text-gray-400"
        >
          <li>
            <NavLink
              to="/"
              className={({
                isActive,
              }) => `cursor-pointer transition-colors hover:text-gray-600
              rounded-[5px_5px_0px_0px] border-r border-gray-200/60 bg-gray-400/40 px-4
              ${isActive ? "text-gray-600 bg-white border-x border-t border-gray-100" : ""}`}
            >
              Início
            </NavLink>
          </li>
          <li>
            <NavLink
              to=""
              className={({
                isActive,
              }) => `cursor-pointer transition-colors hover:text-gray-600
              rounded-[5px_5px_0px_0px] border-r border-gray-200/60 bg-gray-400 px-4
              ${isActive ? "text-gray-600 bg-white border-x border-t border-gray-100" : ""}`}
            >
              Equipamentos
            </NavLink>
          </li>
          <li>
            <NavLink
              to=""
              className={({
                isActive,
              }) => `cursor-pointer transition-colors hover:text-gray-600
              rounded-[5px_5px_0px_0px] border-r border-gray-200/60 bg-gray-400 px-4
              ${isActive ? "text-gray-600 bg-white border-x border-t border-gray-100" : ""}`}
            >
              Consumo
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
