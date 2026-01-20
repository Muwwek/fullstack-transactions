import { ChevronUp, ChevronDown } from "lucide-react";

type Transaction = {
  id: number;
  customer_name: string;
  amount: number;
  date: string;
  status: string;
};

type Props = {
  data: Transaction[];
  sortBy: string;
  onSort: (field: "amount" | "date") => void;
};

export default function TransactionTable({ data, sortBy, onSort }: Props) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "failed":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
          <tr>
            <th className="px-6 py-4 font-medium">Customer</th>
            <th
              className="cursor-pointer px-6 py-4 font-medium transition-colors hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => onSort("amount")}
            >
              <div className="flex items-center gap-1">
                Amount
                {sortBy === "amount" && <ChevronUp className="h-4 w-4" />}
                {sortBy !== "amount" && <ChevronUp className="h-4 w-4 opacity-0 group-hover:opacity-50" />}
              </div>
            </th>
            <th
              className="cursor-pointer px-6 py-4 font-medium transition-colors hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => onSort("date")}
            >
              <div className="flex items-center gap-1">
                Date
                {sortBy === "date" && <ChevronUp className="h-4 w-4" />}
              </div>
            </th>
            <th className="px-6 py-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                No transactions found
              </td>
            </tr>
          ) : (
            data.map((tx) => (
              <tr
                key={tx.id}
                className="group transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  {tx.customer_name}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  ${tx.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                      tx.status
                    )}`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
