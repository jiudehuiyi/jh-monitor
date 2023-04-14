import { onLCP, onFID, onCLS, onFCP } from 'web-vitals';
import { _global } from '../utils';

let firstScreenPaint = 0; // firstScreenPaint为首屏渲染时间
let observer: MutationObserver;
let isOnLoaded = false; // 页面渲染是否完成
let timer = null; // 定时器
let entries = [];

export function getResource(): PerformanceResourceTiming[] {
  if (performance.getEntriesByType) {
    const entries = performance.getEntriesByType('resource');
    // 过滤掉非静态资源的 fetch、 xmlhttprequest、beacon
    let list = entries.filter(entry => {
      return ['fetch', 'xmlhttprequest', 'beacon'].indexOf(entry.initiatorType) === -1;
    });

    if (list.length) {
      list = JSON.parse(JSON.stringify(list));
      list.forEach((entry: any) => {
        entry.isCache = isCache(entry);
      });
    }
    return list;
  }
}

// 判断资料是否来自缓存
export function isCache(entry: PerformanceResourceTiming): boolean {
  return entry.transferSize === 0 || (entry.transferSize !== 0 && entry.encodedBodySize === 0);
}

//获取首次渲染时间
export const getRenderTime = () => {
  let startTime = 0;
  entries.forEach(entry => {
    if (entry.startTime > startTime) {
      startTime = entry.startTime;
    }
  });
  // performance.timing.navigationStart为页面起始时间
  return startTime - performance.timing.navigationStart;
};

// 判断节点是否在视图屏幕内
export const isInScreen = (dom: HTMLElement): boolean => {
  const rect = dom.getBoundingClientRect();
  if (rect.left < _global.innerWidth && rect.top < _global.innerHeight) {
    return true;
  }
  return false;
};
// 定时器循环监听dom的变化，当document.readyState === 'complete'时，停止监听
export const checkDOMChange = callback => {
  cancelAnimationFrame(timer);
  timer = requestAnimationFrame(() => {
    if (document.readyState === 'complete') {
      isOnLoaded = true;
    }
    if (isOnLoaded) {
      //取消监听
      observer && observer.disconnect();
      // document.readyState === 'complete'时，计算首屏渲染时间
      firstScreenPaint = getRenderTime();
      entries = null;
      callback && callback(firstScreenPaint);
    } else {
      checkDOMChange(callback);
    }
  });
};

// 监听节点document及其子节点变化
function observeFirstScreenPaint(callback) {
  const ignoreDOMList = ['STYLE', 'SCRIPT', 'LINK'];
  observer = new MutationObserver((mutationList: any) => {
    checkDOMChange(callback);
    const entry = { children: [], startTime: 0 };
    for (const mutation of mutationList) {
      if (mutation.addedNodes.length && isInScreen(mutation.target)) {
        for (const node of mutation.addedNodes) {
          // 忽略掉以上标签的变化
          if (node.nodeType === 1 && !ignoreDOMList.includes(node.tagName) && isInScreen(node)) {
            entry.children.push(node);
          }
        }
      }
    }
    if (entry.children.length) {
      entries.push(entry);
      entry.startTime = new Date().getTime();
    }
  });

  observer.observe(document, {
    childList: true, // 监听子节点新增或者删除
    subtree: true, // 观察目标节点的所有后代节点(观察目标节点所包含的整棵DOM树上的上述三种节点变化)；
    characterData: true, // 监听元素的文本是否变化
    attributes: true, // 监听元素的属性是否变化
  });
}
export function isSafari(): boolean {
  return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
}

export function getLCP(callback): void {
  const entryHandler = list => {
    for (const entry of list.getEntries()) {
      observer.disconnect();
      callback({
        cName: '最大内容绘制(LCP)',
        description:
          'CP指标代表的是视窗最大可见图片或者文本块的渲染时间, 是至少75%用户能够在2.5秒内，包括移动和桌面设备',
        href: (window || _global).location?.href,
        name: 'LCP',
        value: entry.startTime,
        rating: entry.startTime > 2500 ? 'poor' : 'good',
      });
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'largest-contentful-paint', buffered: true });
}

export function getFID(callback): void {
  const entryHandler = entryList => {
    for (const entry of entryList.getEntries()) {
      observer.disconnect();
      const value = entry.processingStart - entry.startTime;
      callback({
        cName: '首次输入延迟(FID)',
        description: 'First Input Delay 可操作的延迟, FID<100ms为优',
        href: (window || _global).location?.href,

        name: 'FID',
        value,
        rating: value > 100 ? 'poor' : 'good',
      });
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'first-input', buffered: true });
}

