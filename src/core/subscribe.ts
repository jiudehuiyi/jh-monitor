import { EVENTTYPES } from '../shared';
import { getFlag, logger, setFlag } from '../utils';

type CallbackType = (data: any) => void;
export type ReplaceHandler = {
  type: EVENTTYPES;
  callback: CallbackType;
};
// 含有 { type: callback[] }对应的对象
const handlers: { [key in EVENTTYPES]?: CallbackType[] } = {};
// 监听事件
export function subscribeEvent(handler: ReplaceHandler) {
  // 检查事件是否已经存在
  if (!handler || getFlag(handler.type)) return false;
  setFlag(handler.type, true);
  // 如果存在不在进行注册
  handlers[handler.type] = handlers[handler.type] || [];
  // 如果不存在，则对事件进行注册
  handlers[handler.type].push(handler.callback);
  return true;
}
// 触发事件
export function triggerHandlers(type, data?: any) {
  // 如果传入需要执行的type不存在相应的callback，则返回不再执行
  if (!type || !handlers[type]) return;
  // 否则遍历type对象的函数集合，并以data为参数执行
  handlers[type].forEach(fn => {
    try {
      fn(data);
    } catch (error) {
      logger.error(`重写事件回调报错，请检查`);
    }
  });
}
