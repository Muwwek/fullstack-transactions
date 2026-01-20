"use client";
import { useEffect, useState } from "react";
import TransactionTable from "@/components/TransactionTable";
import Pagination from "@/components/Pagination";
import { Search, Filter, RefreshCw, ChevronDown } from "lucide-react";

const API_URL = "http://localhost:3001/transactions";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      sortBy,
      status,
      search,
    });

    fetch(`${API_URL}?${params.toString()}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result.data);
        setTotal(result.total);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, sortBy, status, search]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="min-h-screen bg-gray-50/50 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Transactions
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage and track your customer payments.
            </p>
          </div>
          <div className="flex items-center gap-2">
             <button 
                onClick={fetchData} 
                className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors"
                title="Refresh"
             >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
             </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by customer name..."
              className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-500"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); 
              }}
            />
          </div>

          <div className="relative w-full sm:w-48">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="block w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-8 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-500"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1); 
              }}
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
               <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        <TransactionTable data={data} sortBy={sortBy} onSort={setSortBy} />
        
        <Pagination
          total={total}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}
