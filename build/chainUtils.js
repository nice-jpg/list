
const paths = require('./paths');

const emptyLoader = paths.resolvePath('build/loader/empty-loader');
const chalk = require('chalk');
const env = require('./env');
const path = require('path');
const devConfig = require('../devConfig');

const ScriptExtWebpackPlugin = require('script-ext-html-webpack-plugin');

const injectLessCache = webpackChainConfig => {
    if (env.isProd) {
        console.log(chalk.bgYellow('cache-loader 只能在开发环境用'));
    }
    webpackChainConfig.module
        .rule('less')
        .oneOf('normal-modules')
        .use('cache-loader')
        .loader('cache-loader')
        .before('css-loader')
        .end()
        .end()
        .oneOf('normal')
        .use('cache-loader')
        .loader('cache-loader')
        .before('css-loader')
        .end()
        .end();
};

const injectTSConfig = webpackChainConfig => {
    webpackChainConfig.module
        .rule('ts')
        .test(/\.ts/)
        .use('babel-ts-loader')
        .loader('babel-loader')
        .options({
            presets: [
                [
                    'san-cli-plugin-babel/preset',
                    {debug: false}
                ],
                '@babel/preset-typescript'
            ]
        });
};

// 为 JS 注入 cache
const injectJSCache = webpackChainConfig => {
    webpackChainConfig
        .module
        .rule('js')
        .use('cache-loader')
        .loader('cache-loader')
        .before('babel-loader')
        .end()
        .end();
};

const injectSSRDev = webpackChainConfig => {
    webpackChainConfig.devtool('hidden-source-map');
    webpackChainConfig.module
        .rule('less')
        .oneOf('normal-modules')
        .use('css-module-dev-loader')
        .loader(paths.resolvePath('build/loader/cssModuleDevLoader'))
        .before('css-loader');
};

// 移除 styleLoader;(用于 SSR 的dev 和 prod 环境)
const injectRemoveStyleLoader = webpackChainConfig => {
    webpackChainConfig.module
        .rule('less')
        .oneOf('normal-modules')
        .uses.delete('style-loader')
        .end()
        .end()
        .oneOf('normal')
        .uses.delete('style-loader');
};

// 生产：css mini-css-extract-plugin 配置; 注意这会导致产出的 css 不打印出来路径（其实是生效的）
const injectMiniCssExtractPlugin = webpackChainConfig => {
    const filename = 'static/multi-pages/css/[name].[hash:8].css?clientprefetch=1';
    webpackChainConfig
        .plugin('extract-css')
        .use(require('mini-css-extract-plugin'), [{
            filename,
            chunkFilename: filename
        }]);
};

// 使用标准版本 san，spa 版本不支持反解；
const injectSanAlias = webpackChainConfig => {
    webpackChainConfig
        .resolve
        .alias
        .set(
            'san',
            paths.resolvePath(`node_modules/san/dist/${env.isDebug ? 'san.dev.js' : 'san.min.js'}`)
        );
};

const injectCssModuleOption = webpackChainConfig => {
    webpackChainConfig.module
        .rule('less')
        .oneOf('normal-modules')
        .use('css-loader')
        .options({
            sourceMap: false,
            importLoaders: 2,
            modules: {
                localIdentName: env.isDebug ? '[name]_[local]_[hash:base64:5]' : '[hash:base64:5]'
            }
        })
        .end();
};

const injectSVG = webpackChainConfig => {
    webpackChainConfig.module
        .rule('svg')
        .uses.delete('svg-url-loader')
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({symbolId: '[name]'});
};

const injectDevComponent = config => {
    if (env.isDebug) {
        config
            .resolve
            .modules
            .prepend(paths.devComponentsDir)
            .end();
    }
};

const injectUrlLoader = config => {
    // url-loader
    config.module
        .rule('img')
        .test(r => {
            if (/\.(png|jpe?g|gif|webp)(\?.*)?$/.test(r)) {
                return true;
            }
            return false;
        })
        .use('url-loader')
        .options({
            limit: 0,
            noquotes: true,
            esModule: false,
            name: 'static/multi-pages/img/[name].[hash:8].[ext]?clientprefetch=2'
        });
};

