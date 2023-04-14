/* eslint-disable @typescript-eslint/ban-types */
import * as R from 'ramda';
// 判断是哪一种类型
export const nativeToString = Object.prototype.toString;
const getType = (type: string) => {
  return function (deliverValue: any) {
    return R.equals(nativeToString.call(deliverValue), `[object ${type}]`);
  };
};

// 判断正常的数据类型
export const variableTypeDetection = {
  isNumber: getType('Number'),
  isString: getType('String'),
  isBoolean: getType('Boolean'),
  isNull: getType('Null'),
  isUndefined: getType('Undefined'),
  isSymbol: getType('Symbol'),
  isFunction: getType('Function'),
  isObject: getType('Object'),
  isArray: getType('Array'),
  isWindow: getType('Window'),
  isProcess: getType('process'),
};

// 判断是否是一个空对象
export function isEmptyObject(obj: Object): boolean {
  return R.and(variableTypeDetection.isObject(obj), R.isEmpty(obj));
}
// 判断是否为空
export function isEmpty(value: string | null | undefined): boolean {
  return (variableTypeDetection.isString(value) && value.trim() === '') || R.isNil(value);
}
// 判断是否是一个实例
export function isInstanceOf(val: any, base: any) {
  return R.is(base, val);
}

// 判断key是否存在对象中
export function isExistProperty(obj: Object, key: string | number | symbol): boolean {
  return R.has(key.toString(), obj);
}

// 判断是否是一个错误
export function isError(err: any): boolean {
  switch (nativeToString.call(err)) {
    case '[object Error]':
      return true;
    case '[object Exception]':
      return true;
    case '[object DOMException]':
      return true;
    default:
      return isInstanceOf(err, Error);
  }
}
