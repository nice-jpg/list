/**
 * @file store 数据初始化
 */
 import stores from './stores';

 /**
  * SSR 也需要用到，保持简单纯粹
  * @param data {Object} 传入的标准数据new.d.ts结构
  * @param urlQuery {Object} url参数
  * @return 初始化的StoreNews对象数据
  */
const processInitData = (data = {}, urlQuery = {}) => {
    let finalData = {};

    // eslint-disable-next-line guard-for-in, no-unused-vars
    for (let key in stores) {
        if (typeof stores[key].init === 'function') {
            finalData[key] = stores[key].init(data, urlQuery);
        } else {
            finalData[key] = stores[key];
        }
    }

    return finalData;
};

export default processInitData;
