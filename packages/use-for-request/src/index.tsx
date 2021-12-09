import { useCallback, useEffect, useRef, useState } from 'react';
import request from 'for-request';
import ResponseError from 'for-request/dist/error/ResponseError';
import { RequestOptions } from 'for-request/dist/interface';

/** service options */
export type ServiceOptions = { url: string; options?: RequestOptions };

export type BaseOptions<T> = {
  manual?: boolean;
  /** init result data */
  initialData?: T;
  /** cover unfinishied request */
  cover?: boolean;
  onSuccess?: (data: T, fetchOptions: ServiceOptions) => void;
  onError?: (error: ResponseError, fetchOptions: ServiceOptions) => void;
};
export type OptionWithFormat<T, R> = {
  formatter: (data: T) => R;
} & BaseOptions<R>;
export type Options<T, R> = BaseOptions<R> | OptionWithFormat<T, R>;

export type RequestResult<T> = {
  data: T | undefined;
  error: ResponseError | undefined;
  loading: boolean;
};

export type RequestParams = Pick<RequestOptions, 'query' | 'data'>;

export type HookResult<T> = {
  trigger: (params?: RequestParams) => void;
  retry: () => void;
  reset: (data?: T) => void;
  cancel: () => void;
} & RequestResult<T>;

function useRequest<T = any>(
  fetchOptions: ServiceOptions,
  options?: BaseOptions<T>
): HookResult<T>;
function useRequest<T = any, R = any>(
  fetchOptions: ServiceOptions,
  options: OptionWithFormat<T, R>
): HookResult<R>;
function useRequest<T, R>(
  fetchOptions: ServiceOptions,
  options?: Options<T, R>
): HookResult<R> {
  const { url, options: requestOptions } = fetchOptions;
  const { manual, initialData, cover, onSuccess, onError, formatter } = (options ||
    {}) as OptionWithFormat<T, R>;

  const params = useRef<RequestParams>();
  const [result, setResult] = useState<RequestResult<R>>({
    data: initialData,
    error: undefined,
    loading: false,
  });
  const controller = useRef<AbortController>();

  const trigger = useCallback(
    async (requestParams?: RequestParams) => {
      if (cover) {
        controller.current?.abort();
      }
      const paramData: RequestParams = {
        query: requestParams?.query ?? requestOptions?.query,
        data: requestParams?.data ?? requestOptions?.data,
      };
      params.current = paramData;
      setResult(cur => ({ ...cur, loading: true }));
      try {
        controller.current = new AbortController();
        const res = await request<T>(url, {
          ...requestOptions,
          ...paramData,
          signal: controller.current.signal,
        });
        const formarResult = (formatter ? formatter(res) : res) as R;
        setResult({ data: formarResult, error: undefined, loading: false });
        onSuccess && onSuccess(formarResult, fetchOptions);
      } catch (e) {
        setResult({ data: undefined, error: e as ResponseError, loading: false });
        onError && onError(e as ResponseError, fetchOptions);
      }
    },
    [url, requestOptions, cover, onSuccess, onError, formatter]
  );

  const retry = useCallback(() => {
    trigger(params.current);
  }, [trigger]);

  const reset = useCallback((data?: R) => {
    setResult(res => ({ ...res, data: data || initialData }));
  }, []);

  const cancel = useCallback(() => {
    controller.current?.abort();
  }, []);

  // trigger on first render
  useEffect(() => {
    if (!manual) trigger();
  }, []);

  return { ...result, trigger, cancel, reset, retry };
}

export default useRequest;
