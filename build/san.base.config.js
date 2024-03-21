
const paths = require('./paths');
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const devConfig = require('../devConfig');
const env = require('./env');

// 生产环境下的静态目录
const STATIC_PRO = 'static/multi-pages';

const baseConfigs = {
    publicPath: isProduction ? paths.CDN : '/',
    assetsDir: isProduction ? STATIC_PRO : 'static',
    /* eslint-disable max-len */
    transpileDependencies: [
        /@baidu\/(?:xbox|nano|wuji|nano-theme|ubc-report-sdk|auc-|boxx|pc-|ug-|eop-utils|wuji-)|query-string|split-on-first|clipboard|url-parse|strict-uri-encode/,
        /@baidu\/fs-/,
        /@baidu\/mo-/
    ],
    terserOptions: {
        compress: {
            // eslint-disable-next-line
            drop_console: env.isDebug ? devConfig.dropConsole : true
            // drop_console: false
        }
    },
    sourceMap: env.isDebug ? devConfig.sourceMap : false,
};

let p = path.resolve('./node_modules/@baidu/xbox/');
let p2 = path.resolve('./node_modules/@baidu');
if (!isProduction || env.isDebug) {
    baseConfigs.alias = {
        '@baidu/xbox/browser': path.join(p, 'browser'),
        '@baidu/xbox/extend': path.join(p, 'extend'),
        '@baidu/xbox/get-box-name': path.join(p, 'get-box-name'),
        '@baidu/xbox/get-box-version': path.join(p, 'get-box-version'),
        '@baidu/xbox/get-global-func': path.join(p, 'get-global-func'),
        '@baidu/xbox/is': path.join(p, 'is'),
        '@baidu/xbox/is-box': path.join(p, 'is-box'),
        '@baidu/xbox/is-matrix': path.join(p, 'is-matrix'),
        '@baidu/xbox/json2query': path.join(p, 'json2query'),
        '@baidu/xbox/monitor': path.join(p, 'monitor'),
        '@baidu/xbox/na': path.join(p, 'na'),
        '@baidu/xbox/os': path.join(p, 'os'),
        '@baidu/xbox/query2json': path.join(p, 'query2json'),
        '@baidu/xbox/type': path.join(p, 'type'),
        '@baidu/xbox/version_compare': path.join(p, 'version_compare'),
        '@baidu/xbox/date-format': path.join(p, 'date-format'),
        '@baidu/xbox/guid': path.join('./node_modules/@baidu/xbox/', 'guid'),
        './@baidu/mo-base': path.join(p2, 'mo-base'),
        './@baidu/wuji-san': path.join(p2, 'wuji-san'),
        './@baidu/wuji-uikit': path.join(p2, 'wuji-uikit'),
    };
} else {
    baseConfigs.alias = {
        './@baidu/mo-base': 'node_modules/@baidu/mo-base/',
        './@baidu/wuji-san': 'node_modules/@baidu/wuji-san',
        './@baidu/wuji-uikit': 'node_modules/@baidu/wuji-uikit',
    };
}


module.exports = {
    baseConfigs
};

