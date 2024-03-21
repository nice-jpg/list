/* eslint-disable */

const testApiHostMap = {
    online: 'http://mbd.baidu.com',
};
module.exports = {
    dropConsole: false,                                                 // build是否移除console
    sourceMap: true,                                                    // build是否使用sourceMap
    useDevComponent: true,                                              // 依赖优先加载topic-component
    injectVConsole: true,                                               // 是否注入vconsole --此配置暂不可用
    useMockData: false,                                             // 是否使用mock数据
    testApiHost: testApiHostMap.online,
    useCacheLoader: true
};
