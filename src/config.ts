import {
  RequestConfig,
  RequestOptions,
  TAfterHook,
  TBeforeHook,
  TDataHook,
  TErrorHook,
} from './interface';

const noop = (_: any) => _;

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
