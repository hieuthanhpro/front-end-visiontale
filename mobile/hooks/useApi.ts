import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

interface UseApiOptions {
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}

/**
 * Custom hook for API calls with loading and error handling
 *
 * @example
 * const { data, loading, error, refetch } = useApi(
 *   () => projectAPI.getProjects(),
 *   { onSuccess: () => console.log('Done!') }
 * );
 */
export function useApi<T>(
  apiCall: () => Promise<T>,
  options?: UseApiOptions
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const refetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
      options?.onSuccess?.();
    } catch (error) {
      const axiosError = error as AxiosError;
      setState((prev) => ({ ...prev, error: axiosError, loading: false }));
      options?.onError?.(axiosError);
    }
  }, [apiCall, options]);

  useEffect(() => {
    refetch();
  }, []);

  return { ...state, refetch };
}

/**
 * Custom hook for debounced async operations
 *
 * @example
 * const { execute, loading } = useAsyncOperation(
 *   async (value) => await projectAPI.updateProject(id, { name: value })
 * );
 */
export function useAsyncOperation<T, R = void>(
  asyncFn: (arg: T) => Promise<R>,
  options?: UseApiOptions
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const execute = useCallback(
    async (arg: T) => {
      setLoading(true);
      setError(null);
      try {
        const result = await asyncFn(arg);
        options?.onSuccess?.();
        return result;
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError);
        options?.onError?.(axiosError);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFn, options]
  );

  return { execute, loading, error };
}
