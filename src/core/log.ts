import ErrorStackParser from 'error-stack-parser';
import { logger, isError, unknownToString } from '../utils';
import { breadcrumb } from './breadcrumb';
import { STATUS_CODE } from '../shared';
import { transportData } from './transportData';

// 手动上报
export function log({ message = 'customReport', error = '', type = 'custom' }: any): void {
  try {
    let errorInfo = {};
    if (isError(error)) {
      const result = ErrorStackParser.parse(!error.target ? error : error.error || error.reason)[0];
      errorInfo = { ...result, line: result.lineNumber, column: result.columnNumber };
    }
    breadcrumb.push({
      type,
      status: STATUS_CODE.ERROR,
      category: 'customlLog',
      data: unknownToString(message),
      time: Date.now(),
    });
    transportData.send({
      type,
      status: STATUS_CODE.ERROR,
      message: unknownToString(message),
      time: Date.now(),
      ...errorInfo,
    });
  } catch (error) {
    logger.error(`上报自定义事件时报错: ${error}`);
  }
}
