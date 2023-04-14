import { BreadcrumbPushData } from './breadcrumb';
import { DeviceInfo } from './track';

export interface ICommonDataType {
  // 是否为埋点数据， 分为自动上报，和手动埋点
  isTrackData?: boolean;
}
// 自动上报类型
export interface ReportDataType extends ICommonDataType {
  type?: string; // 上报错误类型
  message?: string; // 错误的详情
  url?: string; // 报错url
  name?: string; // 报错名字
  stack?: any; // 报错的堆栈
  time?: number; // 报错时间
  errorId?: string; // 错误的特有id
  level?: string; // 错误的级别
  // ajax
  elapsedTime?: number;
  request?: {
    httpType?: string;
    traceId?: string;
    method: string;
    url: string;
    data: any;
  };
  response?: {
    status: number;
    data: string;
  };
  // vue
  componentName?: string;
  propsData?: any;
  // 手动上报(log)错误logError
  customTag?: string;
}
// 手动埋点数据类型
export interface TrackReportData extends ICommonDataType {
  // 设备id(uuid)
  id?: string;
  // 埋点code，自定义
  trackId?: string;
  // 埋点类型
  actionType?: any;
  // 埋点开始时间
  startTime?: number;
  // 埋点停留时间
  durationTime?: number;
  // 上报时间
  trackTime?: number;
}
export type FinalReportType = ReportDataType | TrackReportData;

export function isReportDataType(data: ReportDataType | TrackReportData): data is ReportDataType {
  return (data as any).actionType === undefined && !data.isTrackData;
}

// 用户权限信息
export interface AuthInfo {
  apiKey?: string; // 项目唯一id
  trackKey?: string; // 埋点key值
  sdkName?: string; // sdk名字
  sdkVersion?: string; // sdk版本
  trackerId?: string; // 埋点id
}

// 数据上报配置信息
export interface TransportDataType {
  authInfo: AuthInfo;
  breadcrumb?: BreadcrumbPushData[]; // 用户行为信息
  data?: FinalReportType; // 上报数据类型
  record?: any[];
  deviceInfo?: DeviceInfo;
}
