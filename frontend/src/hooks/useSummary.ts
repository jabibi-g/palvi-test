import { useState, useEffect } from 'react';
import { metricsApi } from '../services/metrics.service';
import type { DatasetSummary } from '../interfaces/metrics';

export function useSummary(dataset: string, from?: string, to?: string) {
  const [data, setData] = useState<DatasetSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!dataset) return;
    setLoading(true);
    setError(null);
    metricsApi
      .getSummary(dataset, from, to)
      .then(setData)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error'))
      .finally(() => setLoading(false));
  }, [dataset, from, to]);

  return { data, loading, error };
}
