export type LogLevel = "INFO" | "WARN" | "ERROR";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export function createLogEntry(
  level: LogLevel,
  service: string,
  message: string,
  metadata?: Record<string, unknown>
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    service,
    message,
    ...(metadata ? { metadata } : {}),
  };
}

export function serializeLog(entry: LogEntry): string {
  return JSON.stringify(entry);
}