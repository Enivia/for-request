import { useCallback, useEffect, useRef, useState } from 'react';
import request from 'for-request';
import RequestError from 'for-request/dist/error/ResponseError';
import { DataParam, QueryParam, RequestOptions } from 'for-request/dist/interface';

export type TFetchOptions = { url: string; options?: RequestOptions };

export type TBaseOptions<T> = {
  /** manual trigger */
  manual?: boolean;
  /** init request data */
  initialValue?: T;
  /** auto cancel request before component unmounted */
  autoCancel?: boolean;
  /** cover unfinishied request */
  cover?: boolean;
  onSuccess?: (data: T, fetchOptions: TFetchOptions) => void;
  onError?: (error: RequestError, fetchOptions: TFetchOptions) => void;
};
export type TOptionWithFormat<T, R> = {
  formatter: (data: T) => R;
} & TBaseOptions<R>;
export type TOptions<T, R> = TBaseOptions<R> | TOptionWithFormat<T, R>;

export type TStatus = 'never' | 'pending' | 'complete';

export type TFetchResult<T> = {
  data: T | undefined;
  error: RequestError | undefined;
  status: TStatus;
};

export type TTriggerParams = { query?: QueryParam; data?: DataParam };
export type TResult<T> = {
  trigger: (params?: TTriggerParams) => void;
  cancel: () => void;
  loading: boolean;
} & TFetchResult<T>;

function useRequest<T = any, R = any>(
  fetchOptions: TFetchOptions,
  options: TOptionWithFormat<T, R>
): TResult<R>;
function useRequest<T = any>(
  fetchOptions: TFetchOptions,
  options?: TBaseOptions<T>
): TResult<T>;
function useRequest<T, R>(fetchOptions: TFetchOptions, options?: TOptions<T, R>): TResult<R> {
  const { url, options: requestOptions } = fetchOptions;
  const { manual, initialValue, autoCancel, cover, onSuccess, onError, formatter } = (options ||
    {}) as TOptionWithFormat<T, R>;

  const [result, setResult] = useState<TFetchResult<R>>({
    data: initialValue,
    error: undefined,
    status: 'never',
  });

  const controller = useRef<AbortController>();

  const trigger = useCallback(
    async (params?: TTriggerParams) => {
      const { query, data } = params || {};
      if (cover) {
        controller.current?.abort();
      }

      setResult(cur => ({ ...cur, status: 'pending' }));
      try {
        controller.current = new AbortController();
        const res = await request<T>(url, {
          ...requestOptions,
          query: query ?? requestOptions?.query,
          data: data ?? requestOptions?.data,
          signal: controller.current.signal,
        });
        const formarResult = (formatter ? formatter(res) : res) as any;

        setResult({ data: formarResult, error: undefined, status: 'complete' });
        onSuccess && onSuccess(formarResult, fetchOptions);
      } catch (e) {
        // console.error(e)
        setResult({ data: undefined, error: e, status: 'complete' });
        onError && onError(e, fetchOptions);
      }
    },
    [url, requestOptions, cover, onSuccess, onError, formatter]
  );

  const cancel = useCallback(() => {
    controller.current?.abort();
  }, []);

  // trigger on first render
  useEffect(() => {
    if (!manual) trigger();
  }, []);

  // cancel request before unmounted
  useEffect(() => {
    return () => {
      if (autoCancel) {
        controller.current?.abort();
      }
    };
  }, [autoCancel]);

  return { trigger, cancel, loading: result.status === 'pending', ...result };
}

export default useRequest;
