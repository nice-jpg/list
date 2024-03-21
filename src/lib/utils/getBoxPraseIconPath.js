/**
 * getBoxPraseIconPath
 * @file getBoxPraseIconPath.js 获取端上aps配置的点赞icon
 * @param
 */
import {invokeP} from '@baidu/xbox/na/invoke';

// 加工file path为http请求
const filePath2Http = (path) => {
    let extension = path.split('.').reverse()[0];
    return `https://getLocalFile/trick?clientprefetch=0&extension=${extension}&path=${encodeURIComponent(path)}`;
};

const getBoxPraseBase = (iconType) => {
    return new Promise((resolove, reject) => {
        try {
            invokeP('praise/fetchIconPath', {
                params: {
                    name: iconType
                }
            }).then(res => {
                if (res.unPraise) {
                    for (let i in res.unPraise) {
                        res.unPraise[i] = filePath2Http(res.unPraise[i]);
                    }
                }
                if (res.praise) {
                    for (let i in res.praise) {
                        res.praise[i] = filePath2Http(res.praise[i]);
                    }
                }
                resolove(res);
            }, err => {
                resolove('');
            });
        } catch (err) {
            resolove('');
        }
    });
};
export const getBoxPraseIconPath = (praiseIconList) => {
    // 12.28方案，端能力praise/fetchIconPath不支持批量，之后版本会支持，请求一次端能力可获取到使用的所有icon的path
    let getBoxPraseBaseList = [];
    praiseIconList.forEach(item => {
        getBoxPraseBaseList.push(getBoxPraseBase(item.icon_type));
    });
    return Promise.all(getBoxPraseBaseList);
};