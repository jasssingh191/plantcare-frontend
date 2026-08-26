import { useCallback, useEffect, useState } from "react";

/**
 * Fetches data with loading/error tracking, and falls back to
 * getFallback() if the request fails — so the UI never shows an
 * empty or broken screen (e.g. when the Perenual API is rate-limited
 * or unreachable).
 *
 * Runs fetchFn automatically once on mount, or again whenever a
 * value in `deps` changes (pass [] for "mount only", like useEffect).
 * Also returns `run`, so the same page can trigger a *different*
 * fetch later — e.g. a search — using this same loading/error/
 * fallback handling instead of duplicating it.
 */
export function useAsyncData(fetchFn, getFallback, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const run = useCallback(async (nextFetchFn, nextGetFallback) => {
    setIsLoading(true);
    setHasError(false);

    try {
      setData(await nextFetchFn());
    } catch (error) {
      console.error("Request failed, using fallback data:", error);
      setHasError(true);
      setData(nextGetFallback());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Kick off the fetch on the next microtask rather than calling
    // run() directly here — run()'s first line updates state, and
    // doing that synchronously inside an effect body is what React
    // warns about. Deferring it by a tick avoids that without
    // changing what actually happens.
    Promise.resolve().then(() => run(fetchFn, getFallback));
    // fetchFn/getFallback are new function instances on every render,
    // so they're intentionally left out here — `deps` is how the
    // caller controls when this should re-run (same idea as useEffect).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, isLoading, hasError, run };
}