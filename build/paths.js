

const path = require('path');

const projectRootPath = path.resolve(__dirname, '../');

const resolvePath = dir =>{
    return path.resolve(projectRootPath, dir);
};

const devComponentsDir = resolvePath('./');
const pageOutput = resolvePath('output');
const ssrOutput = resolvePath('output/ssr');

const entryName = {
    KANGYI: 'kangyi',
    OLYMPIC: 'olympic',
    REBANG: 'rebang',
    NEWSNOTICE: 'newsNotice',
    NEWS: 'news',
    HOT_COMMENT: 'hotComment',
    VIRUSMAP: 'virusMap',
    RECOMMEND: 'recommend',
    EXAMPUBLISH: 'exampublish',
    EXAMWALLET: 'examwallet',
};

const pageEntryMap = {
    [entryName.KANGYI]: resolvePath('src/pages/kangyi/index.js'),
    [entryName.OLYMPIC]: resolvePath('src/pages/olympic/index.js'),
    [entryName.REBANG]: resolvePath('src/pages/rebang/index.js'),
    [entryName.NEWSNOTICE]: resolvePath('src/pages/newsNotice/index.js'),
    [entryName.NEWS]: resolvePath('src/pages/news/index.js'),
    [entryName.HOT_COMMENT]: resolvePath('src/pages/hotComment/index.js'),
    [entryName.VIRUSMAP]: resolvePath('src/pages/virusMap/index.js'),
    [entryName.RECOMMEND]: resolvePath('src/pages/recommend/index.js'),
    [entryName.EXAMPUBLISH]: resolvePath('src/pages/exampublish/index.js'),
    [entryName.EXAMWALLET]: resolvePath('src/pages/examwallet/index.js'),
};

const templatePathMap = {
    [entryName.KANGYI]: resolvePath('template/kangyi.template.ejs'),
    [entryName.OLYMPIC]: resolvePath('template/olympic.template.ejs'),
    [entryName.REBANG]: resolvePath('template/rebang.template.ejs'),
    [entryName.NEWSNOTICE]: resolvePath('template/newsNotice.template.ejs'),
    [entryName.NEWS]: resolvePath('template/news.template.ejs'),
    [entryName.HOT_COMMENT]: resolvePath('template/hotComment.template.ejs'),
    [entryName.VIRUSMAP]: resolvePath('template/virusMap.template.ejs'),
    [entryName.RECOMMEND]: resolvePath('template/recommend.template.ejs'),
    [entryName.EXAMPUBLISH]: resolvePath('template/exampublish.template.ejs'),
    [entryName.EXAMWALLET]: resolvePath('template/examwallet.template.ejs'),
};

const ssrEntryMap = {
    [entryName.KANGYI]: resolvePath('src/pages/kangyi/containers/ssr/index.js'),
    [entryName.OLYMPIC]: resolvePath('src/pages/olympic/containers/ssr/index.js'),
    [entryName.REBANG]: resolvePath('src/pages/rebang/containers/ssr/index.js'),
    [entryName.VIRUSMAP]: resolvePath('src/pages/virusMap/containers/ssr/index.js'),
    // [entryName.RECOMMEND]: resolvePath('src/pages/recommend/containers/ssr/index.js'),
};

const mockDir = resolvePath('mock');

module.exports = {
    resolvePath,
    rootPath: projectRootPath,
    outputDir: resolvePath('output'),
    devComponentsDir,
    pageOutput,
    ssrOutput,
    mockDir,
    entryName,
    pageEntryMap,
    templatePathMap,
    ssrEntryMap,
    CDN: 'https://mbdp02.bdstatic.com/'
};
