<div align="center">
    <a href="#" target="_blank">
    </a>
    <p>
    一款轻量级的收集页面的用户点击行为、路由跳转、接口报错、代码报错、并上报服务端的前端监控SDK
    ，可用来收集并上报：代码报错、性能数据、页面录屏、用户行为、白屏检测等个性化指标数据</p>
</div>

## 功能
- [√] ✈️ 监听请求错误(包括xhr, fetch)
- [√] 🔨console
- [√] ✈️ 用户行为：页面点击、路由跳转、接口调用、资源加载
- [√] ✈️ 错误捕获：代码报错、资源加载报错、接口请求报错
- [√] ✈️ 性能数据：FP、FCP、LCP、CLS、FID
- [√] ✈️ 自定义上报错误
- [√] ✈️ 个性化指标：Long Task、Memory 页面内存、首屏加载时间
- [√] ✈️ 白屏检测：检测页面打开后是否一直白屏
- [√] ✈️ 视频录制：录制页面报错视频
- [√] 🚀 支持多种配置：自定义 hook 与选项
- [√] 🚀 支持的 Web 框架：vue2、vue3、React

## 安装

```javascript
$ npm i -S jh-monitor / yarn add jh-monitor
```

## 相关命令
```javascript
  npm run pkg // 安装node_modules依赖
  npm run build:dev //启动开发环境
  npm run build:rollup // 打包
  npm run format // 格式化代码
  npm run commit // 提交代码
```
## 关于测试本地项目的安装
```javascript
  1. 下载main分支项目，并将其link到本地，即执行npm link 即可
  2. 下载example分支项目，执行npm run link，即可在项目中进行测试
  tip: 两个项目必须同时运行
```


## React

```javascript
import JhMonitor from 'jh-monitor';

JhMonitor.init({
  dsn: 'http://localhost:3000/reportData',
  apikey: 'project1',
  repeatCodeError: true, // 开启错误上报去重，重复的代码错误只上报一次
  silentRecordScreen: true, // 开启录屏
  silentWhiteScreen: true, // 开启白屏检测
  skeletonProject: true, // 项目是否有骨架屏
  whiteBoxElements: ['html', 'body','#root'], // 白屏检测的容器列表
});
```

## 此项目可以作为二次开发使用

## 常规配置项

|          Name          | Type       | Default                                                       | Description                                                                                                                                                                                                             |
| :--------------------: | ---------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         `dsn`          | `string`   | `""`                                                          | (必传项) 上报接口的地址，post 方法                                                                                                                                                                                      |
|        `apikey`        | `string`   | `""`                                                          | (必传项) 每个项目对应一个 apikey，唯一标识                                                                                                                                                                              |
|        `userId`        | `string`   | `""`                                                          | 用户 id                                                                                                                                                                                                                 |
|       `disabled`       | `boolean`  | `false`                                                       | 默认是开启 SDK，为 true 时，会将 sdk 禁用                                                                                                                                                                               |
|  `silentRecordScreen`  | `boolean`  | `false`                                                       | 注意：默认不会开启录屏，为 true 时，开启录屏                                                                                                                                                                            |
|  `silentWhiteScreen`   | `boolean`  | `true`                                                       | 注意：默认开启白屏检测，为 false 时，不会开启检测                                                                                                                                                                        |
|   `skeletonProject`    | `boolean`  | `false`                                                       | 有骨架屏的项目建议设为 true，提高白屏检测准确性
|   `useBeacon`    | `boolean`  | `false`                                                       | 是否使用beacon上报数据，如果其开启，首先会使用boacon上报，当存在兼容性的时候会使用ajax或者img上报                                                                                                                                                                       |
|   `whiteBoxElements`   | `array`    | `['html', 'body', '#root']`                           | 白屏检测的容器列表，开启白屏检测后该设置才生效                                                                                                                                                                          |
|  `filterXhrUrlRegExp`  | `regExp`   | `null`                                                        | 默认为空，所有的接口请求都会被监听，不为空时，filterXhrUrlRegExp.test(xhr.url)为 true 时过滤指定的接口                                                                                                                  |
|     `useImgUpload`     | `boolean`  | `false`                                                       | 为 true 时，使用图片打点上报的方式，参数通过 data=encodeURIComponent(reportData) 拼接到 url 上，默认为 false                                                                                                            |                                                                                                                                                                                       |
|       `overTime`       | `number`   | `10`                                                          | 设置接口超时时长，默认 10s                                                                                                                                                                                              |
|    `maxBreadcrumbs`    | `number`   | `20`                                                          | 用户行为存放的最大容量，超过 20 条，最早的一条记录会被覆盖掉                                                                                                                                                            |
|   `recordScreentime`   | `number`   | `10`                                                          | 单次录屏时长，silentRecordScreen 设为 true， 开启录屏后该设置才有效                                                                                                                                                     |
| `recordScreenTypeList` | `array`    | `['error', 'unhandledrejection', 'resource', 'fetch', 'xhr']` | 上报录屏的错误列表，默认会上报所有错误发生时的录屏信息，如设置 ['error', 'unhandledrejection'] 则只会上报代码报错时的录屏                                                                                               |
| `onRouteChange` | `function` | `null`                                                        | 路由跳转之后的回调函数，会返回from,to两个作为函数参数

## jh-monitor 前端监控参考文章
[前端监控体系及实现技术详解](https://juejin.cn/post/6936562262480158728#heading-16)
[字节前端监控实践](https://juejin.cn/post/7195496297150709821#comment)
[前端监控平台](https://juejin.cn/post/6862559324632252430#comment)
[字节的前端监控SDK是怎样设计的](https://juejin.cn/post/7125622436669685774)


## 暴露API使用

```javascript
import JhMonitor from 'jh-monitor';
JhMonitor.init({
  dsn: 'http://localhost:3000/reportData',
  apikey: 'project1',
  repeatCodeError: true, // 开启错误上报去重，重复的代码错误只上报一次
  silentRecordScreen: true, // 开启录屏
  silentWhiteScreen: true, // 开启白屏检测
  skeletonProject: true, // 项目是否有骨架屏
  whiteBoxElements: ['html', 'body','#root'], // 白屏检测的容器列表
});
JhMonitor.log({
  type: 'custom',
  message: '手动报错信息',
  error: new Error('报错'),
});
// JhMonitor._global, JhMonitor._support 为内部全局变量及其所有相关数据存储
// JhMonitor.SDK_NAME JhMonitor.SDK_VERSION SDK版本名字和版本
// 手动上报
 JhMonitor.log({
  type: 'custom',
  message: '手动报错信息',
  error: new Error('报错'),
});
//解密上报的报错视频
JhMonitor.unzip(b64Data) {}
// 上报react错误函数
JhMonitor.errorBoundaryReport(err){};
// 上报Vue错误
JhMonitor.MitoVue
```

## 监控测试项目
[example](https://github.com/jiudehuiyi/jh-monitor/tree/example)
