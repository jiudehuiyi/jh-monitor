export enum EActionType {
  // 页面曝光
  PAGE = 'PAGE',
  // 事件埋点
  EVENT = 'EVENT',
  // 区域曝光
  VIEW = 'VIEW',
  // 时长埋点
  DURATION = 'DURATION',
  // 区域曝光的时长埋点
  DURATION_VIEW = 'DURATION_VIEW',
  // 其他埋点类型
  OTHER = 'OTHER',
}

export interface DeviceInfo {
  // 网络类型 3g 4g 5g wifi
  netType?: string;
  // 可是区域宽高
  clientWidth?: string;
  clientHeight?: string;
  // 像素比
  ratio?: number;
}

export interface ITrackBaseParam {
  trackId?: string;
  custom?: string | { [prop: string]: string | number | boolean };
  [key: string]: any;
}
