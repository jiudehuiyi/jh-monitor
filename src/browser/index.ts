export * from './replace';
export * from './load';
export * from './handleEvents';
import { initOptions } from '../core';
import { setupReplace } from './load';

function webInit(options: any): void {
  if (options.disabled) return;
  initOptions(options); // 初始化参数
  setupReplace();
}

const init = (options: any) => {
  webInit(options);
};

export { init };
