
export interface AnalyticsEvent {
  type: string;
  timestamp: string;
  userId: string;
}

export function countEvents(
  events: AnalyticsEvent[]
): Record<string, number> {
  return events.reduce<Record<string, number>>(
    (counts, event) => {
      counts[event.type] = (counts[event.type] ?? 0) + 1;
      return counts;
    },
    {}
  );
}
