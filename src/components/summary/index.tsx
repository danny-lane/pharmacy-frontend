import React from "react";
import Card from "./card";

type TSummary = {
  discrepancies: {
    unitPriceIssues: number;
    formulationIssues: number;
    strengthIssues: number;
    payerIssues: number;
  };
  totalDiscrepancies: number;
};

const Summary: React.FC<TSummary> = ({ discrepancies, totalDiscrepancies }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card
        title="Price Discrepancies"
        count={discrepancies.unitPriceIssues}
        extraInfo="Total Overcharge"
      />
      <Card
        title="Formulation Issues"
        count={discrepancies.formulationIssues}
        extraInfo="Billing Error"
      />
      <Card
        title="Strength Errors"
        count={discrepancies.strengthIssues}
        extraInfo="Safety Concern"
      />
      <Card
        title="Payer Mismatches"
        count={discrepancies.payerIssues}
        extraInfo="Claims Review Needed"
      />
      <Card
        title="Total Issues"
        count={totalDiscrepancies}
        extraInfo="Requires Action"
      />
    </div>
  );
};

export default Summary;
