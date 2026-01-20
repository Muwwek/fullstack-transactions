import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  total: number;
  currentPage: number;
  limit?: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  total,
  currentPage,
  limit = 10,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-800">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(currentPage * limit, total)}
        </span>{" "}
        of <span className="font-medium">{total}</span> results
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-800/50"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <div className="hidden md:flex">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            if (totalPages > 7 && Math.abs(page - currentPage) > 3 && page !== 1 && page !== totalPages) {
                 if (Math.abs(page - currentPage) === 4) return <span key={page} className="px-2 text-gray-400">...</span>;
                 return null;
            }
            
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`mx-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-800/50"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

