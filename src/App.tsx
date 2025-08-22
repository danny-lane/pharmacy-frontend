import React, { useState } from "react";
import { AuditResponse } from "./types";
import { InputForm, ResultTable, Summary } from "./components";

const App: React.FC = () => {
  const [results, setResults] = useState<AuditResponse | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pharmacy Invoice Audit
          </h1>
          <p className="text-gray-600">
            Upload your pharmacy invoice to validate against reference prices
          </p>
        </div>

        {/* Input Form */}
        <InputForm setResults={setResults} />

        {/* Results Section */}
        {results && (
          <div className="space-y-6">
            {/* Discrepancies Table */}
            <ResultTable discrepancies={results.discrepancies} />

            {/* Summary Cards */}
            <Summary
              discrepancies={{
                unitPriceIssues: results.discrepancies.unitPriceIssues.length,
                formulationIssues:
                  results.discrepancies.formulationIssues.length,
                strengthIssues: results.discrepancies.strengthIssues.length,
                payerIssues: results.discrepancies.payerIssues.length,
              }}
              totalDiscrepancies={results.totalDiscrepancies}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
