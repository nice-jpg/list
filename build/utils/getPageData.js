const axios = require('axios');
const {testApiHost, useMockData} = require('../../devConfig');
const path = require('path');
const fs = require('fs');
const paths = require('../paths');

const getMockData = (pageName) => {
    const mockFile = path.resolve(paths.mockDir, `_data_/${pageName}/index.json`);
    return JSON.parse(fs.readFileSync(mockFile, 'utf-8').toString());
};

const getLorepagePageData = async (query, headers) => {
    try {
        let result = {};
        let data = {};
        if (useMockData) {
            console.log('获取页面同步数据，来源：mock');
            data = getMockData('news');
        } else {
            console.log(`获取页面同步数据，来源：${testApiHost}`);
            query._format = 'json';
            result = await axios.get(`${testApiHost}/newspage/data/lorepage`, {
                params: query,
                headers
            });
            data = result.data.data;
        }
        return data;
    } catch (e) {
        console.error(e);
        console.error('获取页面同步数据失败', JSON.stringify(query));
        return null;
    }
};

module.exports = {
    getMockData,
    getLorepagePageData
};
