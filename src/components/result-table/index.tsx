import React from "react";
import { Discrepancy } from "../../types";
import Table from "./table";

type TResultTable = {
  discrepancies: {
    unitPriceIssues: Discrepancy[];
    formulationIssues: Discrepancy[];
    strengthIssues: Discrepancy[];
    payerIssues: Discrepancy[];
  };
};

const ResultTable: React.FC<TResultTable> = ({ discrepancies }) => {
  return (
    <>
      <Table
        name="Unit Price"
        data={discrepancies.unitPriceIssues.map((item) => ({
          drugName: item.drugName,
          recorded: item.invoiceValue,
          expected: item.referenceValue,
        }))}
      />
      <Table
        name="Formulation"
        data={discrepancies.formulationIssues.map((item) => ({
          drugName: item.drugName,
          recorded: item.invoiceValue,
          expected: item.referenceValue,
        }))}
      />
      <Table
        name="Strength"
        data={discrepancies.strengthIssues.map((item) => ({
          drugName: item.drugName,
          recorded: item.invoiceValue,
          expected: item.referenceValue,
        }))}
      />
      <Table
        name="Payer"
        data={discrepancies.payerIssues.map((item) => ({
          drugName: item.drugName,
          recorded: item.invoiceValue,
          expected: item.referenceValue,
        }))}
      />
    </>
  );
};

export default ResultTable;
