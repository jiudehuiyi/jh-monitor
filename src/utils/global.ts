// import * as R from 'ramda';
import { variableTypeDetection } from './is';
import { EVENTTYPES } from '../shared';

// 声明未必存在的变量，防止ts编译错误
declare let wx: any;
declare let App: any;

// node环境
export const isNodeEnv = variableTypeDetection.isProcess(
  typeof process !== 'undefined' ? process : 0
);
// 浏览器环境
export const isWindowEnv = variableTypeDetection.isWindow(
  typeof window !== 'undefined' ? window : 0
);
// 微信小程序环境
export const isWxMiniEnv =
  variableTypeDetection.isObject(typeof wx !== 'undefined' ? wx : 0) &&
  variableTypeDetection.isFunction(typeof App !== 'undefined' ? App : 0);

export const isBrowserEnv = variableTypeDetection.isWindow(
  typeof window !== 'undefined' ? window : 0
);
// 获取全局环境变量
export const getGlobal = <T>() => {
  if (isBrowserEnv) return window as unknown as T;
  else if (isNodeEnv) return process as unknown as T;
  else if (isWxMiniEnv) return wx as unknown as T;
};
// 设置全局变量__MITO__
export function getGlobalMitoSupport(): any {
  (_global as any).__MITO__ = (_global as any).__MITO__ || ({} as any);
  return (_global as any).__MITO__;
}

const _global: any = getGlobal<Window>();
const _support = getGlobalMitoSupport();
export { _global, _support };

// 将初始参数设置在 _global__MITO__, _support.replaceFlag, replaceFlag
_support.replaceFlag = _support.replaceFlag || {};
const replaceFlag = _support.replaceFlag;
// 设置初始化参数
export const setFlag = (replaceType: EVENTTYPES, boolVal): void => {
  if (replaceFlag[replaceType]) return;
  replaceFlag[replaceType] = boolVal;
};

// 获取初始化参数
export const getFlag = (replaceType: EVENTTYPES): boolean => {
  return replaceFlag[replaceType] ? true : false;
};
// 判断是否支持history模式
export function supportsHistory(): boolean {
  const chrome = (_global as any).chrome;
  const isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
  const hasHistoryApi =
    'history' in _global && !!_global.history.pushState && !!_global.history.replaceState;

  return !isChromePackagedApp && hasHistoryApi;
}
