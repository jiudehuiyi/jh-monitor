// 重写部分监控、上报功能
import { ReplaceHandler, setTraceId, transportData, triggerHandlers } from '../core';
import { subscribeEvent } from '../core';
import { EVENTTYPES, HTTPTYPE, HTTP_CODE } from '../shared';
import {
  getLocationHref,
  getTimestamp,
  isExistProperty,
  replaceOld,
  variableTypeDetection,
  _global,
  supportsHistory,
} from '../utils';
import { options } from '../core';
import { EMethods } from '../types';

function isFilterHttpUrl(url: string) {
  return options.filterXhrUrlRegExp && options.filterXhrUrlRegExp.test(url);
}

const xhrReplace = () => {
  if (!('XMLHttpRequest' in _global)) return;
  const originalXhrProto = XMLHttpRequest.prototype;
  // 重写XMLHttpRequest对象的open方法
  replaceOld(originalXhrProto, 'open', originOpen => {
    return function (this: any, ...args: any[]) {
      // 这里直接使用this和将this当作第一个参数是作用一样的
      // args的第一个参数为open传入的第一个参数，也就是请求方法, 当open("get")的时候，此时args[0]即为get, arg[1]为url
      this.mito_xhr = {
        method: variableTypeDetection.isString(args[0]) ? args[0].toUpperCase() : args[0],
        url: args[1],
        sTime: getTimestamp(),
        type: HTTPTYPE.XHR,
      };
      // 调用原生xhr方法open，进行打开, 并将this参数传入调用
      originOpen.apply(this, args);
    };
  });
  // 重写XMLHttpRequest对象的send方法
  replaceOld(originalXhrProto, 'send', originSend => {
    return function (this: any, ...args: any[]) {
      const { method, url } = this.mito_xhr;
      // 为每一个xhr请求设置一个独一无二的随机数，为了方便排查或者寻找请求
      setTraceId(url, (headerFieldName: string, traceId: string) => {
        this.mito_xhr.traceId = traceId;
        this.setRequestHeader(headerFieldName, traceId);
      });
      // 发送xhr send发送前进行处理
      options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method, url }, this);
      // 添加loadend事件监听，无论是成功或者失败都会触发
      this.addEventListener('loadend', function (this) {
        if (
          (method === EMethods.Post && transportData.isSdkTransportUrl(url)) ||
          isFilterHttpUrl(url)
        )
          return;
        const { responseType, response, status } = this;
        this.mito_xhr.reqData = args[0];
        const eTime = getTimestamp();
        this.mito_xhr.time = this.mito_xhr.sTime;
        this.mito_xhr.status = status;
        if (['', 'json', 'text'].indexOf(responseType) !== -1) {
          this.mito_xhr.responseText =
            typeof response === 'object' ? JSON.stringify(response) : response;
        }
        // send 和 open方法之间的时间差
        this.mito_xhr.elapsedTime = eTime - this.mito_xhr.sTime;
        // this.mito_xhr 为xhr上报此时请求的数据
        triggerHandlers(EVENTTYPES.XHR, this.mito_xhr);
      });
      originSend.apply(this, args);
    };
  });
};
const fetchReplace = () => {
  if (!('fetch' in _global)) return;
  replaceOld(_global, 'fetch', originFetch => {
    return function (url: string, config: any) {
      // 上报数据
      const method = (config && config.method) || 'GET';
      let handlerData: any = {
        method,
        url,
        sTime: getTimestamp(),
        type: HTTPTYPE.FETCH,
        reqData: config && config.body,
      };
      const headers = new Headers(config?.headers || {});
      Object.assign(headers, {
        setRequestHeader: headers.set,
      });

      // 为每一个fetch请求设置一个独一无二的随机数，为了方便排查或者寻找请求
      setTraceId(url, (headerFieldName: string, traceId: string) => {
        handlerData.traceId = traceId;
        headers.set(headerFieldName, traceId);
      });
      // 发送xhr send发送前进行处理
      options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method, url }, headers);
      config = {
        ...config,
        headers,
      };
      // fetch需要返回一个新的promise
      return originFetch.apply(_global, [url, config]).then(
        (res: Response) => {
          handlerData = {
            ...handlerData,
            elapsedTime: getTimestamp() - handlerData.sTime,
            status: res.status,
            statusText: res.statusText,
            time: handlerData.sTime,
          };
          const tempRes = res.clone();
          tempRes.text().then(data => {
            if (method === EMethods.Post && transportData.isSdkTransportUrl(url)) return;
            if (isFilterHttpUrl(url)) return;
            handlerData.responseText = tempRes.status > HTTP_CODE.UNAUTHORIZED && data;
            triggerHandlers(EVENTTYPES.FETCH, handlerData);
          });
          return res;
        },
        (err: Error) => {
          console.log('errerr', err);
          if (method === EMethods.Post && transportData.isSdkTransportUrl(url)) return;
          if (isFilterHttpUrl(url)) return;
          handlerData = {
            ...handlerData,
            elapsedTime: getTimestamp() - handlerData.sTime,
            status: 0,
            statusText: 'fetch error',
            time: getTimestamp(),
          };
          triggerHandlers(EVENTTYPES.FETCH, handlerData);
          throw err;
        }
      );
    };
  });
};
const listenError = () => {
  // 监听资源加载错误，这里必须为捕获才能对资源错误进行捕抓
  _global.addEventListener(
    'error',
    function (e: Error) {
      triggerHandlers(EVENTTYPES.ERROR, e);
    },
    true
  );
};
const consoleReplace = () => {
  if (!('console' in _global)) return;
  const consoleType = ['log', 'warn', 'error', 'info', 'assert', 'debug'];
  consoleType.forEach(level => {
    if (!(level in _global.console)) return;
    if (!options.isCloseConsoleReport && level === 'log') return; // 默认关闭console.log的上报功能, 可设置isCloseConsoleReport开启
    replaceOld(_global.console, level, originConsole => {
      return (...args: any[]) => {
        if (originConsole) {
          triggerHandlers(EVENTTYPES.CONSOLE, { args, level });
          originConsole.apply(_global.console, args);
        }
      };
    });
  });
};
const listenHashchange = () => {
  // 监听hash路由
  if (isExistProperty(_global, 'onpopstate')) {
    _global.addEventListener('onpopstate', function (e: HashChangeEvent) {
      triggerHandlers(EVENTTYPES.HASHCHANGE, e);
    });
  }
};
let lastHref: string;
lastHref = getLocationHref();
const historyReplace = () => {
  // 监听history模式
  if (!supportsHistory()) return;
  const oldOnpopstate = _global.onpopstate;
  _global.onpopstate = function (this: any, ...args: any[]): any {
    const to = getLocationHref();
    const from = lastHref;
    lastHref = to;
    triggerHandlers(EVENTTYPES.HISTORY, {
      from,
      to,
    });
    oldOnpopstate && oldOnpopstate.apply(this, args);
  };

  function historyReplaceFn(originalHistoryFn) {
    return function (this: History, ...args: any[]): void {
      const url = args.length > 2 ? args[2] : undefined;
      if (url) {
        const from = lastHref;
        const to = String(url);
        lastHref = to;
        triggerHandlers(EVENTTYPES.HISTORY, {
          from,
          to,
        });
      }
      return originalHistoryFn.apply(this, args);
    };
  }

  replaceOld(_global.history, 'pushState', historyReplaceFn);
  replaceOld(_global.history, 'replaceState', historyReplaceFn);
};
const domReplace = () => {
  if (!('document' in _global)) return;
  _global.document.addEventListener(
    'click',
    function (ev) {
      triggerHandlers(EVENTTYPES.DOM, {
        category: ev.type || 'click',
        data: this,
        srcElement: ev.srcElement,
        target: ev.target,
        pointerType: ev.pointerType,
        bubbles: ev.bubbles,
      });
    },
    true
  );
};
const unhandledrejectionReplace = () => {
  // 捕获unhandledrejection错误
  _global.addEventListener(EVENTTYPES.UNHANDLEDREJECTION, function (ev: PromiseRejectionEvent) {
    triggerHandlers(EVENTTYPES.UNHANDLEDREJECTION, ev);
  });
};
const whiteScreen = () => {
  // 默认开启白屏检测
  if (options.silentWhiteScreen) {
    triggerHandlers(EVENTTYPES.WHITESCREEN);
  }
};

