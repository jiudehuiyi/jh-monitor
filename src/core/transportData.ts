import {
  Queue,
  _support,
  validateOption,
  isBrowserEnv,
  isWxMiniEnv,
  variableTypeDetection,
  logger,
  isEmpty,
} from '../utils';
import { breadcrumb } from './breadcrumb';
import { SDK_NAME, SDK_VERSION } from '../shared';
import { isReportDataType } from '../types';
import { options } from './options';
// 用来传输数据类，包含img标签、xhr请求
declare const wx;
export class TransportData {
  queue: Queue;
  beforeDataReport: unknown = null;
  backTrackerId: unknown = null;
  configReportXhr: unknown = null;
  configReportUrl: unknown = null;
  configReportWxRequest: unknown = null;
  useImgUpload = false;
  apikey = '';
  trackKey = '';
  errorDsn = '';
  trackDsn = '';
  constructor() {
    this.queue = new Queue();
  }
  bindOptions(options: any) {
    const {
      dsn,
      beforeDataReport,
      apikey,
      configReportXhr,
      backTrackerId,
      trackDsn,
      trackKey,
      configReportUrl,
      useImgUpload,
      configReportWxRequest,
    } = options;
    apikey && validateOption(apikey, 'apikey', 'string') && (this.apikey = apikey);
    trackKey && validateOption(trackKey, 'trackKey', 'string') && (this.trackKey = trackKey);
    dsn && validateOption(dsn, 'dsn', 'string') && (this.errorDsn = dsn);
    trackDsn && validateOption(trackDsn, 'trackDsn', 'string') && (this.trackDsn = trackDsn);
    useImgUpload &&
      validateOption(useImgUpload, 'useImgUpload', 'boolean') &&
      (this.useImgUpload = useImgUpload);
    beforeDataReport &&
      validateOption(beforeDataReport, 'beforeDataReport', 'function') &&
      (this.beforeDataReport = beforeDataReport);
    configReportXhr &&
      validateOption(configReportXhr, 'configReportXhr', 'function') &&
      (this.configReportXhr = configReportXhr);
    backTrackerId &&
      validateOption(backTrackerId, 'backTrackerId', 'function') &&
      (this.backTrackerId = backTrackerId);
    configReportUrl &&
      validateOption(configReportUrl, 'configReportUrl', 'function') &&
      (this.configReportUrl = configReportUrl);
    configReportWxRequest &&
      validateOption(configReportWxRequest, 'configReportWxRequest', 'function') &&
      (this.configReportWxRequest = configReportWxRequest);
  }

  // 获取相关记录
  getRecord(): any[] {
    const record = _support.record;
    if (record && variableTypeDetection.isArray(record) && record.length > 2) {
      return record;
    }
    return [];
  }

  // 获取设备信息
  getDeviceInfo(): any {
    return _support.deviceInfo || {};
  }

  getApiKey() {
    return this.apikey;
  }

  getTrackKey() {
    return this.trackKey;
  }

  getTrackerId() {
    if (typeof this.backTrackerId === 'function') {
      const trackerId = this.backTrackerId();
      if (typeof trackerId === 'string' || typeof trackerId === 'number') {
        return trackerId;
      } else {
        logger.error(`trackerId 期待字符串或数字类型， 但是获得的是${typeof trackerId}类型`);
      }
    }
    return '';
  }
  // 获取sdk相关信息
  getAuthInfo() {
    const result = {
      trackerId: this.getTrackerId(),
      sdkName: SDK_NAME,
      sdkVersion: SDK_VERSION,
      apiKey: this.apikey,
      trackKey: this.trackKey,
    };
    return result;
  }

