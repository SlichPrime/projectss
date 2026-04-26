export const formatRupiah = (n: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

export const gradeLabel: Record<string, string> = {
  S: "Pristine",
  A: "Excellent",
  B: "Good",
  C: "Fair",
  D: "Worn",
};