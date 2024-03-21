const {getMockData} = require('../utils/getPageData');
const {ssrRender, renderTpl}  = require('../utils/ssrRender');

const pageName = 'rebang';

// 接口请求分发，区分线上和线下
module.exports = (options = {}) => async (req, res, next, filename) => {
    let data = null;
    try {
        console.log(pageName, 'ssr数据获取开始');
        data = await getMockData(pageName);
        console.log(pageName, 'ssr数据获取成功');
        let html = ssrRender(data, pageName);
        res.end(html);
    } catch (e) {
        console.error(e);
        if (data) {
            console.error(pageName, '请求数据成功，ssr渲染失败，将走降级逻辑');
            res.end(renderTpl({
                sortsData: data
            }));
        } else {
            console.error('数据请求失败，将用本地mock数据渲染');
            const mockData = getMockData('topic');
            res.end(renderTpl({
                sortsData: mockData
            }));
        }
    }
};