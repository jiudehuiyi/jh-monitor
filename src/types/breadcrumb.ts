import { Severity } from '../utils';
import { BREADCRUMBTYPES } from '../shared/constant';
import { ReportDataType } from './transportData';

// 用户事件栈推送的类型
export interface BreadcrumbPushData {
  //事件类型
  type: BREADCRUMBTYPES;
  // string for click dom
  data: ReportDataType | any;
  // 分为user action、debug、http、
  category?: string;
  time?: number;
  level: Severity;
}
