const path = require('path');
const paths = require('../paths');
const fs = require('fs');

module.exports.getMockData = (pageName) => {
    const mockFile = path.resolve(paths.mockDir, `_data_/${pageName}/index.json`);
    return JSON.parse(fs.readFileSync(mockFile, 'utf-8').toString());
};
