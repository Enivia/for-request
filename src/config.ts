import { RequestOptions } from './interface';

const noop = (_: any) => _;

export type TBeforeHook = (url: string, options: RequestOptions) => void;
export type TAfterHook = (url: string, options: RequestOptions) => void;
export type TDataHook = (
  result: any,
  url: string,
  options: RequestOptions
) => any;
export type TErrorHook = (
  error: any,
  url: string,
  options: RequestOptions
) => any;

class RequestConfig {
  options: RequestOptions = {};
  $beforeHook: TBeforeHook = noop;
  $afterHook: TAfterHook = noop;
  $dataHook: TDataHook = noop;
  $errorHook: TErrorHook = noop;

  setOptions(options: RequestOptions) {
    this.options = options;
  }
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
