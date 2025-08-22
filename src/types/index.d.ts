// Types
export interface Discrepancy {
  id: number;
  drugName: string;
  type: "Unit Price" | "Formulation" | "Strength" | "Payer";
  invoiceValue: string | number;
  referenceValue: string | number;
  description: string;
}

export interface AuditResponse {
  totalItems: number;
  totalDiscrepancies: number;
  discrepancies: {
    unitPriceIssues: Discrepancy[];
    formulationIssues: Discrepancy[];
    strengthIssues: Discrepancy[];
    payerIssues: Discrepancy[];
  };
}
