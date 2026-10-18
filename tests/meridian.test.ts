
import { describe, expect, it } from "vitest";
import { login } from "../src/auth/login";
import { calculateTotal } from "../src/billing/payments";
import { getMonthlyPrice } from "../src/billing/subscriptions";
import { countEvents } from "../src/dashboard/analytics";

import {
    createSession,
    rotateSession,
    validateSession,
} from "../src/auth/session";

import { MockPaymentProvider } from "../src/billing/provider";

describe("Meridian platform", () => {
    it("rejects invalid email addresses", () => {
        expect(
            login({ email: "invalid", password: "test" }).success
        ).toBe(false);
    });

    it("accepts a simulated login", () => {
        expect(
            login({
                email: "test@example.com",
                password: "test",
            }).success
        ).toBe(true);
    });

    it("calculates payment totals", () => {
        expect(calculateTotal(100, 0.06)).toBe(106);
    });

    it("returns subscription pricing", () => {
        expect(getMonthlyPrice("pro")).toBe(29);
    });

    it("aggregates analytics events", () => {
        expect(
            countEvents([
                { type: "login", timestamp: "2026-10-01", userId: "1" },
                { type: "login", timestamp: "2026-10-02", userId: "2" },
            ])
        ).toEqual({ login: 2 });
    });

    it("rotates a session and invalidates the old session", () => {
        const original = createSession("user-123");

        const rotated = rotateSession(original.id);

        expect(rotated).not.toBeNull();
        expect(rotated?.id).not.toBe(original.id);
        expect(validateSession(original.id)).toBeNull();
        expect(validateSession(rotated!.id)).not.toBeNull();
    });

    it("processes a valid mock payment", async () => {
        const provider = new MockPaymentProvider();

        const result = await provider.charge({
            amount: 49.99,
            currency: "USD",
            customerId: "customer-123",
        });

        expect(result.status).toBe("completed");
        expect(result.provider).toBe("meridian-mock-payments");
    });

    it("rejects an invalid payment amount", async () => {
        const provider = new MockPaymentProvider();

        const result = await provider.charge({
            amount: -10,
            currency: "USD",
            customerId: "customer-123",
        });

        expect(result.status).toBe("failed");
    });
});
