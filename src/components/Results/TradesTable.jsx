import React, { useState } from "react";

const TradesTable = ({ trades }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tradesPerPage = 10;

  if (!trades || trades.length === 0) return null;

  // Calculate pagination
  const indexOfLastTrade = currentPage * tradesPerPage;
  const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;
  const currentTrades = trades.slice(indexOfFirstTrade, indexOfLastTrade);
  const totalPages = Math.ceil(trades.length / tradesPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    // If dateString is in a format with Timestamp
    if (dateString.includes("Timestamp")) {
      return dateString.replace(/Timestamp\('([^']+)'\)/, "$1");
    }

    return dateString;
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">
        Trades Executed ({trades.length})
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-black rounded-lg overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Entry Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Exit Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Entry Price
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Exit Price
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Profit/Loss
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {currentTrades.map((trade, index) => {
              const actualIndex = indexOfFirstTrade + index;
              const isProfitable = trade.profit > 0;

              return (
                <tr key={actualIndex}>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    {actualIndex + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    {formatDate(trade.entry_date)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    {formatDate(trade.exit_date)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    ₹{parseFloat(trade.entry_underlying_price).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    ₹{parseFloat(trade.exit_underlying_price).toFixed(2)}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm font-medium ${
                      isProfitable ? "text-profit" : "text-loss"
                    }`}
                  >
                    {isProfitable ? "+" : ""}₹
                    {parseFloat(trade.profit).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-3 py-1 text-sm bg-black rounded hover:bg-gray-700 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-3 py-1 text-sm bg-black rounded hover:bg-gray-700 disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TradesTable;
