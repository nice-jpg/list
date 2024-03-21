const path = require('path');

const pr2rem = require('postcss-plugin-pr2rem');


const pr2remConfig = {
    // 设计图为1242px
    rootValue: 100 * 3,
    unitPrecision: 5,
    propWhiteList: [],
    propBlackList: [],
    selectorBlackList: [],
    ignoreIdentifier: '00',
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
};


module.exports = {
    plugins: [
        pr2rem(pr2remConfig),
        // uikit(uikitConfig),
        require('autoprefixer'),
        require('postcss-discard-duplicates')
    ]
};
