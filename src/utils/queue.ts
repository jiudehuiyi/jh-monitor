import { _global } from './global';
// 使用异步(Promise.then)调用执行函数
export class Queue {
  micro: Promise<void>; // 缓存promise.resolve()
  stack = []; // 存储函数栈
  isFlushing = false; // 是否正在执行的一个flag

  constructor() {
    // 判断全局环境下是否存在promise， 存在赋值Promise.resolve()
    if (!('Promise' in _global)) return;
    this.micro = Promise.resolve();
  }
  addFn(callback: any): void {
    // 参数必须为一个函数
    if (typeof callback !== 'function') return;
    // 当不存在promise的时候，直接执行参数函数
    if (!('requestIdleCallback' in _global || 'Promise' in _global)) {
      callback();
      return;
    }
    this.stack.push(callback);
    // 异步微任务执行函数
    if (!this.isFlushing) {
      this.isFlushing = true;
      // 优先使用requestIdleCallback
      if ('requestIdleCallback' in _global) {
        requestIdleCallback(() => this.flushStack());
      } else {
        // 其次使用微任务上报
        Promise.resolve().then(() => this.flushStack());
      }
    }
  }
  // 清空函数栈
  clear(): void {
    this.stack = [];
  }
  // 获取整个函数栈
  getStack() {
    return this.stack;
  }
  // 执行函数
  flushStack() {
    const tempCallback = this.stack.slice(0);
    this.isFlushing = false;
    this.stack.length = 0;
    tempCallback.forEach(fn => fn());
  }
}
