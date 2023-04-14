import React, { useEffect } from 'react';
import './App.css';
// var jhMonitor = require("jh-monitor");
// @ts-ignore
import jhMonitor from "jh-monitor";
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
const events = [
  {
      "type": 4,
      "data": {
          "href": "http://localhost:2023/",
          "width": 1440,
          "height": 242
      },
      "timestamp": 1681183194142
  },
  {
      "type": 2,
      "data": {
          "node": {
              "type": 0,
              "childNodes": [
                  {
                      "type": 1,
                      "name": "html",
                      "publicId": "",
                      "systemId": "",
                      "id": 2
                  },
                  {
                      "type": 2,
                      "tagName": "html",
                      "attributes": {
                          "lang": "en"
                      },
                      "childNodes": [
                          {
                              "type": 2,
                              "tagName": "head",
                              "attributes": {},
                              "childNodes": [
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 5
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "meta",
                                      "attributes": {
                                          "charset": "utf-8"
                                      },
                                      "childNodes": [],
                                      "id": 6
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 7
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "link",
                                      "attributes": {
                                          "rel": "icon",
                                          "href": "http://localhost:2023/favicon.ico"
                                      },
                                      "childNodes": [],
                                      "id": 8
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 9
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "link",
                                      "attributes": {
                                          "rel": "stylesheet",
                                          "href": "https://cdn.jsdelivr.net/npm/rrweb-player@latest/dist/style.css"
                                      },
                                      "childNodes": [],
                                      "id": 10
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 11
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "meta",
                                      "attributes": {
                                          "name": "viewport",
                                          "content": "width=device-width, initial-scale=1"
                                      },
                                      "childNodes": [],
                                      "id": 12
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 13
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "meta",
                                      "attributes": {
                                          "name": "theme-color",
                                          "content": "#000000"
                                      },
                                      "childNodes": [],
                                      "id": 14
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 15
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "meta",
                                      "attributes": {
                                          "name": "description",
                                          "content": "Web site created using create-react-app"
                                      },
                                      "childNodes": [],
                                      "id": 16
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 17
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "link",
                                      "attributes": {
                                          "rel": "apple-touch-icon",
                                          "href": "http://localhost:2023/logo192.png"
                                      },
                                      "childNodes": [],
                                      "id": 18
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 19
                                  },
                                  {
                                      "type": 5,
                                      "textContent": "\n      manifest.json provides metadata used when your web app is installed on a\n      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/\n    ",
                                      "id": 20
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 21
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "link",
                                      "attributes": {
                                          "rel": "manifest",
                                          "href": "http://localhost:2023/manifest.json"
                                      },
                                      "childNodes": [],
                                      "id": 22
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 23
                                  },
                                  {
                                      "type": 5,
                                      "textContent": "\n      Notice the use of  in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike \"/favicon.ico\" or \"favicon.ico\", \"/favicon.ico\" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    ",
                                      "id": 24
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 25
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "title",
                                      "attributes": {},
                                      "childNodes": [
                                          {
                                              "type": 3,
                                              "textContent": "React App",
                                              "id": 27
                                          }
                                      ],
                                      "id": 26
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n  ",
                                      "id": 28
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "script",
                                      "attributes": {
                                          "defer": "",
                                          "src": "http://localhost:2023/static/js/bundle.js"
                                      },
                                      "childNodes": [],
                                      "id": 29
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "style",
                                      "attributes": {},
                                      "childNodes": [
                                          {
                                              "type": 3,
                                              "textContent": "body { margin: 0px; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif; -webkit-font-smoothing: antialiased; }code { font-family: source-code-pro, Menlo, Monaco, Consolas, \"Courier New\", monospace; }",
                                              "isStyle": true,
                                              "id": 31
                                          }
                                      ],
                                      "id": 30
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "style",
                                      "attributes": {},
                                      "childNodes": [
                                          {
                                              "type": 3,
                                              "textContent": ".App { text-align: center; }.App-logo { height: 40vmin; pointer-events: none; }@media (prefers-reduced-motion: no-preference) {\n  .App-logo { animation: 20s linear 0s infinite normal none running App-logo-spin; }\n}.App-header { background-color: rgb(40, 44, 52); min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: calc(10px + 2vmin); color: white; }.App-link { color: rgb(97, 218, 251); }@keyframes App-logo-spin { \n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}",
                                              "isStyle": true,
                                              "id": 33
                                          }
                                      ],
                                      "id": 32
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "style",
                                      "attributes": {},
                                      "childNodes": [
                                          {
                                              "type": 3,
                                              "textContent": ".replayer-wrapper { position: relative; }.replayer-mouse { position: absolute; width: 20px; height: 20px; transition: left 0.05s linear 0s, top 0.05s linear 0s; background-size: contain; background-position: 50% center; background-repeat: no-repeat; background-image: url(\"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjMwMCIgd2lkdGg9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZD0iTTQ4LjcxIDQyLjkxTDM0LjA4IDI4LjI5IDQ0LjMzIDE4YTEgMSAwIDAwLS4zMy0xLjYxTDIuMzUgMS4wNmExIDEgMCAwMC0xLjI5IDEuMjlMMTYuMzkgNDRhMSAxIDAgMDAxLjY1LjM2bDEwLjI1LTEwLjI4IDE0LjYyIDE0LjYzYTEgMSAwIDAwMS40MSAwbDQuMzgtNC4zOGExIDEgMCAwMC4wMS0xLjQyem0tNS4wOSAzLjY3TDI5IDMyYTEgMSAwIDAwLTEuNDEgMGwtOS44NSA5Ljg1TDMuNjkgMy42OWwzOC4xMiAxNEwzMiAyNy41OEExIDEgMCAwMDMyIDI5bDE0LjU5IDE0LjYyeiIvPjwvc3ZnPg==\"); border-color: transparent; }.replayer-mouse::after { content: \"\"; display: inline-block; width: 20px; height: 20px; background: rgb(73, 80, 246); border-radius: 100%; transform: translate(-50%, -50%); opacity: 0.3; }.replayer-mouse.active::after { animation: 0.2s ease-in-out 0s 1 normal none running click; }.replayer-mouse.touch-device { background-image: none; width: 70px; height: 70px; border-radius: 100%; margin-left: -37px; margin-top: -37px; border: 4px solid rgba(73, 80, 246, 0); transition: left 0s linear 0s, top 0s linear 0s, border-color 0.2s ease-in-out 0s; }.replayer-mouse.touch-device.touch-active { border-color: rgb(73, 80, 246); transition: left 0.25s linear 0s, top 0.25s linear 0s, border-color 0.2s ease-in-out 0s; }.replayer-mouse.touch-device::after { opacity: 0; }.replayer-mouse.touch-device.active::after { animation: 0.2s ease-in-out 0s 1 normal none running touch-click; }.replayer-mouse-tail { position: absolute; pointer-events: none; }@keyframes click { \n  0% { opacity: 0.3; width: 20px; height: 20px; }\n  50% { opacity: 0.5; width: 10px; height: 10px; }\n}@keyframes touch-click { \n  0% { opacity: 0; width: 20px; height: 20px; }\n  50% { opacity: 0.5; width: 10px; height: 10px; }\n}.rr-player { position: relative; background: white; float: left; border-radius: 5px; box-shadow: rgba(17, 16, 62, 0.12) 0px 24px 48px; }.rr-player__frame { overflow: hidden; }.replayer-wrapper { float: left; clear: both; transform-origin: left top; left: 50%; top: 50%; }.replayer-wrapper > iframe { border: none; }.rr-controller.svelte-19ke1iv.svelte-19ke1iv { width: 100%; height: 80px; background: rgb(255, 255, 255); display: flex; flex-direction: column; justify-content: space-around; align-items: center; border-radius: 0px 0px 5px 5px; }.rr-timeline.svelte-19ke1iv.svelte-19ke1iv { width: 80%; display: flex; align-items: center; }.rr-timeline__time.svelte-19ke1iv.svelte-19ke1iv { display: inline-block; width: 100px; text-align: center; color: rgb(17, 16, 62); }.rr-progress.svelte-19ke1iv.svelte-19ke1iv { flex: 1 1 0%; height: 12px; background: rgb(238, 238, 238); position: relative; border-radius: 3px; cursor: pointer; box-sizing: border-box; border-top: 4px solid rgb(255, 255, 255); border-bottom: 4px solid rgb(255, 255, 255); }.rr-progress.disabled.svelte-19ke1iv.svelte-19ke1iv { cursor: not-allowed; }.rr-progress__step.svelte-19ke1iv.svelte-19ke1iv { height: 100%; position: absolute; left: 0px; top: 0px; background: rgb(224, 225, 254); }.rr-progress__handler.svelte-19ke1iv.svelte-19ke1iv { width: 20px; height: 20px; border-radius: 10px; position: absolute; top: 2px; transform: translate(-50%, -50%); background: rgb(73, 80, 246); }.rr-controller__btns.svelte-19ke1iv.svelte-19ke1iv { display: flex; align-items: center; justify-content: center; font-size: 13px; }.rr-controller__btns.svelte-19ke1iv button.svelte-19ke1iv { width: 32px; height: 32px; display: flex; padding: 0px; align-items: center; justify-content: center; background: none; border: none; border-radius: 50%; cursor: pointer; }.rr-controller__btns.svelte-19ke1iv button.svelte-19ke1iv:active { background: rgb(224, 225, 254); }.rr-controller__btns.svelte-19ke1iv button.active.svelte-19ke1iv { color: rgb(255, 255, 255); background: rgb(73, 80, 246); }.rr-controller__btns.svelte-19ke1iv button.svelte-19ke1iv:disabled { cursor: not-allowed; }.switch.svelte-9brlez.svelte-9brlez.svelte-9brlez { height: 1em; display: flex; align-items: center; }.switch.disabled.svelte-9brlez.svelte-9brlez.svelte-9brlez { opacity: 0.5; }.label.svelte-9brlez.svelte-9brlez.svelte-9brlez { margin: 0px 8px; }.switch.svelte-9brlez input[type=\"checkbox\"].svelte-9brlez.svelte-9brlez { position: absolute; opacity: 0; }.switch.svelte-9brlez label.svelte-9brlez.svelte-9brlez { width: 2em; height: 1em; position: relative; cursor: pointer; display: block; }.switch.disabled.svelte-9brlez label.svelte-9brlez.svelte-9brlez { cursor: not-allowed; }.switch.svelte-9brlez label.svelte-9brlez.svelte-9brlez::before { content: \"\"; position: absolute; width: 2em; height: 1em; left: 0.1em; transition: background 0.1s ease 0s; background: rgba(73, 80, 246, 0.5); border-radius: 50px; }.switch.svelte-9brlez label.svelte-9brlez.svelte-9brlez::after { content: \"\"; position: absolute; width: 1em; height: 1em; border-radius: 50px; left: 0px; transition: all 0.2s ease 0s; box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 5px 0px; background: rgb(252, 255, 244); animation: 0.2s ease-out 0s 1 normal none running switch-off; z-index: 2; }.switch.svelte-9brlez input[type=\"checkbox\"].svelte-9brlez:checked + label.svelte-9brlez::before { background: rgb(73, 80, 246); }.switch.svelte-9brlez input[type=\"checkbox\"].svelte-9brlez:checked + label.svelte-9brlez::after { animation: 0.2s ease-out 0s 1 normal none running switch-on; left: 1.1em; }",
                                              "isStyle": true,
                                              "id": 35
                                          }
                                      ],
                                      "id": 34
                                  }
                              ],
                              "id": 4
                          },
                          {
                              "type": 3,
                              "textContent": "\n  ",
                              "id": 36
                          },
                          {
                              "type": 2,
                              "tagName": "body",
                              "attributes": {},
                              "childNodes": [
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 38
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "noscript",
                                      "attributes": {},
                                      "childNodes": [
                                          {
                                              "type": 3,
                                              "textContent": "You need to enable JavaScript to run this app.",
                                              "id": 40
                                          }
                                      ],
                                      "id": 39
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 41
                                  },
                                  {
                                      "type": 2,
                                      "tagName": "div",
                                      "attributes": {
                                          "id": "root"
                                      },
                                      "childNodes": [],
                                      "id": 42
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n    ",
                                      "id": 43
                                  },
                                  {
                                      "type": 5,
                                      "textContent": "\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    ",
                                      "id": 44
                                  },
                                  {
                                      "type": 3,
                                      "textContent": "\n  \n\n",
                                      "id": 45
                                  }
                              ],
                              "id": 37
                          }
                      ],
                      "id": 3
                  }
              ],
              "id": 1
          },
          "initialOffset": {
              "left": 0,
              "top": 0
          }
      },
      "timestamp": 1681183194144
  },
  {
      "type": 0,
      "data": {},
      "timestamp": 1681183194152
  },
  {
      "type": 3,
      "data": {
          "source": 0,
          "texts": [],
          "attributes": [],
          "removes": [],
          "adds": [
              {
                  "parentId": 42,
                  "nextId": null,
                  "node": {
                      "type": 2,
                      "tagName": "div",
                      "attributes": {
                          "class": "App"
                      },
                      "childNodes": [],
                      "id": 46
                  }
              },
              {
                  "parentId": 46,
                  "nextId": null,
                  "node": {
                      "type": 3,
                      "textContent": "onclick",
                      "id": 47
                  }
              }
          ]
      },
      "timestamp": 1681183194159
  },
  {
      "type": 3,
      "data": {
          "source": 0,
          "texts": [],
          "attributes": [],
          "removes": [],
          "adds": [
              {
                  "parentId": 37,
                  "nextId": null,
                  "node": {
                      "type": 2,
                      "tagName": "audio",
                      "attributes": {
                          "controls": "controls",
                          "style": "display: none;",
                          "rr_mediaState": "paused",
                          "rr_mediaCurrentTime": 0
                      },
                      "childNodes": [],
                      "id": 48
                  }
              }
          ]
      },
      "timestamp": 1681183194160
  },
  {
      "type": 3,
      "data": {
          "source": 0,
          "texts": [],
          "attributes": [],
          "removes": [],
          "adds": [
              {
                  "parentId": 3,
                  "nextId": null,
                  "node": {
                      "type": 2,
                      "tagName": "style",
                      "attributes": {
                          "type": "text/css"
                      },
                      "childNodes": [],
                      "id": 49
                  }
              },
              {
                  "parentId": 49,
                  "nextId": null,
                  "node": {
                      "type": 3,
                      "textContent": "#yddContainer { display: block; font-family: \"Microsoft YaHei\"; position: relative; width: 100%; height: 100%; top: -4px; left: -4px; font-size: 12px; border: 1px solid; }#yddTop { display: block; height: 22px; }#yddTopBorderlr { display: block; position: static; height: 17px; padding: 2px 28px; line-height: 17px; font-size: 12px; color: rgb(80, 121, 187); font-weight: bold; border-style: none solid; border-width: 1px; }#yddTopBorderlr .ydd-sp { position: absolute; top: 2px; height: 0px; overflow: hidden; }.ydd-icon { left: 5px; width: 17px; padding: 17px 0px 0px; background-position: -16px -44px; }.ydd-close { right: 5px; width: 16px; padding-top: 16px; background-position: left -44px; }#yddKeyTitle { float: left; text-decoration: none; }#yddMiddle { display: block; margin-bottom: 10px; }.ydd-tabs { display: block; margin: 5px 0px; padding: 0px 5px; height: 18px; border-bottom: 1px solid; }.ydd-tab { display: block; float: left; height: 18px; margin: 0px 5px -1px 0px; padding: 0px 4px; line-height: 18px; border-top: 1px solid; border-right: 1px solid; border-left: 1px solid; border-image: initial; border-bottom: none; }.ydd-trans-container { display: block; line-height: 160%; }.ydd-trans-container a { text-decoration: none; }#yddBottom { position: absolute; bottom: 0px; left: 0px; width: 100%; height: 22px; line-height: 22px; overflow: hidden; background-position: left -22px; }.ydd-padding010 { padding: 0px 10px; }#yddWrapper { color: rgb(37, 37, 37); z-index: 10001; background: url(\"http://localhost:2023/chrome-extension://eopjamdnofihpioajgfdikhhbobonhbb/ab20.png\"); }#yddContainer { background: rgb(255, 255, 255); border-color: rgb(75, 117, 152); }#yddTopBorderlr { border-color: rgb(240, 248, 252); }#yddWrapper .ydd-sp { background-image: url(\"http://localhost:2023/chrome-extension://eopjamdnofihpioajgfdikhhbobonhbb/ydd-sprite.png\"); }#yddWrapper a, #yddWrapper a:hover, #yddWrapper a:visited { color: rgb(80, 121, 155); }#yddWrapper .ydd-tabs { color: rgb(149, 149, 149); }.ydd-tabs, .ydd-tab { background: rgb(255, 255, 255); border-color: rgb(213, 231, 243); }#yddBottom { color: rgb(54, 54, 54); }#yddWrapper { min-width: 250px; max-width: 400px; }",
                      "isStyle": true,
                      "id": 50
                  }
              }
          ]
      },
      "timestamp": 1681183194161
  },
  {
      "type": 3,
      "data": {
          "source": 0,
          "texts": [],
          "attributes": [],
          "removes": [],
          "adds": [
              {
                  "parentId": 4,
                  "nextId": null,
                  "node": {
                      "type": 2,
                      "tagName": "style",
                      "attributes": {},
                      "childNodes": [],
                      "id": 51
                  }
              },
              {
                  "parentId": 51,
                  "nextId": null,
                  "node": {
                      "type": 3,
                      "textContent": ".sk * { color: rgb(238, 238, 238); }.sk-text { --c: #eee; --fp: 0%; --sp: 0%; --lh: 0; display: inline-block; background-image: linear-gradient(transparent var(--fp), var(--c) 0, var(--c) var(--sp), transparent 0); background-size: 100% var(--lh); background-origin: content-box !important; background-clip: content-box !important; background-color: transparent !important; background-repeat: repeat-y !important; color: transparent !important; }.sk-text > * { color: transparent; }.sk-button { color: rgb(238, 238, 238) !important; background: rgb(238, 238, 238) !important; border: none !important; box-shadow: none !important; outline: none !important; }.sk-border { border-color: rgb(238, 238, 238); }.sk-bg { background: rgb(238, 238, 238) !important; }.sk-list { color: rgb(238, 238, 238); }.sk-input { border-color: transparent; background: rgb(238, 238, 238) !important; color: transparent !important; }.sk-input::-webkit-input-placeholder { color: transparent !important; }.sk-block { background-color: rgb(238, 238, 238) !important; border-color: rgb(238, 238, 238) !important; }.sk-ignore { opacity: 0; }",
                      "isStyle": true,
                      "id": 52
                  }
              }
          ]
      },
      "timestamp": 1681183194171
  },
  {
      "type": 3,
      "data": {
          "source": 1,
          "positions": [
              {
                  "x": 126,
                  "y": 238,
                  "id": 3,
                  "timeOffset": 0
              }
          ]
      },
      "timestamp": 1681183202308
  },
  {
      "type": 3,
      "data": {
          "source": 2,
          "type": 1,
          "id": 3,
          "x": 435,
          "y": 146
      },
      "timestamp": 1681183202509
  },
  {
      "type": 3,
      "data": {
          "source": 2,
          "type": 0,
          "id": 3,
          "x": 435,
          "y": 146
      },
      "timestamp": 1681183202591
  },
  {
      "type": 3,
      "data": {
          "source": 2,
          "type": 2,
          "id": 3,
          "x": 435,
          "y": 146
      },
      "timestamp": 1681183202591
  },
  {
      "type": 3,
      "data": {
          "source": 1,
          "positions": [
              {
                  "x": 341,
                  "y": 156,
                  "id": 3,
                  "timeOffset": -452
              },
              {
                  "x": 424,
                  "y": 144,
                  "id": 3,
                  "timeOffset": -396
              },
              {
                  "x": 435,
                  "y": 145,
                  "id": 3,
                  "timeOffset": -340
              },
              {
                  "x": 435,
                  "y": 145,
                  "id": 3,
                  "timeOffset": -220
              },
              {
                  "x": 436,
                  "y": 145,
                  "id": 3,
                  "timeOffset": -46
              }
          ]
      },
      "timestamp": 1681183202812
  },
  {
      "type": 3,
      "data": {
          "source": 1,
          "positions": [
              {
                  "x": 555,
                  "y": 103,
                  "id": 3,
                  "timeOffset": -494
              },
              {
                  "x": 692,
                  "y": 69,
                  "id": 3,
                  "timeOffset": -438
              },
              {
                  "x": 728,
                  "y": 56,
                  "id": 3,
                  "timeOffset": -383
              },
              {
                  "x": 731,
                  "y": 54,
                  "id": 3,
                  "timeOffset": -311
              },
              {
                  "x": 733,
                  "y": 49,
                  "id": 3,
                  "timeOffset": -256
              },
              {
                  "x": 738,
                  "y": 35,
                  "id": 3,
                  "timeOffset": -199
              },
              {
                  "x": 737,
                  "y": 24,
                  "id": 3,
                  "timeOffset": -144
              },
              {
                  "x": 730,
                  "y": 11,
                  "id": 46,
                  "timeOffset": -88
              },
              {
                  "x": 728,
                  "y": 8,
                  "id": 46,
                  "timeOffset": -35
              }
          ]
      },
      "timestamp": 1681183203316
  },
  {
      "type": 3,
      "data": {
          "source": 2,
          "type": 1,
          "id": 46,
          "x": 725,
          "y": 11
      },
      "timestamp": 1681183203508
  },
  {
      "type": 3,
      "data": {
          "source": 2,
          "type": 0,
          "id": 46,
          "x": 725,
          "y": 11
      },
      "timestamp": 1681183203607
  },
  {
      "type": 3,
      "data": {
          "source": 2,
          "type": 2,
          "id": 46,
          "x": 725,
          "y": 11
      },
      "timestamp": 1681183203608
  },
  {
      "type": 3,
      "data": {
          "source": 1,
          "positions": [
              {
                  "x": 727,
                  "y": 9,
                  "id": 46,
                  "timeOffset": -462
              },
              {
                  "x": 726,
                  "y": 10,
                  "id": 46,
                  "timeOffset": -406
              },
              {
                  "x": 725,
                  "y": 11,
                  "id": 46,
                  "timeOffset": -350
              },
              {
                  "x": 725,
                  "y": 11,
                  "id": 46,
                  "timeOffset": -16
              }
          ]
      },
      "timestamp": 1681183203818
  },
  {
      "type": 3,
      "data": {
          "source": 1,
          "positions": [
              {
                  "x": 674,
                  "y": 59,
                  "id": 3,
                  "timeOffset": -461
              }
          ]
      },
      "timestamp": 1681183204319
  }
]
function App() {
  // useEffect( () => {
  //   new rrwebPlayer({
  //     target: document.body, // 可以自定义 DOM 元素
  //     // 配置项
  //     props: {
  //       events,
  //     },
  //   });
  // }, [] );
  // console.log("JhMonitorJhMonitor", jhMonitor)
  // new rrwebPlayer({
  //   target: document.body, // 可以自定义 DOM 元素
  //   // 配置项
  //   props: {
  //     events: ["H4sIAAAAAAAAA71bW3uiWNP9SxxCZrx4L8QDYguOiiDcCaQBBXTaA8Kv/1ZtQDGakEn38130kwTZe9dhVdWq2rYlHiJ/FGfOQn3Ve1nkKEPOxu9v+XjnJWaibnbRejTnvP7uPBEuZ1sYHtZKp/D7u1zrq8UkVw9q6u+d0XyHdy96f5ZNeuOdY8XpejSLphuV01IO78z3rmUWvjI8ej31VTPsF80Y4J9XaMa20EXugDO5t5UcY58ce2zt1TxUN/u/1EQ6O8oymqY3WTXIagvh3lXmU1eYx16uvloNXbRFFrnJ8Ei/q0nIuVYWYc/Mt8aHtaWPHcigRiS7LnniPHaX8ZZ0VaMsWlsk97gzGTX2w3PInhqPe4b+aJ6vrTHvK2ZRynsJ3cSLptE4diPs0xtv1kp8cAakB3vHfacrZ1v+1Lb4mNlbMUPId1CTIeePxns7NTlnpUH/Y9teBe3lrEJuJnROkOfkk57x5aT2uoHK9mR68j8Xl7/gE8kju27IDvPQ4aTQtZYk99Eh20Nn+IDzkjjyV6WNcRbOH+aeYHIkK54nEyOIfi6e+IPn6vOE+/M0Oi9+G837riBxjiWxvVbKS8DkvPrAb/HBZe8mh+c+SGF70j2JN67wQu98Dc+CE/rlmhNwclYJu4m+W1uXrZF0tswP8dHHfnvC0HR0h9uv2l/6DfufapxAztgX5bOXzki/TdOWvhBvfSXoACMC9IgnqzJGJz0ZNou5tTU8TFb6xrYu8T/GoM1/F+17el601UNc32EdOYHyzROsH27xm86RT/h4An+4SidndmmeG2mZ1u/Sv3Y90m/q8Zif/rseCeQR9Hy9kmH/zulBj9iP7Ugu1vC1qui5Yw3hz1ngr3T4zAtscRwDD/Alflo6N7GGmdd7nl9WizqGBtz3Ym/QliOQR6VfH2AUsmf0TuiN5IOz4DlXNDfrHr8nfdkZo3HsRGUe9Ufd10neObiCHrpKePbE2au26eYae+afUR/ySSqfnLxV12/mmYF4v275+bqefLQtae8kqGc96V+PdBrJuSs6eyaTwsfIU2X9GpkF86EQohbIEuyQqyPmZ9imG6xXWgA7Ul08uIq5VRXspQw9N+qWZ9H6lZp6uXx0hTFwvQzqmFYpFhTC1BH27Z7UoR47C3mHXJh5BeW3eewn5sEV5dhLtZMjdM6OcIknCeJo0REdSz07qXlCzT+SjsgFxUQk2XiS7ehaQ+RAJ4Y/zk9s9vJNW7flvq/gqmF/irkQz216znSfRn9TnqDctnNFncMZmbbRzg19TusUNvigNt/wpGbf01G9/Ec8TV1xjthYBr4SxsznC/nsAANr66V6BhuJWmBb47OfLE+NtWO/J4uoTwdVGeO9cewpl9AWgKWRv0cNKNcPzYXRoz2Re4AheyTzNuqnLXQDJ+kcoDthiYe9EWfVO6kJvM2aZ/3jJhdJVRw8J5zHJw91BrJ+sidiOpIjvAMfwfaJeWKyKU7uClwp2yBcGssM50g33A/Nk6vEv7DOU6NOYq8cljsmVJv5LGLYH4KvJkOKBfhSos/xbhasesD1w/PSRg1dRFcc/4J8qJ/Ip+L88LaQI/hhV9vNFi578hXqJOJ6GXhJB/yC2Qf8bhbYC/kEnnDE8zN8UHFLLTDNsTa51pBuYIDPeclLAJ4hwo9nOtNNkCuQC6BfqCoS5ORhjw6n1jbMZXO5zeCDbeAhRt3SL4Gbykf4mCeb+hZwq3RPT/CXfxO3RUtscqhNyOd/kpuWtUwdUC271ttcX/FXjqVt5vc8MCceaL74A9gRerngP5CtxM5NF6FFlwL1dO+NZh9w+HmM/JLXPYEnjjet3BG5BjkLvuv86+Ud+EfaIl8j12htvCR/0v/c8Qv0KBL2eirr073FVntFeFdSR4cAeTF3hPg0jbqZNwr+QmzivdkRMXREzEh4frRXcobzj54Yo1aZR/DIHuLztOb40ObrHoqtO1BcLgUzdZHPzGXMYnKZdCi2zlj3z9soTh3rBe+ZZCPOX2TBTBgCE5ADMYp3PHXr7L1kECzx3OOpz6Jnc8QI7DVETkn1KtbHKtYIDtldGARGYvKOyd4vUCMKxC5yTpxM8+7RF8xoLcTgTaV+nsCfKd5Rb9Ip6jFss0fN2NtY4/QPwU/kD4r7t1xOKG6wDtiJD2/GLkDNR67UGSd1yC6jMemmI7YObp4FBvgdcE3PKOYKV7iEXs7k7RMHWFvA1kCK/VI31HYJvEdG3l7+pY448vPe43XuDfwcPuaQA+JbPMSdRo16acM5cPBnYzaSZOIusAv7DDwUec8HfuQN5RbwFdLhNANmJtYFnONvereeCbyq/VnmJ/ze3RwCT+nsCZNexBNXOfkj7ZXlw4TswHfBq7draxD8GFX1I9WQb82tD/7j9Pgj1U3kYLZmsmrWmOVeHR1ZTphsKbfwjEsS3ok7APOMgwPbuTbSAsIy+Hau9mVW1xzk25KHwy8JH7o9yvVSzHJvIjE+3tAPcSEzfX6al9PPBbPPkfXxVAPpzGS4WQs+OCL4Vo9Hr3Y5exvgKPGjH2xm0uX0Xhbohrqfguuh7tP6vSOEHGS8aH1ZWAOTjhIXVN8Jg05yid/oGf3s8dv1itWxyh6I9ZF5JJkI0w7qFOnjrsi+esxsjs/WKc1k4uRtwV/7xzs/KnWsxK8OzqScZ+cB+kH5Re0dAi11SFaS+aoTuC7q57KJAerTCQPv9N6K0DvXjOCg9lVeW2yZz9eCKTnpOKR5UVkXSt8hljPiQ9iH+VXrsdgER0SOEBz4iXuFf87II5yzCDLYPv1hlD5BnYMNuzH5AjFA+SNB/T9CV/hkHkLenVbYd2t+spiJi2WVe6fpPPetZZ2zC61Zowq5EZPfqVda3hLHZb5+xovFpzOKb9R/jWuR4QQ+vcHZmf9H51Px2QeXcizirMSPEL/gUuBGP8D7wmXVM7PPSu4DvhkjTgkbbLZT+cBp+EDjv8eBNLHFBogz+wPOUM4QSz7Y1lto3+yfNOk/9hZLZquSYyNXUC2Q9+gn0ZtSPpAPbKbQ4KsLyw7erA4Pjp2hTqNHnVHeQW7VOXe0vfUkyhix41N/elBHzIdlHzJifSjxftqfA6/OwGXYGQ25HFdcUj6hfnfrgI871pjVWaqT5TxFJg4EzMhnj+pzMjy8UZ1HH+Qrf5MMpEeCM+/kN0vZeIoHyAK8dZGT4gNyODjMcHPtV1jve0EdkSsuOGe5v9o7VvsXFnP/RCSH964/IZyOY+JNsOMOeyLunBh9ZwbZgeuM8XZVkU+ewgXgR6GXzoOyZ5clezU+kWz4ydm99/tWsx/qDWiuIMz5Kq9fZYZNeA/8ylakzEVv5VsvVb/27ozKDo0zrvGi9+Uv56lS9ys/5+5zn96Iu+bvQ4qB67zREJyknBuzGXns0P6bLuH3zO4ERjy9j3f5mOzlrrpspjPtDy74J2rFQNKK8F7m5p2F2HrPwL2bRxZ39wypfvZX4029L7PF6DrvfR/vLJbBNcBBnAafB5ZHdf6VQ+Ii/qCsF9Me3UmQfenv/clnXBc5FZy9PP87OUdH/OoFxTzV2rZ5td4fd8r8cScbR7P1r8n2PE/h9w041GadNzAi8p3Vqt0nT2bo/28+Icx/0yehb0Gv/PnMl811wUVcOjcqZ/OoCweP3ZfVvH4XNfmcm3ROjsHuM3Iv7hwd7G+brKcse0BliJhHjaR+NB3/LLnxsA/75OQHU4nZnJlm9Z9jYN75abbHmt6PH/JD436woD4GPLuOYcLE1QfvOQrzA93JWB2hIQ/48bzmCBnyFfFSdjf3G375pN+56VLKOzvbImKnNWbMpzGjL34vZlQx3jplrg3Rg6IHksG353v0EojpLXj6mGbiv6ZP+k/0kfra0lF/0X+ms8CyhuiD0WuXPRXdIZR9wAg2hc/WqE3YB/V5zq37u0AzutkYPPe+x+jSOzRLflV7HFfOAliebvx93w9oxjijHsROOjn1OrQP3qP+GD3hjHqAzZs135qoi8S9m3i3E5qhHLBnGKN/3Pkk16bc7+dCl4CNpSvKPfB0+GR8+MQ+GeyAniM+u9RbMD4fb6Z3PedAZPKPZMIc9W94hrPQf0zRy+Bdmjujn2/IYvhZ2V8hlns8bLqPmZ1S9v67XiagHu6ibQboZQYver692soXahvLyJOXLdZGpU7qsZrr1D3vzW7KGP0M64tvPluxczsMN+AJ3qB6J7nkak+CveAXkfXld/YAl6b5A1/2ZFhHe5U6NOwjM11Z3kycgyvCPuBXsFXM+tpFuX85U5VvuOibbF113/iBndmzgPWM1Tnv+uE7eSfGQKD3J8asxBz6SMLQxNIhl856OOSWSu6H84V35x99YI/8ppc6R7al/3JE9ImWtJ2swC2FuJoFyAfHcjjCuj5q2HpwjN/MOeS7sLMdwu0KZ5c2IJtSLjkC/xv4Naz1qPJ5jWXE65zmgeQf1HOduKjEMKF0NuviNoeb0IwffnJZfMlVPJT2Rw2NwHk/ioMjcmgKfl7apVfN8+58IdNzvozlJtbDuzi+kwG4A1c9o74TdjuTFDbp8eDE6oe6PNjoyVnv5o6BTuf0uEuNFYprGzYr53PVOx/G6jv5VxXO72W/xd0VP0PYQ6b42Dt3+tf4/ujz+Eg9DXS+8tvm/niPA+5ovsDmRk27sXlFXs5bbCs+4f2PMUGzqAXfzGOC1lveYmI1z9mc07qrIyGbcxBX6vFb9G3IE/W86yZPie3KzwuZcNKMhdBO2QyJIwzf9KlnxLV95PfxlzH5nuT0R13UvNyLOAF6P6Uj4twdxQn6TsqBoS0cU7p3cRPktmZdK89Hjqj2uNrjivUMNY7lwvcYusUUi8sVbJN59ZwO+dcVVaqbqR0FhY5eVCs85HRNpLnQW8Rjb8R7VUO1/uC9nFhr5m4v9Frutjdr4ofW8kjzEHCCorT732fH6mRr+s4AagL69Z2HfGJb+9RJ5vu1EO5smqULEn6qeK7mWg89YOJ7arS91ttyvjKErE/mj/26Zqk8OAz8s+RpDqcby/0dhu9tIbJ3jQHN7C7VnPJ5LRo146T8zgbN2RxB3WkbNuvM9X4182vIbIrs+wLAb7fypZ49mZ3S7DYl7gHee/gxzFq+z6Pv4BfwYp74F/ilzvADn8TgFv/aFr9Fnk7WVpjB/uE68RNwlF9rJYSN4Z8kjOyoU9VWOacZKvsuAp9FP4wnGFJQ/3sPz17XDOPq08/8JGbf+XB6lNfv7TXtd4lP5Bqz/ZJ/embvfW14Z3NjJjGf9be0Fzdlc9Zr/kCcg5829vhDeMk1QyMfF0z2zaxoyA5ON+fo/vdxJrzksDdfzsJnDYz5Od1BVbmSzcdvOQc4KusC6l/QeD7LtLqO0/xspRtVb/CKvoB3rnOKmfBzxft0j+ZTD7VCz2XxGfs+4ya4aEZw0QvtMjWWl4eZXUJcc8B6i/pOCOuyes7Z6EHve5Gyv0Dfxp/95Na7Uq6q7+88dh8mcYtSRuwhEYZZf+Sm5sFl8wT0K2U/9ufuDm/3kpyOHp56wHeyiNTnkH7s70TiXSU7PP2e5tOZknryhEPwI3qC1Y32wu4ECpYfimmvxCreP5b1DGt63NEudoEqmDHVpsmCT1itp7qDzzzqX1gv0z2iju8o70/v6yvyIt1JLI+3HuS+1qAvDh2BeDm9Z4bg4fhsiDpCs72wrOFi1Q/2ZMFeqTsmRw8xNnLwfoCztb1K8dv8u/4dsvxAXFR3EVXvO4MO28e6d+210LMtrmcd1k/eRSzuS04lX+9ziMuB84EbEM8mbEjcAw8Gt16vuuW9Uekn4jDgY6ghxJHBLVzG4+7Pu8V8yUNqnLStg90ymnEyvwO34IrHt8WDjLc7pXd2UsG/wAdy5KuTX/LjYp3zLObU/st7bN376/Y+zSc4mqs+5iHCHuWtKx73LTrd8t4Vu+X6H4961Tnz2ve914dsD4zskA/OflH1Eo/7nCE/48I1r3uQsYqduh5/Xps/jj078chGd5j5ZN1H/gHGdO4Jz3q0mXFds3dTmWdxf+uJP8LF7/jkv2KtlKu/e52s/NhOjnu/V8vKl/cMVgj7zqu5zgdYfIxL9An6L8Qs6+na746/hNMHu315beV/ut+HjKz/ddn3FGKOZjgas8en96TcdPSlObDw5TkwzXivvYBUzw9f6HvtGptFbtn3Xqe3u7b67H+cxCmcFT2T22XaeML0q/cFH8vE6ca2lkmg/2PxoUwRh3fLO5k3dq+ypFouEQ+ZGt3rvXM9t73dp+yOWrGt7m4D9p0QqrtvJNdmcLne0+QVv1l2EifVY7p7nRhaUdn9hX0PaRNUsqqXT+0XcRftKzYsVFH/fRteYItaLuKTv+fXYvvyR7BmqJVMHve5jWdc9f0uWifoTG5aN+NbfCNV91Vs3bT/5XWFfrdu9sV1KtfAQnNdi37oT+7W1b7SWs6zG5i1JbJ1iVntU6xP27k6h17nq1yd8eUKB5fbzJ98S3J5Gd07MbmMccudyexFf/Ldj+d3JuzeopKte7szQ59Csa8X3ayO/bb/PwVdiy/fa9L/oWn8f5qq/yEbkO9ErX/Nn3mbjaeG9lUbk11vM960vour/B7Vflc/9bven73c4eWW41py4zJvrtOv/tx+vm6zFe/W1XIayzt/PYsj/RYPdza9x9djTp0aemv+gr8l/ffzlzA1gmutbJErb9YlnfEFhk1Bb6kRU8Ns18eYSX8iH7P5RqkPze0+k6uY9sc3ffqqWOlT8sRPsaQK7Xendqb1v5oHgN30Nnete/+y/neLq1yf58SsTSZ9s4S/485q9r///R/aR1Fq9DkAAA=="],
  //   },
  // });

  
  return (
    <div className="App" 
    // onClick={ () => jhMonitor._support.transportData.send({name: "huang"}) }
    onClick={ () => {
      // throw Error("aa")
      fetch('http://127.0.0.1:4000/public/tes?name=huang&age=20')
    } }
  >
      onclick
      {/* <img src="http:baidu.com/ss" /> */}
    </div>
  );
}

export default App;
