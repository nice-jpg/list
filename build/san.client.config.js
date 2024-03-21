/**
 * @file san config
 * @author leizhihao <leizhihao@baidu.com>
 *
 * 环境变量, scripts/preview.js脚本中定义
 * COM_PAGE: 组件类型默认情况下, 组件路径是src/components; 值为src/pages中有效目录时, 路径为src/pages/$COM_PAGE/components
 * COM_NAME: 组件名称, 默认avatar
 */

// 生产环境下模板目录

const path = require('path');
const env = require('./env');
// 这个是 release 目录，打包机器只能支持 output，所以谨慎修改
const devConfig = require('../devConfig');
const {baseConfigs} = require('./san.base.config');
const chainUtils = require('./chainUtils');
const paths = require('./paths');
const webpack = require('webpack');
const chalk = require('chalk');

const plugins = [];

const proxyPlugin = {
    id: 'multi-pages-proxy',
    apply(api) {
        api.middleware(() =>
            require('hulk-mock-server')({
                contentBase: path.outputDir,
                rootDir: path.mockDir,
                processors: [
                    {
                        // 热榜
                        router: '/client/rebang',
                        processor: require('./proxy/rebang-page'),
                        options: {}
                    }
                ]
            })
        );
    }
};

plugins.push(proxyPlugin);


if (env.isDev && env.isSSR) {
    plugins.push({
        id: 'san-ssr-dev-server',
        apply(api) {
            const webpackChainConfig = api.getWebpackChainConfig();
            chainUtils.injectSSRBase(webpackChainConfig);
            chainUtils.injectSSRDev(webpackChainConfig);
            chainUtils.injectRemoveStyleLoader(webpackChainConfig);

            const compileHandler = (err, stats) => {
                if (err || stats.hasErrors()) {
                    console.error(chalk.red('SSR 内容编译失败'));
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.error(stats.toJson().errors[0]);
                    }
                }
                else {
                    console.log(chalk.green('SSR 内容编译成功'));
                }
            };
            const compile = webpack(webpackChainConfig.toConfig());
            compile.watch(
                {
                    aggregateTimeout: 300,
                    poll: undefined
                },
                compileHandler
            );

            api.middleware(() =>
                require('hulk-mock-server')({
                    contentBase: paths.outputDir,
                    rootDir: paths.mockDir,
                    processors: [
                        {
                            router: '/ssr/rebang',
                            processor: require('./proxy/rebang-ssr')
                        }
                    ]
                })
            );
        }
    });
}

module.exports = {
    ...baseConfigs,
    outputDir: paths.pageOutput,
    filenameHashing: env.isProd,
    pages: {
        rebang: {
            entry: paths.pageEntryMap.rebang,
            template: paths.templatePathMap.rebang,
            filename: 'rebang/index.html'
        }
    },
    css: {
        sourceMap: env.isDebug ? devConfig.sourceMap : false,
        cssPreprocessor: 'less'
    },
    plugins,
    // splitChunks: {
    //     cacheGroups: {
    //         vendors: {
    //             name: 'vendors',
    //             chunks: 'all',
    //             test: /[\\/]node_modules(?!\/@baidu)[\\/]/,
    //             // minChunks: 1,
    //             priority: -10
    //         }
    //     }
    // },
    chainWebpack: config => {
        // 这里可以用来扩展 webpack 的配置，使用的是 webpack-chain 语法
        chainUtils.injectBase(config);
        chainUtils.injectSanAlias(config);
        chainUtils.injectCssModuleOption(config);
        chainUtils.injectScriptExtHtmlWebpackPlugin(config);
    }
};
