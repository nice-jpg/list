
const sanBaseConfig = require('./san.base.config');
const paths = require('./paths');
const chainUtils = require('./chainUtils');
const env = require('./env');

module.exports = Object.assign(sanBaseConfig, {
    ...sanBaseConfig.baseConfigs,
    pages: {
        kangyi: {
            entry: paths.ssrEntryMap.kangyi,
            template: paths.templatePathMap.kangyi,
            filename: 'kangyi/index.html'
        },
        olympic: {
            entry: paths.ssrEntryMap.olympic,
            template: paths.templatePathMap.olympic,
            filename: 'olympic/index.html'
        },
        rebang: {
            entry: paths.ssrEntryMap.rebang,
            template: paths.templatePathMap.rebang,
            filename: 'rebang/index.html'
        },
        hotComment: {
            entry: paths.pageEntryMap.hotComment,
            template: paths.templatePathMap.hotComment,
            filename: 'hotComment/index.html'
        },
        virusMap: {
            entry: paths.ssrEntryMap.virusMap,
            template: paths.templatePathMap.virusMap,
            filename: 'virusMap/index.html'
        },
    },
    outputDir: paths.ssrOutput,
    css: {
        cssPreprocessor: 'less'
    },
    plugins: [],
    chainWebpack: config => {
        chainUtils.injectMiniCssExtractPlugin(config);
        chainUtils.injectCssModuleOption(config);
        chainUtils.injectSSRBase(config);
        chainUtils.injectRemoveStyleLoader(config);
        chainUtils.injectSVG(config);
        chainUtils.injectSanAlias(config);
        chainUtils.injectDevBoxxAlias(config);
        chainUtils.injectScriptExtHtmlWebpackPlugin(config);
    },
    polyfill: false,
    devServer: undefined,
});
