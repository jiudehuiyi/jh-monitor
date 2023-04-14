/* eslint-disable @typescript-eslint/ban-types */
import { nativeToString, variableTypeDetection } from './is';
import { logger } from './logger';
import { globalVar } from '../shared';
import { IResource } from '../types';

// 返回当前时间的时间戳
export function getTimestamp(): number {
  return Date.now();
}

// 使用typeof判断类型
export function typeofAny(val: any, type: any): boolean {
  return typeof val === type;
}
// 使用native判断类型
export function toStringAny(val: any, type: any): boolean {
  return nativeToString.call(val) === type;
}
// 使用typeof校验参数
export function validateOption(value: any, key: string, type: string) {
  if (typeofAny(value, type)) return true;
  typeof value !== undefined &&
    logger.error(`${key}的类型为: ${typeof value}, 并不是期待的: ${type}类型`);
  return false;
}
// 使用native校验参数
export function toStringValidateOption(value: any, key: string, type: string) {
  if (toStringAny(value, type)) return true;
  typeof value !== undefined &&
    logger.error(`${key}的类型为: ${nativeToString.call(value)}, 并不是期待的: ${type}类型`);
  return false;
}

export function slientConsoleScope(callback: Function) {
  globalVar.isLogAddBreadcrumb = false;
  callback();
  globalVar.isLogAddBreadcrumb = true;
}

// resource: 被重写的对象
// key: 被重写的属性
// replaceOldFn: 重写后的方法，并且参数为原属性方法(即 resource[key]),
// isForce: 是否强制重写
// 最后得到结果为: resource[key] = replaceOldFn(resource[key] );
export function replaceOld(
  resource: IResource,
  key: string,
  replaceOldFn: (...args: any[]) => any,
  isForce = false
): void {
  if (!resource) return;
  if (key in resource || isForce) {
    const originWrapper = resource[key];
    const replaceWrapper = replaceOldFn(originWrapper);
    if (typeof replaceWrapper === 'function') {
      resource[key] = replaceWrapper;
    }
  }
}
// 标准生成随机数函数
export function createUUID(t = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', ary = 16) {
  let d = new Date().getTime();
  const uuid = t.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * ary) % ary | 0;
    d = Math.floor(d / ary);
    return (c === 'x' ? r : (r && 0x7) || 0x8).toString(ary);
  });
  return uuid;
}

export function getLocationHref(): string {
  if (typeof document === 'undefined' || document.location == null) return '';
  return document.location.href;
}
export function unknownToString(target: unknown): string {
  if (variableTypeDetection.isString(target)) {
    return target as string;
  }
  if (variableTypeDetection.isUndefined(target)) {
    return 'undefined';
  }
  return JSON.stringify(target);
}