  // 获取传输数据
  getTransportData(data) {
    return {
      authInfo: this.getAuthInfo(),
      breadcrumb: breadcrumb.getStack(),
      data,
      record: this.getRecord(),
      deviceInfo: this.getDeviceInfo(),
    };
  }
  // 是否支持sdk传输url
  isSdkTransportUrl(targetUrl: string): boolean {
    let isSdkDsn = false;
    if (this.errorDsn && targetUrl.indexOf(this.errorDsn) !== -1) {
      isSdkDsn = true;
    }
    if (this.trackDsn && targetUrl.indexOf(this.trackDsn) !== -1) {
      isSdkDsn = true;
    }
    return isSdkDsn;
  }

  // 上报数据前处理数据
  async beforePost(data: any) {
    const transportData = this.getTransportData(data);
    if (typeof this.beforeDataReport === 'function') {
      const result = await this.beforeDataReport(transportData);
      if (result) {
        return result;
      } else {
        logger.error(`经过beforeDataReport处理后的上报数据需要一个返回值`);
      }
    }
    return transportData;
  }

  // 使用图片上报数据
  imgRequest(data: any, url: string): void {
    const useImgReport = () => {
      const formatSign = url.indexOf('?') === -1 ? '?' : '&';
      const img = new Image();
      img.src = `${url}${formatSign}data=${encodeURIComponent(JSON.stringify(data))}`;
    };
    // 使用异步promsie上报数据
    this.queue.addFn(useImgReport);
  }
  // 使用XMLHttpRequest上报数据
  async xhrPost(data: any, url: string) {
    const requestFn = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('post', url);
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
      if (typeof this.configReportXhr === 'function') {
        this.configReportXhr(xhr, data);
      }
      xhr.send(JSON.stringify(data));
    };

    this.queue.addFn(requestFn);
  }
  // 使用wx上报
  async wxPost(data: any, url: string) {
    const requestFn = (): void => {
      let requestOptions = { method: 'POST' } as any;
      if (typeof this.configReportWxRequest === 'function') {
        const params = this.configReportWxRequest(data);
        requestOptions = { ...requestOptions, ...params };
      }
      requestOptions = {
        ...requestOptions,
        data: JSON.stringify(data),
        url,
      };
      wx.request(requestOptions);
    };
    this.queue.addFn(requestFn);
  }
  // 使用beacon上报
  beacon(url: string, data: any): boolean {
    return navigator.sendBeacon(url, JSON.stringify(data));
  }

  async send(data: any) {
    let dsn = '';
    // 错误上报
    if (isReportDataType(data) || data.isReportData) {
      // 监控错误的dsn
      dsn = this.errorDsn;
      if (isEmpty(this.errorDsn)) {
        logger.error('错误上报dsn不能为空，请在init方法中设置');
        return;
      }
      // 埋点的dsn
    } else {
      // 埋点上报
      dsn = this.trackDsn;
      if (isEmpty(this.trackDsn)) {
        logger.error('埋点上报dsn不能为空，请在init方法中设置');
        return;
      }
    }
    // 开启录屏
    if (_support.options.silentRecordScreen) {
      if (options.recordScreenTypeList.includes(data.type)) {
        // 修改hasError
        _support.hasError = true;
        data.recordScreenId = _support.recordScreenId;
      }
    }
    // 上传前进行检查
    const result = await this.beforePost(data);
    if (!result) return;
    // 动态配置dsn、configReportUrl
    if (typeof this.configReportUrl === 'function') {
      dsn = this.configReportUrl(result, dsn);
      if (!dsn) return;
    }

    // 对不同端使用不用的方式进行上传
    if (isBrowserEnv) {
      // 使用beacon上传
      let value;
      if (options.useBeacon) {
        value = this.beacon(dsn, result);
      }
      if (value) return;
      else {
        return this.useImgUpload ? this.imgRequest(result, dsn) : this.xhrPost(result, dsn);
      }
    }

    if (isWxMiniEnv) {
      return this.wxPost(result, dsn);
    }
  }
}

const transportData = _support.transportData || (_support.transportData = new TransportData());
export { transportData };
