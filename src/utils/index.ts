const calculatePriceDiscrepancy = (
  invoicePrice: number,
  referencePrice: number
): number => {
  return ((invoicePrice - referencePrice) / referencePrice) * 100;
};

export { calculatePriceDiscrepancy };
