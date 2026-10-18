
export interface Report {
  title: string;
  generatedAt: string;
  metrics: Record<string, number>;
}

export function generateReport(
  title: string,
  metrics: Record<string, number>
): Report {
  return {
    title,
    generatedAt: new Date().toISOString(),
    metrics,
  };
}
