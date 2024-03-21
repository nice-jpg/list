import BaseLog from '@baidu/feed-baselog';
import boxx from '@baidu/auc-base/boxx';

export const keyZipObject = keyList => {
    const result = {};
    keyList.forEach(v => (result[v] = v));
    return result;
};

export const debounce = (fn, wait, time) => {
    let previous = null;
    let timer = null;
    return () => {
        let now = +new Date();
        if (!previous) {
            previous = now;
        }
        // 当上一次执行的时间与当前的时间差大于设置的执行间隔时长的话，就主动执行一次
        if (now - previous > time) {
            clearTimeout(timer);
            fn();
            previous = now; // 执行函数后，马上记录当前时间
        } else { // 否则重新开始新一轮的计时
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn();
            }, wait);
        }
    };
};

export const getUrlParam = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results || !results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

// 窗口可视范围的高度
export const getClientHeight = () => {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight)
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight)
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
    }
    return clientHeight;
};

export const isElementVisible = el => {
    let {top, left, width, height} = el.getBoundingClientRect();
    // 水平和垂直两个方向同时在可视区域
    return top < window.innerHeight && top * (-1) < height && left < window.innerWidth && left * (-1) < width;
};

// thunder分发日志
export const log = (type, params) => {
    const baseParams = {
        ct: 3,
        // 点击 cst 2 ，展现 cst 1
        cst: type === 'clk' ? 2 : 1,
        logFrom: 'feed_midbox',
        logInfo: 'a2_l_topic_ip'
    };
    const baselog = new BaseLog({
        mode: 1,
        tParams: baseParams
    });
    baselog.sendLog(params);
};

export const cookie = function (key, value, options) {
    let milliseconds;
    let time;
    let result;
    let decode;
    if (arguments.length === 0) {
        return document.cookie;
    }
    // A key and value were given. Set cookie.
    if (arguments.length > 1 && String(value) !== '[object Object]') {
        // Enforce object
        options = options || {};
        if (value === null || value === undefined) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number') {
            milliseconds = options.expires;
            time = options.expires = new Date();
            time.setTime(time.getTime() + milliseconds);
        }
        value = String(value);
        return (document.cookie = [
            key, '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
    // Key and possibly options given, get cookie
    options = value || {};
    decode = options.raw ? function (s) {
        return s;
    } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )'
        + key + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

export const boxxOn = (params) => {
    if (boxx.event) {
        boxx.event.on(params);
    } else {
        boxx.on(params);
    }
}