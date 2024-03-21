const paths = require('../paths');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const {getMockData} = require('../utils/getPageData');
const axios = require('axios');

module.exports = () => async (req, res) => {
    console.log('?????');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    const tpl = fs.readFileSync(path.resolve(paths.templatePathMap[paths.entryName.REBANG])).toString();

    const compile = handlebars.compile(tpl);
    // 数据处理
    const {useMockData, testApiHost} = require('../../devConfig');
    let mockData = '';
    const query = req.query;
    const cookie = req.get('Cookie');
    const UA = req.get('User-Agent');
    if (!useMockData) {
        console.log('使用测试环境数据');
        try {
            const result = await axios.get(`${testApiHost}/newspage/data/cityhotlist?&_format=json`, {
                params: {
                    ...query,
                    headers: {
                        'Cookie': cookie,
                        'User-Agent': UA
                    }
                }
            });
            mockData = result.data.data;
        } catch (e) {
            console.error(e);
        }
    } else {
        console.log('使用mock data');
        mockData = getMockData('rebang');
    }
    let html = compile({
        sortsData: JSON.stringify(mockData)
    });
    html = html.replace('</html>', '<script type="text/javascript" charset="utf-8" src="/rebang.js"></script></html>');

    res.send(html);
};