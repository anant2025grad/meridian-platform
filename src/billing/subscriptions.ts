
export type Plan = "free" | "pro" | "enterprise";

const MONTHLY_PRICES: Record<Plan, number> = {
  free: 0,
  pro: 29,
  enterprise: 199,
};

export function getMonthlyPrice(plan: Plan): number {
  return MONTHLY_PRICES[plan];
}
