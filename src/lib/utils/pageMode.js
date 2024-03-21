/**
 * @file pageMode.js
 * @description 页面状态获取，darkmode/lightmode
 */

import {env} from '@baidu/auc-base/env';
import boxx from '@baidu/auc-base/boxx';
import {boxxOn} from './index';

const modeClassMap = {
    LIGHT_MODE: 'lightmode',
    NIGHT_MODE: 'nightmode',
    DARK_MODE: 'darkmode'
};

// 清除页面状态的全局class
const clearModeClass = () => {
    Object.keys(modeClassMap).forEach(modeKey => document.body.parentElement.classList.remove(modeClassMap[modeKey]));
};

// 设置页面状态，设置之前先进行清除工作
export const setModeClass = mode => {
    clearModeClass();
    document.body.parentElement.classList.add(mode);
};

/**
 * @name getPageMode
 * @description 获取页面模式 nightmode/lightmode/darkmode，获取失败默认lightmode
 * @returns {Promise} 获取完成后的回调，返回内容是pageModeEnum里的值
 */

export const getPageMode = () => new Promise(resolve => {
    let theme = new RegExp(encodeURIComponent('Theme/dark'));

    if (theme.test(navigator.userAgent)) {
        resolve(modeClassMap.DARK_MODE);
        return;
    }

    if (env.isIOS) {
        boxx.call('system.getTheme', {
            success(res) {
                if (res && res.data) {
                    const theme = res.data;
                    if (theme === 'dark') {
                        resolve(modeClassMap.DARK_MODE);
                    } else {
                        resolve(modeClassMap.LIGHT_MODE);
                    }
                }
            }
        });
    } else if (env.isAndroid) {
        boxx.call('system.getNightMode', {
            success(res) {
                if (res && res.data) {
                    const theme = res.data;
                    if (theme > 0 || theme.isNightMode > 0) {
                        resolve(modeClassMap.NIGHT_MODE);
                    } else {
                        resolve(modeClassMap.LIGHT_MODE);
                    }
                }
            }
        });
    }
});

// 监听页面状态变化的函数，只有iOS会执行相关逻辑
export const registerModeChange = (callback) => {
    try {
        let action = 'com.baidu.channel.foundation.themechanged';
        if (env.isAndroid) {
            action = 'com.baidu.channel.foundation.nightmodechanged';
        }
        boxxOn({
            action: action,
            page: 'topic',
            jscallback: (action, res = {}) => {
                let mode = modeClassMap.LIGHT_MODE;
                try {
                    res = JSON.parse(res);
                    if (+res.isNightMode > 0 && env.isAndroid) {
                        mode = modeClassMap.NIGHT_MODE;
                    } else if (res.theme === 'dark') {
                        mode = modeClassMap.DARK_MODE;
                    }
                } catch (e) {
                    console.log(e);
                } finally {
                    callback(mode);
                }
            }
        });        
    } catch (e) {
        console.log(e);
    }
};


/**
 * @name setPageMode
 * @description 在document.html上设置页面模式，nightmode/lightmode/darkmode和ios/android
 * @returns {Promise} 执行完毕的回调
 */

export const setPageMode = () => {
    // 注册页面模式改变的事件
    registerModeChange(mode => setModeClass(mode));

    const deviceClassName = env.isIOS ? 'ios' : env.isAndroid ? 'android' : 'oth';
    document.body.parentElement.classList.add(deviceClassName);
    env.isIOS && document.body.parentElement.classList.add('iphone');
    // 获取当前页面模式
    return getPageMode().then(mode => {
        try {
            setModeClass(mode);
        } catch (e) {
            console.error(e);
        }
    });
};
