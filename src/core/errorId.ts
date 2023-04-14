import { ERRORTYPES, EVENTTYPES } from '../shared';
import { variableTypeDetection } from '../utils';
import { options } from './options';
const allErrorNumber: unknown = {};
// 获取真正的路径
// http:xxx/user?username=qiujiahui => http:xxx/user
// http:xxx/${user} => http:xxx/huang
export function getRealPath(url: string): string {
  return url.replace(/[\?#].*$/, '').replace(/\/\d+([\/]*$)/, '{param}$1');
}
// 排序object的key
export function objectOrder(reason: any) {
  const sortFn = (obj: any) => {
    return Object.keys(obj)
      .sort()
      .reduce((total, key) => {
        if (variableTypeDetection.isObject(obj[key])) {
          total[key] = sortFn(obj[key]);
        } else {
          total[key] = obj[key];
        }
        return total;
      }, {});
  };
  try {
    if (/\{.*\}/.test(reason)) {
      let obj = JSON.parse(reason);
      obj = sortFn(obj);
      return JSON.stringify(obj);
    }
  } catch (error) {
    return reason;
  }
}

//  如果是UNHANDLEDREJECTION，则按照项目主域名来生成
// 如果是其他的，按照当前页面来生成
export function generatePromiseErrorId(data: any, apikey: string) {
  const locationUrl = getRealPath(data.url);
  if (data.name === EVENTTYPES.UNHANDLEDREJECTION) {
    return data.type + objectOrder(data.message) + apikey;
  }
  return data.type + data.name + objectOrder(data.message) + locationUrl;
}

export function hashCode(str: string): number {
  let hash = 0;
  if (str.length == 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}

export function createErrorId(data: any, apikey: string): number | null {
  let id: any;
  switch (data.type) {
    case ERRORTYPES.FETCH_ERROR: // http网路类型错误
      id =
        data.type +
        data.request.method +
        data.response.status +
        getRealPath(data.request.url) +
        apikey;
      break;
    // js react vue 错误
    case ERRORTYPES.JAVASCRIPT_ERROR:
    case ERRORTYPES.VUE_ERROR:
    case ERRORTYPES.REACT_ERROR:
      id = data.type + data.name + data.message + apikey;
      break;
    // 日志错误
    case ERRORTYPES.LOG_ERROR:
      id = data.customTag + data.type + data.name + apikey;
      break;
    // promise错误
    case ERRORTYPES.PROMISE_ERROR:
      id = generatePromiseErrorId(data, apikey);
      break;
    default:
      id = data.type + data.message + apikey;
      break;
  }
  // 对错误字符串编码
  id = hashCode(id);
  if (allErrorNumber[id] >= options.maxDuplicateCount) {
    return null;
  }
  if (typeof allErrorNumber[id] === 'number') {
    allErrorNumber[id]++;
  } else {
    allErrorNumber[id] = 1;
  }

  return id;
}
