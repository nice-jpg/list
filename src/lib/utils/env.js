/**
 * @file env.js
 */

import getBoxVersion from '@baidu/xbox/get-box-version';

const ua = window.navigator.userAgent;

export const env = {
    ua,
    isMobile: !!ua.match(/mobile/i),
    // isPC: !isMobile,
    isIphone: ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isIOS: ua.match(/iphone|ipod|ipad/i),
    isAndroid: ua.match(/android/i),
    isUC: ua.match(/UCBrowser/gi),
    isQQBrowser: ua.match(/MQQBrowser/gi),
    isBDBox: ua.match(/baiduboxapp/gi),
    isBaiduApp: / baiduboxapp\//i.test(ua) &&  !/ (lite|info|mission|pro) baiduboxapp/.test(ua),
    isBoxSeries: / baiduboxapp\//i.test(ua),
    isWeixin: ua.match(/micromessenger/gi), // 微信
    isMap: ua.match(/baidumap/i),
    isSafari: ua.match(/Safari/i),
    isBDbrowser: !!ua.match(/baidubrowser/i), // 百度浏览器app
    boxVersion: getBoxVersion()
};

