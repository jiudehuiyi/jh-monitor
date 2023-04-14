import { BREADCRUMBTYPES, BREADCRUMBCATEGORYS } from '../shared';
import { logger, validateOption, getTimestamp, slientConsoleScope, _support } from '../utils';
import { BreadcrumbPushData } from '../types';
// 记录用户行为
export class Breadcrumb {
  maxBreadcrumbs = 20; // 用户行为最大行为栈
  beforePushBreadcrumb: any; // 用户推入行为栈之前对数据做处理，不返回数据则不推入栈
  stack: BreadcrumbPushData[] = [];
  constructor() {}

  // 添加用户行为栈
  push(data: any) {
    if (typeof this.beforePushBreadcrumb === 'function') {
      let result: BreadcrumbPushData;
      const beforePushBreadcrumb = this.beforePushBreadcrumb;
      slientConsoleScope(() => {
        result = beforePushBreadcrumb(this, data);
      });
      if (!result) return;
      this.immediatePush(result);
      return;
    }
    this.immediatePush(data);
  }

  immediatePush(data: any) {
    // 当推入的行为栈没有时间，则设置一个默认的时间
    data.time || (data.time = getTimestamp());
    // 当栈满了之后，准讯lru规则，将时间较久远(time越小时间越久远)
    if (this.stack.length >= this.maxBreadcrumbs) {
      this.shift();
    }
    // 推入数据行为栈，同时依据time进行排序(最新的行为的时间在栈顶),
    this.stack.push(data);
    this.stack.sort((a, b) => a.time - b.time);
    logger.log(this.stack);
  }
  // 删除栈底元素
  shift(): boolean {
    return this.stack.shift() !== undefined;
  }
  // 清空栈
  clear(): void {
    this.stack = [];
  }
  // 获取整个行为栈
  getStack(): BreadcrumbPushData[] {
    return this.stack;
  }
  // 获取某个行为栈
  getStackIndex(index: number): BreadcrumbPushData {
    return this.stack[index];
  }
  // 获取行为栈顶
  getStackTop(): BreadcrumbPushData {
    return this.stack[this.stack.length];
  }
  // 获取类型
  getCategory(type: BREADCRUMBTYPES) {
    switch (type) {
      case BREADCRUMBTYPES.XHR:
      case BREADCRUMBTYPES.FETCH:
        return BREADCRUMBCATEGORYS.HTTP;
      case BREADCRUMBTYPES.CLICK:
      case BREADCRUMBTYPES.ROUTE:
      case BREADCRUMBTYPES.TAP:
      case BREADCRUMBTYPES.TOUCHMOVE:
        return BREADCRUMBCATEGORYS.USER;
      case BREADCRUMBTYPES.CUSTOMER:
      case BREADCRUMBTYPES.CONSOLE:
        return BREADCRUMBCATEGORYS.DEBUG;
      case BREADCRUMBTYPES.UNHANDLEDREJECTION:
      case BREADCRUMBTYPES.CODE_ERROR:
      case BREADCRUMBTYPES.RESOURCE:
      case BREADCRUMBTYPES.VUE:
      case BREADCRUMBTYPES.REACT:
      default:
        return BREADCRUMBCATEGORYS.EXCEPTION;
    }
  }

  bindOptions(options: any) {
    const { maxBreadcrumbs = 20, beforePushBreadcrumb } = options;
    validateOption(maxBreadcrumbs, 'maxBreadcrumbs', 'number') &&
      (this.maxBreadcrumbs = maxBreadcrumbs);
    beforePushBreadcrumb &&
      validateOption(beforePushBreadcrumb, 'beforePushBreadcrumb', 'function') &&
      (this.beforePushBreadcrumb = beforePushBreadcrumb);
  }
}

const breadcrumb = _support.breadcrumb || (_support.breadcrumb = new Breadcrumb());
export { breadcrumb };
