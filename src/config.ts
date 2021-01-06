import { RequestOptions } from './interface';

const noop = (_: any) => _;

export type TBeforeHook = (url: string, options: RequestOptions) => void;
export type TAfterHook = (url: string, options: RequestOptions) => void;
export type TDataHook = (
  url: string,
  options: RequestOptions,
  result: any
) => void;
export type TErrorHook = (
  url: string,
  options: RequestOptions,
  error: any
) => void;

class RequestConfig {
  $beforeHook: TBeforeHook = noop;
  $afterHook: TAfterHook = noop;
  $dataHook: TDataHook = noop;
  $errorHook: TErrorHook = noop;

  before(hook: TBeforeHook) {
    this.$beforeHook = hook;
    return this;
  }
  after(hook: TAfterHook) {
    this.$afterHook = hook;
    return this;
  }
  data(hook: TDataHook) {
    this.$dataHook = hook;
    return this;
  }
  error(hook: TErrorHook) {
    this.$errorHook = hook;
    return this;
  }
}

export default RequestConfig;
