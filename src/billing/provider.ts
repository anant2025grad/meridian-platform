import { randomUUID } from "node:crypto";

export interface PaymentRequest {
  amount: number;
  currency: "USD";
  customerId: string;
}

export interface PaymentResult {
  transactionId: string;
  status: "completed" | "failed";
  provider: string;
}

export class MockPaymentProvider {
  readonly name = "meridian-mock-payments";

  async charge(request: PaymentRequest): Promise<PaymentResult> {
    if (
      !Number.isFinite(request.amount) ||
      request.amount <= 0 ||
      !request.customerId
    ) {
      return {
        transactionId: randomUUID(),
        status: "failed",
        provider: this.name,
      };
    }

    return {
      transactionId: randomUUID(),
      status: "completed",
      provider: this.name,
    };
  }
}