export function getCLS(callback): void {
  let clsValue = 0;
  // let clsEntries = [];

  let sessionValue = 0;
  let sessionEntries = [];

  const entryHandler = entryList => {
    for (const entry of entryList.getEntries()) {
      // 只将不带有最近用户输入标志的布局偏移计算在内。
      if (!entry.hadRecentInput) {
        const firstSessionEntry = sessionEntries[0];
        const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
        // 如果条目与上一条目的相隔时间小于 1 秒且
        // 与会话中第一个条目的相隔时间小于 5 秒，那么将条目
        // 包含在当前会话中。否则，开始一个新会话。
        if (
          sessionValue &&
          entry.startTime - lastSessionEntry.startTime < 1000 &&
          entry.startTime - firstSessionEntry.startTime < 5000
        ) {
          sessionValue += entry.value;
          sessionEntries.push(entry);
        } else {
          sessionValue = entry.value;
          sessionEntries = [entry];
        }

        // 如果当前会话值大于当前 CLS 值，
        // 那么更新 CLS 及其相关条目。
        if (sessionValue > clsValue) {
          clsValue = sessionValue;
          // clsEntries = sessionEntries;
          observer.disconnect();

          callback({
            cName: '累计布局偏移(CLS)',
            description:
              'Cumulative Layout Shift, 内容视觉稳定性指标, 评分低于0.1分，代表页面很稳定',
            href: (window || _global).location?.href,
            name: 'CLS',
            value: clsValue,
            rating: clsValue > 2500 ? 'poor' : 'good',
          });
        }
      }
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'layout-shift', buffered: true });
}

export function getFCP(callback): void {
  const entryHandler = list => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        observer.disconnect();
        callback({
          cName: '首次内容渲染(FCP)',
          description:
            '首次内容绘制时间，这个指标用于记录页面首次绘制文本、图片、非空白 Canvas 或 SVG 的时间',
          href: (window || _global).location?.href,
          name: 'FCP',
          value: entry.startTime,
          rating: entry.startTime > 2500 ? 'poor' : 'good',
        });
      }
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'paint', buffered: true });
}

export function getWebVitals(callback) {
  // web-vitals 不兼容safari浏览器
  if (isSafari()) {
    getLCP(res => {
      callback(res);
    });

    getFID(res => {
      callback(res);
    });
    getCLS(res => {
      callback(res);
    });
    getFCP(res => {
      callback(res);
    });
  } else {
    // Largest Contentful Paint 最大内容绘制(LCP), LCP指标代表的是视窗最大可见图片或者文本块的渲染时间, 是至少75%用户能够在2.5秒内，包括移动和桌面设备
    onLCP(res => {
      const data = {
        cName: '最大内容绘制(LCP)',
        description:
          'CP指标代表的是视窗最大可见图片或者文本块的渲染时间, 是至少75%用户能够在2.5秒内，包括移动和桌面设备',
        href: (window || _global).location?.href,
        ...res,
      };
      callback(data);
    });
    // First Input Delay 可操作的延迟, FID<100ms为优
    onFID(res => {
      const data = {
        cName: '首次输入延迟(FID)',
        description: 'First Input Delay 可操作的延迟, FID<100ms为优',
        href: (window || _global).location?.href,
        ...res,
      };
      callback(data);
    });
    // 累计布局偏移: Cumulative Layout Shift, 内容视觉稳定性指标, 评分低于0.1分，代表页面很稳定
    onCLS(res => {
      const data = {
        cName: '累计布局偏移(CLS)',
        description: 'Cumulative Layout Shift, 内容视觉稳定性指标, 评分低于0.1分，代表页面很稳定',
        href: (window || _global).location?.href,
        ...res,
      };
      callback(data);
    });
    // FCP（First Contentful Paint）：首次内容绘制时间，这个指标用于记录页面首次绘制文本、图片、非空白 Canvas 或 SVG 的时间
    onFCP(res => {
      const data = {
        cName: '首次内容渲染(FCP)',
        description:
          '首次内容绘制时间，这个指标用于记录页面首次绘制文本、图片、非空白 Canvas 或 SVG 的时间',
        href: (window || _global).location?.href,
        ...res,
      };
      callback(data);
    });
  }
  // 首屏加载时间
  observeFirstScreenPaint(res => {
    const data = {
      name: 'FSP',
      cName: '首屏加载时间',
      description: '页面从开始加载到首屏内容全部绘制完成的时间，用户可以看到首屏的全部内容',
      value: res,
      rating: res > 2500 ? 'poor' : 'good',
      href: (window || _global).location?.href,
    };
    callback(data);
  });
}
