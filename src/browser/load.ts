import { BREADCRUMBTYPES, EVENTTYPES } from '../shared';
import { HandleEvents } from './handleEvents';
import { addReplaceHandler } from './replace';
import { handleConsole, breadcrumb } from '../core';
import { htmlElementAsString, Severity } from '../utils';

// 接入监听
export function setupReplace() {
  // XMLHttpRequest请求
  addReplaceHandler({
    callback: data => {
      HandleEvents.handleHttp(data, BREADCRUMBTYPES.XHR);
    },
    type: EVENTTYPES.XHR,
  });
  /// fetch请求
  addReplaceHandler({
    callback: data => {
      HandleEvents.handleHttp(data, BREADCRUMBTYPES.FETCH);
    },
    type: EVENTTYPES.FETCH,
  });
  // 监听资源加载错误
  addReplaceHandler({
    callback: error => {
      HandleEvents.handleError(error);
    },
    type: EVENTTYPES.ERROR,
  });
  // 监听日志
  addReplaceHandler({
    callback: data => {
      handleConsole(data);
    },
    type: EVENTTYPES.CONSOLE,
  });
  // 监听路由
  addReplaceHandler({
    callback: data => {
      HandleEvents.handleHistory(data);
    },
    type: EVENTTYPES.HISTORY,
  });
  addReplaceHandler({
    callback: (e: HashChangeEvent) => {
      HandleEvents.handleHashchange(e);
    },
    type: EVENTTYPES.HASHCHANGE,
  });
  // 监听promise错误
  addReplaceHandler({
    callback: data => {
      HandleEvents.handleUnhandleRejection(data);
    },
    type: EVENTTYPES.UNHANDLEDREJECTION,
  });
  // 监听dom(click事件)
  addReplaceHandler({
    callback: data => {
      const htmlString = htmlElementAsString(data.data.activeElement as HTMLElement);
      if (htmlString) {
        breadcrumb.push({
          type: BREADCRUMBTYPES.CLICK,
          category: breadcrumb.getCategory(BREADCRUMBTYPES.CLICK),
          data: htmlString,
          level: Severity.Info,
        });
      }
    },
    type: EVENTTYPES.DOM,
  });
  // 白屏检测
  addReplaceHandler({
    callback: () => {
      HandleEvents.handleWhiteScreen();
    },
    type: EVENTTYPES.WHITESCREEN,
  });

  // 前端录屏
  addReplaceHandler({
    callback: () => {
      HandleEvents.handleScreen();
    },
    type: EVENTTYPES.RECORDSCREEN,
  });

  // 获取性能指标
  addReplaceHandler({
    callback: () => {
      HandleEvents.handlePerformance();
    },
    type: EVENTTYPES.PERFORMANCE,
  });
}
