
export interface Payment {
  id: string;
  amount: number;
  currency: "USD";
  status: "pending" | "completed" | "failed";
}

export function calculateTotal(
  subtotal: number,
  taxRate: number
): number {
  if (subtotal < 0 || taxRate < 0) {
    throw new Error("Invalid payment amount");
  }

  return Math.round(subtotal * (1 + taxRate) * 100) / 100;
}