function recordScreen(): void {
  if (options.silentRecordScreen) {
    // 默认不开启视频录屏
    triggerHandlers(EVENTTYPES.RECORDSCREEN);
  }
}
function listenPerformance(): void {
  // 监控性能
  triggerHandlers(EVENTTYPES.PERFORMANCE);
}

function replace(type: EVENTTYPES) {
  switch (type) {
    case EVENTTYPES.XHR:
      xhrReplace();
      break;
    case EVENTTYPES.FETCH:
      fetchReplace();
      break;
    case EVENTTYPES.ERROR:
      listenError();
      break;
    case EVENTTYPES.CONSOLE:
      consoleReplace();
      break;
    case EVENTTYPES.HISTORY:
      historyReplace();
      break;
    case EVENTTYPES.UNHANDLEDREJECTION:
      unhandledrejectionReplace();
      break;
    case EVENTTYPES.DOM:
      domReplace();
      break;
    case EVENTTYPES.HASHCHANGE:
      listenHashchange();
      break;
    case EVENTTYPES.WHITESCREEN:
      whiteScreen();
      break;
    case EVENTTYPES.RECORDSCREEN:
      recordScreen();
      break;
    case EVENTTYPES.PERFORMANCE:
      listenPerformance();
      break;
    default:
      break;
  }
}

export function addReplaceHandler(handler: ReplaceHandler) {
  if (!subscribeEvent(handler)) return;
  replace(handler.type as EVENTTYPES);
}
