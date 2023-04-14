import { getFlag, setFlag, slientConsoleScope, Severity } from '../utils';
import { EVENTTYPES } from '../shared';
import { handleVueError } from './helper';

const hasConsole = typeof console !== 'undefined';

const MitoVue = {
  install(Vue: any): void {
    if (getFlag(EVENTTYPES.VUE) || !Vue || !Vue.config) return;
    setFlag(EVENTTYPES.VUE, true);
    // vue 提供 warnHandler errorHandler报错信息
    Vue.config.errorHandler = function (err: Error, vm: any, info: string): void {
      handleVueError.apply(null, [err, vm, info, Severity.Normal, Severity.Error, Vue]);
      if (hasConsole && !Vue.config.silent) {
        slientConsoleScope(() => {
          console.error('Error in ' + info + ': "' + err.toString() + '"', vm);
          console.error(err);
        });
      }
    };
  },
};

export { MitoVue };