const getAlias = () => {
    const baseAlias = {
        '@': paths.resolvePath('src'),
        '@assets': paths.resolvePath('src/assets'),
        '@app': paths.resolvePath('src/lib/App.js'),
        '@store': paths.resolvePath('src/lib/Store.js')
    };

    let devAlias = {};
    // 开发环境的依赖收敛到topic-component中
    if (env.isDebug) {
        const npmPackages = [
            '@baidu/wuji-san',
            '@baidu/boxx',
            '@baidu/xbox',
            '@baidu/xbox-concern',
            '@baidu/xbox-subscribe'
        ];
        npmPackages.forEach(name => {
            devAlias[name] = path.resolve(paths.devComponentsDir, 'node_modules/' + name);
        });
    }

    return Object.assign({}, baseAlias, devAlias);
};

const injectBase = config => {
    injectDevComponent(config);
    injectTSConfig(config);

    if (env.isDebug && devConfig.useCacheLoader) {
        injectLessCache(config);
        injectJSCache(config);
    }

    if (!env.isDev) {
        // 给js及css资源加上clientprefetch=1，添加后安卓可缓存静态资源
        config.output.filename('static/multi-pages/js/[name].[hash:8].js?clientprefetch=1');
        injectMiniCssExtractPlugin(config);
    }

    const alias = getAlias();
    Object.keys(alias).forEach(key => {
        config.resolve.alias.set(key, alias[key]);
    });

    // 配置ts
    config.resolve.mainFields.add('browser').add('module').add('main');
    config.resolve.extensions.add('.ts');

    config.resolve.mainFields.add('tsmain').add('browser').add('module').add('main');

    // svg图标
    injectSVG(config);

    injectUrlLoader(config);
};


// SSR基础配置（用于开发模式以及产出环境）
const injectSSRBase = webpackChainConfig => {
    injectBase(webpackChainConfig);
    // 删掉进度条
    webpackChainConfig.plugins.delete('progress');
    // 关掉devServer
    webpackChainConfig.set('devServer', null);
    // 替换入口为 ssr-content的 component
    webpackChainConfig
        .target('node')
        .entry(paths.entryName.KANGYI)
        .clear()
        .add(paths.ssrEntryMap[paths.entryName.KANGYI])
        .end()
        .entry(paths.entryName.REBANG)
        .clear()
        .add(paths.ssrEntryMap[paths.entryName.REBANG])
        .end()
        .entry(paths.entryName.OLYMPIC)
        .clear()
        .add(paths.ssrEntryMap[paths.entryName.OLYMPIC])
        .end()
        .entry(paths.entryName.VIRUSMAP)
        .clear()
        .add(paths.ssrEntryMap[paths.entryName.VIRUSMAP])
        .end()
        .output
        .libraryTarget('commonjs2')
        .path(paths.ssrOutput)
        .filename('[name]/ssr.js')
        .end();

    // 部分资源在 webpack 直接注入空函数:SVG、@baidu/boxx、@baidu/xbox*、feed-baseLog
    webpackChainConfig.module
        .rule('svg')
        .uses.delete('svg-sprite-loader')
        .delete('svg-url-loader')
        .end()
        .use('assets-ssr-loader')
        .loader(emptyLoader)
        .end();
    webpackChainConfig.module
        .rule('boxx')
        .test(r => /@baidu\/boxx\/(?:[^\/]+)\/.+\.js$/.test(r))
        .use('empty-loader')
        .loader(emptyLoader)
        .end();

    webpackChainConfig.module
        .rule('ssr-empty-lib')
        .test(r => /baidu\/(xbox-subscribe)|(xbox-concern)|(ubc-report-sdk)|(feed-baselog)/.test(r))
        .use('empty-loader')
        .loader(emptyLoader)
        .end();
};

// 开发模式下，非端能力mock时依赖landing-component中的boxx
// 生成模式下目前也有俩boxx，先通过这种方式保证只有一个boxx
const injectDevBoxxAlias = webpackChainConfig => {
    let dir = paths.rootPath;
    if (env.isDev || env.isOTP) {
        dir = paths.devComponentsDir;
    }
    const finalPath = path.resolve(dir, 'node_modules/@baidu/boxx');
    webpackChainConfig
        .resolve
        .alias.set('@baidu/boxx', finalPath);
};

const injectScriptExtHtmlWebpackPlugin = webpackChainConfig => {
    webpackChainConfig
    .plugin('script-ext')
    .use(ScriptExtWebpackPlugin, [{defaultAttribute: 'defer'}])
    .after('html')
    .end();
};


module.exports = {
    injectJSCache,
    injectLessCache,
    injectSSRDev,
    injectRemoveStyleLoader,
    injectMiniCssExtractPlugin,
    injectSanAlias,
    injectCssModuleOption,
    injectSVG,
    injectSSRBase,
    injectBase,
    injectDevBoxxAlias,
    injectScriptExtHtmlWebpackPlugin
};
