import { CheckCircle } from "lucide-react";
import React from "react";
import { calculatePriceDiscrepancy } from "../../utils";

type TData = {
  drugName: string | number;
  recorded: string | number;
  expected: string | number;
};

type TTable = {
  name: string;
  data: TData[];
};

const Table: React.FC<TTable> = ({ name, data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          {name} Discrepancies Analysis
        </h3>
      </div>

      {data.length === 0 ? (
        <div className="p-8 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            No Issues Found!
          </h4>
          <p className="text-gray-600">
            All invoice items match the reference data perfectly.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Drug Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recorded {name}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected {name}
                </th>
                {name === "Unit Price" && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((discrepancy) => (
                <tr key={discrepancy.drugName} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {discrepancy.drugName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {name === "Unit Price"
                      ? `$${discrepancy.recorded}`
                      : discrepancy.recorded}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {name === "Unit Price"
                      ? `$${discrepancy.expected}`
                      : discrepancy.expected}
                  </td>
                  {name === "Unit Price" && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      $
                      {(
                        Number(discrepancy.recorded) -
                        Number(discrepancy.expected)
                      ).toFixed(2)}
                    </td>
                  )}
                  {name === "Unit Price" && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {calculatePriceDiscrepancy(
                        Number(discrepancy.recorded),
                        Number(discrepancy.expected)
                      ).toFixed(1)}
                      %
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
