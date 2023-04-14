import { _global, _support } from './global';
const prefix = `JH-Monitor`;
// 重写日志信息
export class Logger {
  public enabled = false; // 是否打开日志
  private _console: Console = {} as Console;

  constructor() {
    _global.console = console || _global.console;
    _support._log = _support._log || {};
    if (console || _global.console) {
      const logType = ['log', 'assert', 'debug', 'error', 'warn', 'info']; // 只使用这六种日志模式
      _support._logLevel = logType;
      logType.forEach(type => {
        if (!(type in _global.console)) return;
        this._console[type] = _global.console[type];
        _support._log[type] = _global.console[type];
      });
    }
  }
  // 禁用日志
  disable(): void {
    this.enabled = false;
  }
  // 启用日志
  enable(): void {
    this.enabled = true;
  }
  // 初始日志参数
  bindOptions(debug: boolean): void {
    this.enabled = debug ? true : false;
  }
  // 获取是否禁用
  getEnableStatus() {
    return this.enabled;
  }

  // 重写log warn error
  log(...args: any[]): void {
    if (!this.enabled) return;
    this._console.log(`${prefix} [log]`, ...args);
  }

  warn(...args: any[]): void {
    if (!this.enabled) return;
    this._console.warn(`${prefix} [warn]`, ...args);
  }

  error(...args: any[]): void {
    if (!this.enabled) return;
    this._console.error(`${prefix} [error]`, ...args);
  }
}

const logger = _support.logger || (_support.logger = new Logger());
export { logger };
