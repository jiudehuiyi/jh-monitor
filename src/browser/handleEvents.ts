import {
  BREADCRUMBTYPES,
  HTTP_CODE,
  ERRORTYPES,
  ERROR_TYPE_RE,
  EVENTTYPES,
  STATUS_CODE,
} from '../shared';
import {
  transportData,
  breadcrumb,
  httpTransform,
  resourceTransform,
  options,
  openWhiteScreen,
  getWebVitals,
  getResource,
} from '../core';
import {
  Severity,
  isError,
  extractErrorStack,
  getTimestamp,
  parseUrlToObj,
  logger,
  _support,
  createUUID,
  zip,
  _global,
} from '../utils';
import { record } from 'rrweb';

export const HandleEvents = {
  handleHttp(data: any, type: BREADCRUMBTYPES) {
    const isError =
      data.status === 0 ||
      data.status === HTTP_CODE.BAD_REQUEST ||
      data.status > HTTP_CODE.UNAUTHORIZED;

    const result = httpTransform(data);
    breadcrumb.push({
      type,
      data: { ...result },
      time: data.time,
      category: breadcrumb.getCategory(type),
    });
    if (isError) {
      breadcrumb.push({
        type,
        category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
        data: { ...result },
        level: Severity.Error,
        time: data.time,
      });
      transportData.send(result);
    }
  },
  handleError(errorEvent: ErrorEvent) {
    const target = errorEvent.target as any;
    // 资源加载错误
    if (target.localName) {
      // 当存在资源加载错误名字
      const data = resourceTransform(target);
      breadcrumb.push({
        type: BREADCRUMBTYPES.RESOURCE,
        category: breadcrumb.getCategory(BREADCRUMBTYPES.RESOURCE),
        data,
        level: Severity.Error,
      });
      return transportData.send(data);
    }

    // 代码错误
    const { message, filename, lineno, colno, error } = errorEvent;
    let result: any;
    if (error && isError(error)) {
      result = extractErrorStack(error, Severity.Normal);
    }
    result || (result = HandleEvents.handleNotErrorInstance(message, filename, lineno, colno));
    result.type = ERRORTYPES.JAVASCRIPT_ERROR;
    breadcrumb.push({
      type: BREADCRUMBTYPES.CODE_ERROR,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
      data: { ...result },
      level: Severity.Error,
    });
    transportData.send(result);
  },
  handleNotErrorInstance(message: string, filename: string, lineno: number, colno: number) {
    let name: string | ERRORTYPES = ERRORTYPES.UNKNOWN;
    const url = filename || document?.location?.href;
    let msg = message;
    const matches = message.match(ERROR_TYPE_RE);
    if (matches[1]) {
      name = matches[1];
      msg = matches[2];
    }
    const element = {
      url,
      func: ERRORTYPES.UNKNOWN_FUNCTION,
      args: ERRORTYPES.UNKNOWN,
      line: lineno,
      col: colno,
    };
    return {
      url,
      name,
      message: msg,
      level: Severity.Normal,
      time: getTimestamp(),
      stack: [element],
    };
  },
  handleHistory(data: any) {
    const { from, to } = data;
    const { relative: parsedFrom } = parseUrlToObj(from);
    const { relative: parsedTo } = parseUrlToObj(to);
    breadcrumb.push({
      type: BREADCRUMBTYPES.ROUTE,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
      data: {
        from: parsedFrom ? parsedFrom : '/',
        to: parsedTo ? parsedTo : '/',
      },
      level: Severity.Info,
    });
    const { onRouteChange } = options;
    if (onRouteChange) {
      onRouteChange(from, to);
    }
  },
  handleHashchange(data: HashChangeEvent) {
    const { oldURL, newURL } = data;
    const { relative: from } = parseUrlToObj(oldURL);
    const { relative: to } = parseUrlToObj(newURL);
    breadcrumb.push({
      type: BREADCRUMBTYPES.ROUTE,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
      data: {
        from,
        to,
      },
      level: Severity.Info,
    });
    // 当存在onRouteChange的hash路由跳转的回调，会进行调用
    const { onRouteChange } = options;
    if (onRouteChange) {
      onRouteChange(from, to);
    }
  },
  handleUnhandleRejection(ev: any) {
    let data = {
      type: ERRORTYPES.PROMISE_ERROR,
      message: ev.reason && JSON.stringify(ev.reason),
      url: document?.location?.href,
      name: ev.type,
      time: getTimestamp(),
      level: Severity.Low,
    };

    if (isError(ev.reason)) {
      data = {
        ...data,
        ...extractErrorStack(ev.reason, Severity.Low),
      };
    }
    breadcrumb.push({
      type: BREADCRUMBTYPES.UNHANDLEDREJECTION,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.UNHANDLEDREJECTION),
      data: { ...data },
      level: Severity.Error,
    });
    transportData.send(data);
  },
  // 检测白屏
  handleWhiteScreen() {
    try {
      openWhiteScreen(res => {
        // res: ok为不是白屏，error为白屏
        // 上报白屏检测信息, 当出现错误才上报白屏错误
        if (res === 'error') {
          transportData.send({
            type: EVENTTYPES.WHITESCREEN,
            time: getTimestamp(),
            url: document?.location?.href,
            ...res,
          });
        }
      }, options);
    } catch (error) {
      logger.error(`白屏检测错误:${error}`);
    }
  },
  // 录屏幕
  handleScreen() {
    try {
      // 存储录屏信息
      let events = [];
      record({
        emit(event, isCheckout) {
          // 此段时间内发生错误，上报录屏信息, isCheckout为true的时候为页面报错
          if (isCheckout) {
            if (_support.hasError) {
              const recordScreenId = _support.recordScreenId;
              _support.recordScreenId = createUUID();
              const data = {
                type: EVENTTYPES.RECORDSCREEN,
                recordScreenId,
                time: getTimestamp(),
                status: STATUS_CODE.OK,
                originEvents: events,
                events: zip(events),
              };
              transportData.send(data);
              events = [];
              _support.hasError = false;
            } else {
              // 不上报，清空录屏
              events = [];
              _support.recordScreenId = createUUID();
            }
          }

          events.push(event);
        },
        recordCanvas: true,
        checkoutEveryNms: 1000 * (options.recordScreentime || 10),
      });
    } catch (error) {
      logger.error(`录屏检测错误:${error}`);
    }
  },
  // 检测性能
  handlePerformance() {
    if (!options.silentPerformance) return;
    try {
      getWebVitals(result => {
        transportData.send({
          type: EVENTTYPES.PERFORMANCE,
          status: STATUS_CODE.OK,
          time: Date.now(),
          ...result,
        });
      });
    } catch (error) {
      logger.error(`性能指标获取错误: ${error}`);
    }

    //  长任务
    const observer = new PerformanceObserver(list => {
      for (const long of list.getEntries()) {
        // 上报长任务详情 可以检测到浏览器内核主线程卡顿时间超过50ms的异常
        transportData.send({
          cName: '长任务',
          type: EVENTTYPES.PERFORMANCE,
          name: 'longTask',
          longTask: long,
          time: Date.now(),
          status: STATUS_CODE.OK,
        });
      }
    });

    observer.observe({
      entryTypes: ['longtask'],
    });

    _global.addEventListener('load', function () {
      // 上报资源列表
      transportData.send({
        cName: '资源列表',
        type: EVENTTYPES.PERFORMANCE,
        name: 'resource_list',
        time: Date.now(),
        status: STATUS_CODE.OK,
        resourceList: getResource(),
      });
      const _performance = performance as any;
      // 上报内存情况, safari、firefox不支持该属性
      if (_performance.memory) {
        transportData.send({
          type: EVENTTYPES.PERFORMANCE,
          name: 'memory',
          time: getTimestamp(),
          status: STATUS_CODE.OK,
          memory: {
            jsHeapSizeLimit: _performance?.memory?.jsHeapSizeLimit,
            totalJSHeapSize: _performance?.memory?.totalJSHeapSize,
            usedJSHeapSize: _performance?.memory?.usedJSHeapSize,
          },
        });
      }
    });
  },
};
