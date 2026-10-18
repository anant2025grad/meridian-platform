import {
  createLogEntry,
  type LogEntry,
} from "./logger.js";

export type SecurityEventType =
  | "LOGIN_FAILED"
  | "SESSION_EXPIRED"
  | "ACCESS_DENIED";

export function createSecurityEvent(
  eventType: SecurityEventType,
  userId: string
): LogEntry {
  return createLogEntry(
    "WARN",
    "meridian-security",
    eventType,
    { userId, category: "SECURITY_EVENT" }
  );
}