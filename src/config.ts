import { RequestOptions } from './interface';

const noop = (_: any) => _;

export type TBeforeHook = (url: string, options: RequestOptions) => void;
export type TAfterHook = (url: string, options: RequestOptions) => void;
export type TDataHook = (result: any, url: string, options: RequestOptions) => any;
export type TErrorHook = (error: any, url: string, options: RequestOptions) => any;

type RequestConfig = Pick<Config, 'setOptions' | 'before' | 'after' | 'data' | 'error'>;

class Config {
  options: RequestOptions = {};
  $beforeHook: TBeforeHook = noop;
  $afterHook: TAfterHook = noop;
  $dataHook: TDataHook = noop;
  $errorHook: TErrorHook = noop;

  setOptions(options: RequestOptions): RequestConfig {
    this.options = options;
    return this;
  }
  before(hook: TBeforeHook): RequestConfig {
    this.$beforeHook = hook;
    return this;
  }
  after(hook: TAfterHook): RequestConfig {
    this.$afterHook = hook;
    return this;
  }
  data(hook: TDataHook): RequestConfig {
    this.$dataHook = hook;
    return this;
  }
  error(hook: TErrorHook): RequestConfig {
    this.$errorHook = hook;
    return this;
  }
}

export default Config;
export { RequestConfig };
