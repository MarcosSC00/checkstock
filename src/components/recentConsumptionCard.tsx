import { dateFormater } from "../utils/dateFormater";

interface RecentConsumptionCardProps {
  data: any[];
}

export function RecentConsumptionCard({ data }: RecentConsumptionCardProps) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr
          className="border-b text-xs border-gray-300 
            uppercase bg-blue-200/80 text-nowrap"
        >
          <th className="px-4 py-1">Nome</th>
          <th className="px-4 py-1">Data</th>
          <th className="px-4 py-1">Autor</th>
          <th className="px-4 py-1">Quanitade</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr className="border-b border-gray-200" key={d.id}>
            <td className="text-left">
              <span className="text-xs capitalize font-semibold text-gray-600 py-1 px-4 text-nowrap">
                {d.equipament_name}
              </span>
            </td>
            <td className="text-center">
              <span className="text-xs font-semibold text-gray-600 py-1">
                {dateFormater(d.consumed_at)}
              </span>
            </td>
            <td className="text-center">
              <span className="text-xs text-blue-600 font-semibold px-5">
                {d.user_email}
              </span>
            </td>
            <td className="text-center text-xs font-semibold text-gray-600 py-1">
              <span>{d.quantity}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
