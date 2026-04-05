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
          <th className="py-1">Nome</th>
          <th className="py-1">Data</th>
          <th className="py-1">Autor</th>
          <th className="py-1">Quanitade</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr className="border-b border-gray-200" key={d.id}>
            <td className="text-center text-xs capitalize font-semibold text-gray-600 py-1">
              {d.equipament_name}
            </td>
            <td className="text-center text-xs font-semibold text-gray-600 py-1">
              {dateFormater(d.consumed_at)}
            </td>
            <td
              className="max-w-10 md:max-w-20 text-center text-xs font-semibold 
            text-blue-600 py-1 truncate"
            >
              {d.user_email}
            </td>
            <td className="text-center text-xs font-semibold text-gray-600 py-1">
              {d.quantity}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
