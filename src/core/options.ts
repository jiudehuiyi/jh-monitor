/* eslint-disable @typescript-eslint/ban-types */
import { EVENTTYPES, ERRORTYPES } from '../shared';
import {
  setSilentFlag,
  _global,
  logger,
  _support,
  validateOption,
  toStringValidateOption,
  createUUID,
} from '../utils';
import { breadcrumb } from './breadcrumb';
import { transportData } from './transportData';

export class Options {
  beforeAppAjaxSend: Function = () => {};
  enableTraceId: boolean;
  filterXhrUrlRegExp: RegExp;
  includeHttpUrlTraceIdRegExp: RegExp;
  traceIdFieldName = 'Trace-Id';
  throttleDelayTime = 0;
  maxDuplicateCount = 2;
  isCloseConsoleReport; // 默认关闭console上报
  whiteBoxElements: string[]; // // 白屏检测的容器列表
  silentWhiteScreen = true; // 是否开启白屏检测
  skeletonProject = false; // 项目是否有骨架屏
  silentRecordScreen = false; // 是否开启录屏
  recordScreentime = 10; // 默认录屏时长
  recordScreenTypeList: string[]; // 上报录屏的错误列表
  silentPerformance = false; // 是否开启监控性能
  useBeacon = false; // 使用beacon上报
  appOnLaunch: Function = () => {};
  appOnShow: Function = () => {};
  onPageNotFound: Function = () => {};
  appOnHide: Function = () => {};
  pageOnUnload: Function = () => {};
  pageOnShow: Function = () => {};
  pageOnHide: Function = () => {};
  onShareAppMessage: Function = () => {};
  onShareTimeline: Function = () => {};
  onTabItemTap: Function = () => {};
  wxNavigateToMiniProgram: Function;
  triggerWxEvent: Function = () => {};
  onRouteChange?: Function;
  constructor() {
    this.enableTraceId = false;
    this.whiteBoxElements = ['html', 'body', '#root']; // 白屏检测的父容器列表
    this.recordScreenTypeList = [
      // 录屏事件集合
      EVENTTYPES.ERROR,
      EVENTTYPES.UNHANDLEDREJECTION,
      EVENTTYPES.RESOURCE,
      EVENTTYPES.FETCH,
      EVENTTYPES.XHR,
      ERRORTYPES.FETCH_ERROR,
      ERRORTYPES.REACT_ERROR,
      ERRORTYPES.VUE_ERROR,
      ERRORTYPES.RESOURCE_ERROR,
      ERRORTYPES.PROMISE_ERROR,
    ];
  }
  bindOptions(options: any): void {
    const {
      beforeAppAjaxSend,
      enableTraceId,
      filterXhrUrlRegExp,
      traceIdFieldName,
      throttleDelayTime,
      isCloseConsoleReport,
      includeHttpUrlTraceIdRegExp,
      silentWhiteScreen,
      whiteBoxElements,
      skeletonProject,
      recordScreentime,
      silentRecordScreen,
      recordScreenTypeList,
      silentPerformance,
      useBeacon,
      appOnLaunch,
      appOnShow,
      appOnHide,
      pageOnUnload,
      pageOnShow,
      pageOnHide,
      onPageNotFound,
      onShareAppMessage,
      onShareTimeline,
      onTabItemTap,
      wxNavigateToMiniProgram,
      triggerWxEvent,
      maxDuplicateCount,
      onRouteChange,
    } = options;
    beforeAppAjaxSend &&
      validateOption(beforeAppAjaxSend, 'beforeAppAjaxSend', 'function') &&
      (this.beforeAppAjaxSend = beforeAppAjaxSend);

    // 浏览器 hooks函数
    onRouteChange &&
      validateOption(onRouteChange, 'onRouteChange', 'function') &&
      (this.onRouteChange = onRouteChange);

    enableTraceId &&
      validateOption(enableTraceId, 'enableTraceId', 'boolean') &&
      (this.enableTraceId = enableTraceId);
    traceIdFieldName &&
      validateOption(traceIdFieldName, 'traceIdFieldName', 'string') &&
      (this.traceIdFieldName = traceIdFieldName);
    throttleDelayTime &&
      validateOption(throttleDelayTime, 'throttleDelayTime', 'number') &&
      (this.throttleDelayTime = throttleDelayTime);
    maxDuplicateCount &&
      validateOption(maxDuplicateCount, 'maxDuplicateCount', 'number') &&
      (this.maxDuplicateCount = maxDuplicateCount);
    validateOption(isCloseConsoleReport, 'isCloseConsoleReport', 'boolean') &&
      (this.isCloseConsoleReport = isCloseConsoleReport);
    filterXhrUrlRegExp &&
      toStringValidateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', '[object RegExp]') &&
      (this.filterXhrUrlRegExp = filterXhrUrlRegExp);
    includeHttpUrlTraceIdRegExp &&
      toStringValidateOption(
        includeHttpUrlTraceIdRegExp,
        'includeHttpUrlTraceIdRegExp',
        '[object RegExp]'
      ) &&
      (this.includeHttpUrlTraceIdRegExp = includeHttpUrlTraceIdRegExp);
    validateOption(silentWhiteScreen, 'silentWhiteScreen', 'boolean') &&
      (this.silentWhiteScreen = silentWhiteScreen);
    validateOption(skeletonProject, 'skeletonProject', 'boolean') &&
      (this.skeletonProject = skeletonProject);
    validateOption(whiteBoxElements, 'whiteBoxElements', 'array') &&
      (this.whiteBoxElements = whiteBoxElements);
    validateOption(recordScreentime, 'recordScreentime', 'number') &&
      (this.recordScreentime = recordScreentime);
    if (validateOption(silentRecordScreen, 'silentRecordScreen', 'boolean')) {
      this.silentRecordScreen = silentRecordScreen;
      _support.recordScreenId = createUUID(); // 添加初始的recordScreenId
    }
    validateOption(recordScreenTypeList, 'recordScreenTypeList', 'array') &&
      (this.recordScreenTypeList = recordScreenTypeList);
    validateOption(silentPerformance, 'silentPerformance', 'boolean') &&
      (this.silentPerformance = silentPerformance);
    validateOption(useBeacon, 'useBeacon', 'boolean') && (this.useBeacon = useBeacon);
  }
}

const options = _support.options || (_support.options = new Options());
export { options };

export function setTraceId(
  httpUrl: string,
  callback: (headerFieldName: string, traceId: string) => void
) {
  const { enableTraceId } = options;
  if (enableTraceId && httpUrl) {
    const traceId = createUUID();
    callback(options.traceIdFieldName, traceId);
  }
}

// 初始化参数
export function initOptions(paramOptions: any) {
  setSilentFlag(paramOptions); // 设置默认参数
  logger.bindOptions(paramOptions.debug); // 设置日志行为
  breadcrumb.bindOptions(paramOptions); // 设置用户行为
  options.bindOptions(paramOptions); // 注册相关钩子函数
  transportData.bindOptions(paramOptions); // 注册上报行为
}
