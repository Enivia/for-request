import {
  RequestConfig,
  RequestOptionsInit,
  AfterHook,
  BeforeHook,
  DataHook,
  ErrorHook,
} from './interface';

const noop = (_: any) => _;

class Config {
  options: RequestOptionsInit = {};
  $beforeHook: BeforeHook = noop;
  $afterHook: AfterHook = noop;
  $dataHook: DataHook = noop;
  $errorHook: ErrorHook = noop;

  setOptions(options: RequestOptionsInit): RequestConfig {
    this.options = options;
    return this;
  }
  before(hook: BeforeHook): RequestConfig {
    this.$beforeHook = hook;
    return this;
  }
  after(hook: AfterHook): RequestConfig {
    this.$afterHook = hook;
    return this;
  }
  data(hook: DataHook): RequestConfig {
    this.$dataHook = hook;
    return this;
  }
  error(hook: ErrorHook): RequestConfig {
    this.$errorHook = hook;
    return this;
  }
}

export default Config;
