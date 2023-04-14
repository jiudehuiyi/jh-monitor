import { Breadcrumb } from '../core';
import { BreadcrumbPushData } from './breadcrumb';
import { TransportDataType } from './transportData';
type CANCEL = null | undefined | boolean;
// http主要请求方法
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTION' | 'PATCH';
// curl枚举
export enum EMethods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}
// 监控公用事件
export interface SilentEventTypes {
  // 默认监控xhr事件
  silentXhr?: boolean;
  // 默认监控fetch事件
  silentFetch?: boolean;
  // 默认监控console事件
  silentConsole?: boolean;
  // 默认监控DOM事件
  silentDom?: boolean;
  // 默认监控history事件, history模式
  silentHistory?: boolean;
  //默认监控hashchange事件，hash模式
  silentHashchange?: boolean;
  // 默认监控Error事件
  silentError?: boolean;
  // 默认监控unhandledrejection事件
  silentUnhandledrejection?: boolean;
  // 默认监控vue.warn函数
  silentVue?: boolean;
}

//监控小程序事件
export interface WxSilentEventTypes {
  // 静默监控AppOnError
  silentWxOnError?: boolean;
  //静默监控AppOnUnhandledRejection
  silentWxOnUnhandledRejection?: boolean;
  // 静默监控AppOnPageNotFound
  silentWxOnPageNotFound?: boolean;
  //静默监控PageOnShareAppMessage
  silentWxOnShareAppMessage?: boolean;
  // 静默监控小程序路由
  silentMiniRoute?: boolean;
}
// 钩子类型函数
export interface HooksTypes {
  // xhr钩子函数，在xhr.setRequestHeader后调用该函数
  configReportXhr?: (xhr: XMLHttpRequest, reportData: TransportDataType | any) => void;
  // 在每次发送事件前会调用
  beforeDataReport?: (
    event: TransportDataType
  ) => Promise<TransportDataType | null | CANCEL> | TransportDataType | any | CANCEL | null;
  //钩子函数，每次发送前都会调用
  configReportUrl?: (event: TransportDataType, url: string) => string;
  // 每次添加用户行为前调用
  beforePushBreadcrumb?: (
    breadcrumb: Breadcrumb,
    hint: BreadcrumbPushData
  ) => BreadcrumbPushData | CANCEL;
  // 拦截用户页面的ajax请求，并在ajax请求发送前执行该hook
  beforeAppAjaxSend?: (config: any, setRequestHeader: any) => void;
  // 在整合上报数据和本身SDK信息数据前调用
  backTrackerId?: () => string | number;
}

export interface BrowserHooksTypes {
  // 路由跳转
  onRouteChange?: (from: string, to: string) => unknown;
}

interface WxMiniHooksTypes {
  //wx小程序上报时的wx.request配置
  configReportWxRequest?(event: TransportDataType | any): Partial<any>;
  // wx小程序的App下的onLaunch执行完后再执行以下hook
  appOnLaunch?(options: any): void;
  // wx小程序的App下的OnShow执行完后再执行以下hook
  appOnShow?(options: any): void;
  // wx小程序的App下的OnHide执行完后再执行以下hook
  appOnHide?(page: any): void;
  // wx小程序的App下的onPageNotFound执行完后再执行以下hook
  onPageNotFound?(data: any): void;
  // 先执行hook:pageOnShow再执行wx小程序的Page下的onShow
  pageOnShow?(page: any): void;
  //  wx小程序的App下的pageOnUnload执行完后再执行以下hook
  pageOnUnload?(page: any): void;
  // 先执行hook:pageOnHide再执行wx小程序的Page下的onHide
  pageOnHide?(page: any): void;
  // 先执行hook:onShareAppMessage再执行wx小程序的Page下的onShareAppMessage
  onShareAppMessage?(options: any): void;
  // 先执行hook:onShareTimeline再执行wx小程序的Page下的onShareTimeline
  onShareTimeline?(page: any): void;
  // 先执行hook:onTabItemTap再执行wx小程序的Page下的onTabItemTap
  onTabItemTap?(options: any): void;
  // 重写wx.NavigateToMiniProgram将里面的参数抛出来，便于在跳转时更改query和extraData
  wxNavigateToMiniProgram?(options: any): any;
  // 代理Action中所有函数，拿到第一个参数并抛出成hook
  triggerWxEvent?(e: any): void;
}
// 传入的初始化参数类型;
export interface InitOptions
  extends SilentEventTypes,
    HooksTypes,
    WxSilentEventTypes,
    WxMiniHooksTypes,
    BrowserHooksTypes {
  // 错误监控的dsn服务器地址
  dsn?: string;
  // 是否禁用sdk
  disabled?: boolean;
  // 项目唯一id
  apiKey?: string;
  // 是否使用img上报方式，默认为xhr方式上报
  useImgUpload?: boolean;
  // 埋点key
  trackKey?: string;
  // 是否开启debug模式(例如会打印一些日志)
  debug?: boolean;
  // 默认是关闭traceId，开启时，页面的所有请求都会生成一个uuid，放入请求头中
  enableTraceId?: boolean;
  //  如果开启了enableTraceId,也需要配置该配置项，includeHttpUrlTraceIdRegExp.test(xhr.url)为true时，才会在该请求头中添加traceId
  //  由于考虑部分接口如果随便加上多余的请求头会造成跨域，所以这边用的是包含关系的正则
  includeHttpUrlTraceIdRegExp?: RegExp;
  // traceId放入请求头中的key，默认是Trace-Id
  traceIdFieldName?: string;
  // 默认为空，所有ajax都会被监听，不为空时，filterXhrUrlRegExp.test(xhr.url)为true时过滤
  filterXhrUrlRegExp?: RegExp;
  // 默认20，最大100，超过100还是设置成100
  maxBreadcrumbs?: number;
  // 按钮点击和微信触摸事件节流时间，默认是0
  throttleDelayTime?: number;
  // 在引入wx-mini的情况下，使用该参数用来开启
  enableTrack?: boolean;
  // 在开启enableBury后，将所有埋点信息上报到该服务端地址，如果该属性有值时才会启动无痕埋点
  trackDsn?: string;
  // 最多可重复上报同一个错误的次数
  maxDuplicateCount?: number;
}
