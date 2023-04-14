import { globalVar, ERRORTYPES, BREADCRUMBTYPES } from '../shared';
import { fromHttpStatus, SpanStatus, Severity, getTimestamp } from '../utils';
import { getRealPath } from './errorId';
import { breadcrumb } from './breadcrumb';
// 对xhr，fetch数据进行处理
export function httpTransform(data: any): any {
  let message = '';
  const { elapsedTime, time, method, traceId, type, status } = data;
  const name = `${type}-${method}`;
  if (status === 0) {
    message =
      elapsedTime <= globalVar.crossOriginThreshold
        ? 'http请求失败，失败原因：跨域限制或域名不存在'
        : 'http请求失败，失败原因：超时';
  } else {
    message = fromHttpStatus(status);
  }
  message = message === SpanStatus.Ok ? message : `${message} ${getRealPath(data.url)}`;
  return {
    type: ERRORTYPES.FETCH_ERROR, // 类型错误 xhr | fetch
    url: document?.location?.href, // 页面当前url
    time, //当前时间
    elapsedTime, // 完成请求时间间隔
    level: Severity.Low, // 严重程度
    message, // 请求失败错误原因
    name,
    // 请求信息
    request: {
      httpType: type,
      traceId,
      method,
      url: data.url,
      data: data.reqData || '',
    },
    // 响应信息
    response: {
      status,
      data: data.responseText,
    },
  };
}

// 对资源错误数据进行处理
export function resourceTransform(target: any): any {
  return {
    type: ERRORTYPES.RESOURCE_ERROR,
    url: document?.location?.href,
    message: `资源地址为：${target.src || target.href}`,
    level: Severity.Error,
    time: getTimestamp(),
    name: `${target.localName}加载失败`,
  };
}

export function handleConsole(data: any): void {
  if (globalVar.isLogAddBreadcrumb) {
    breadcrumb.push({
      type: BREADCRUMBTYPES.CONSOLE,
      category: breadcrumb.getCategory(BREADCRUMBTYPES.CONSOLE),
      data,
      level: Severity[data.level] || Severity.Else,
    });
  }
}
