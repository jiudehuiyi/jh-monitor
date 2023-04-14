// callback - 回到函数获取检测结果
// skeletonProject- 是否存在骨架屏

import { _global, _support } from '../utils';
import { STATUS_CODE } from '../shared';

// whiteBoxElements- 检测的容器列表 ['html', 'body', '#root']
export function openWhiteScreen(callback, { skeletonProject, whiteBoxElements }: any) {
  let _whiteLoopNum = 0;
  const _skeletonInitList = []; // 存储初始采样点
  let _skeletonNowList = []; // 存储当前采样点

  // 当项目存在骨架牌
  if (skeletonProject) {
    if (document.readyState != 'complete') {
      sampling();
    }
  } else {
    if (document.readyState == 'complete') {
      sampling();
    } else {
      _global.addEventListener('load', sampling);
    }
  }
  // 选中dom点的名称
  function getSelector(element) {
    if (element.id) {
      return '#' + element.id;
    } else if (element.className) {
      return (
        '.' +
        element.className
          .split(' ')
          .filter(item => !!item)
          .join('.')
      );
    } else {
      return element.nodeName.toLowerCase();
    }
  }

  // 判断采样点是否为容器节点
  function isContainer(element: HTMLElement) {
    const selector = getSelector(element);
    if (skeletonProject) {
      _whiteLoopNum ? _skeletonNowList.push(selector) : _skeletonInitList.push(selector);
    }
    return whiteBoxElements.indexOf(selector) != -1;
  }

  // 开启白屏轮训
  function openWhiteLoop(): void {
    if (_support._loopTimer) return;
    _support._loopTimer = setInterval(() => {
      if (skeletonProject) {
        _whiteLoopNum++;
        _skeletonNowList = [];
      }
      sampling();
    }, 1000);
  }

  function sampling() {
    let emptyPoints = 0;
    for (let i = 1; i <= 9; i++) {
      const xElements = document.elementsFromPoint(
        (_global.innerWidth * i) / 10,
        _global.innerHeight / 2
      );
      const yElements = document.elementsFromPoint(
        _global.innerWidth / 2,
        (_global.innerHeight * i) / 10
      );
      if (isContainer(xElements[0] as HTMLElement)) emptyPoints++;
      // 中心点只计算一次
      if (i != 5) {
        if (isContainer(yElements[0] as HTMLElement)) emptyPoints++;
      }
    }
    // 页面正常渲染，停止轮训
    if (emptyPoints != 17) {
      if (skeletonProject) {
        // 第一次不比较
        if (!_whiteLoopNum) return openWhiteLoop();
        // 比较前后dom是否一致
        if (_skeletonNowList.join() == _skeletonInitList.join())
          return callback({
            status: STATUS_CODE.ERROR,
          });
      }
      if (_support._loopTimer) {
        clearTimeout(_support._loopTimer);
        _support._loopTimer = null;
      }
    } else {
      // 开启轮训
      if (!_support._loopTimer) {
        openWhiteLoop();
      }
    }
    // 17个点都是容器节点算作白屏
    callback({
      status: emptyPoints == 17 ? STATUS_CODE.ERROR : STATUS_CODE.OK,
    });
  }
}
