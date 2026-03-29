import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <div className="w-full bg-white pt-5">
      <nav className="flex">
        <ul
          className="flex items-start text-right text-sm 
        font-semibold text-gray-400 [line-height:normal]"
        >
          <li>
            <NavLink
              to="/app/home"
              className={({
                isActive,
              }) => `cursor-pointer transition-all hover:text-gray-500
              rounded-[5px_5px_0px_0px] border-r border-gray-200/60 bg-gray-200/60 px-4
              ${isActive ? "text-gray-600 bg-white border-x border-t border-gray-100 pt-1" : ""}`}
            >
              Início
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/equipaments"
              className={({
                isActive,
              }) => `cursor-pointer transition-colors hover:text-gray-500
              rounded-[5px_5px_0px_0px] border-r border-gray-200/60 bg-gray-200/60 px-4
              ${isActive ? "text-gray-600 bg-white border-x border-t border-gray-100 pt-1" : ""}`}
            >
              Equipamentos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/consumption"
              className={({
                isActive,
              }) => `cursor-pointer transition-colors hover:text-gray-500
              rounded-[5px_5px_0px_0px] border-r border-gray-200/60 bg-gray-200/60 px-4
              ${isActive ? "text-gray-600 bg-white border-x border-t border-gray-100" : ""}`}
            >
              Consumo
            </NavLink>
          </li>
        </ul>
        <div className="w-full border-b border-gray-200 items-end" />
      </nav>
    </div>
  );
}
