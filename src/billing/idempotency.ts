import { randomUUID } from "node:crypto";

export interface TransactionResult {
  transactionId: string;
  amount: number;
  status: "completed";
}

const transactions = new Map<string, TransactionResult>();

export function processIdempotentPayment(
  idempotencyKey: string,
  amount: number
): TransactionResult {
  if (!idempotencyKey.trim()) {
    throw new Error("Idempotency key is required");
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Invalid payment amount");
  }

  const existing = transactions.get(idempotencyKey);

  if (existing) {
    if (existing.amount !== amount) {
      throw new Error(
        "Idempotency key reused with a different amount"
      );
    }

    return existing;
  }

  const transaction: TransactionResult = {
    transactionId: randomUUID(),
    amount,
    status: "completed",
  };

  transactions.set(idempotencyKey, transaction);

  return transaction;
}