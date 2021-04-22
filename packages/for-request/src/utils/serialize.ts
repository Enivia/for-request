import { stringify } from 'qs';

/**
 * is undefined or null
 * @param val
 */
export function isUoN(val: any) {
  return val === undefined || val === null;
}

export function getPrototype(obj: object) {
  return Object.prototype.toString.call(obj);
}

export function isURLSearchParams(val: any): boolean {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

export function isArray(val: any): boolean {
  return typeof val === 'object' && getPrototype(val) === '[object Array]';
}

export function isDate(val: any): boolean {
  return typeof val === 'object' && getPrototype(val) === '[object Date]';
}

export function isObject(val: any): boolean {
  return val !== null && typeof val === 'object';
}

/**
 * qs stringify params https://github.com/ljharb/qs
 * @param params
 */
export function stringifyParams(params: any) {
  return stringify(params, { arrayFormat: 'repeat', strictNullHandling: true });
}

/**
 * for each object and array
 * @param target
 * @param callback
 */
export function forEachObjectNArray(
  target: any,
  callback: (value: any, key: any, target: any) => void
) {
  if (!target) return;

  if (typeof target !== 'object') {
    target = [target];
  }

  if (isArray(target)) {
    for (let i = 0; i < target.length; i++) {
      callback.call(null, target[i], i, target);
    }
  } else {
    for (let key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        callback.call(null, target[key], key, target);
      }
    }
  }
}

/**
 * param fields to string
 * @param value
 */
export function value2String(value: any) {
  if (isUoN(value) || isArray(value)) {
    return value;
  } else if (isObject(value)) {
    return JSON.stringify(value);
  } else if (isDate(value)) {
    return value.toISOString();
  }
  return value;
}

/**
 * serialize params
 * @param params
 */
export default function serialize(params: any) {
  if (!params) return '';

  if (isURLSearchParams(params)) {
    return params.toString();
  }

  if (isArray(params)) {
    const array: any[] = [];
    forEachObjectNArray(params, (item: any) => array.push(value2String(item)));
    return stringifyParams(array);
  }

  const params2String: { [k: string]: string } = {};
  forEachObjectNArray(params, (value, key) => {
    let stringifiedValue = value2String(value);
    params2String[key] = stringifiedValue;
  });
  return stringifyParams(params2String);
}
