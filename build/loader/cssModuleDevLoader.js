/**
 * @file 这本是个不应该存在的loader。
 * 因为发现同样的编译代码，在ssr prod环境下可以正常输出css object，而在ssr dev环境下返回结构不对；
 * 初步怀疑是因为本地环境切换ssr/csr * dev/prod时候，产生了不同的编译产物，而此时被cache缓存住了，从而导致在ssr+dev时候出现异常；
 * 本组件做一个兼容组件用；
 */

module.exports = function boxxLoader(source) {
    let localsStringMatch = /exports.locals\s=\s({[\w\W]+})/.exec(source);
    let localsString = localsStringMatch && localsStringMatch[1];
    if (localsString) {
        return `exports = module.exports = ${localsString};`;
    }
    return source;
};
