/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */

const isDev = process.env.NODE_ENV !== 'production';
const isQaBuild = +process.env.OTP === 1;
const isDebugMode = +process.env.DEBUG === 1;
const isDebug = isDev || isQaBuild || isDebugMode;

module.exports = {
    isProd: process.env.NODE_ENV === 'production',      // 生产模式
    isDev,                                              // 本地开发模式
    isQaBuild,                                          // 是否是qa环境的产出(跟线上基本一致，但是有些debug用的配置)
    isDebug,                                            // 是否是debug模式(sourceMap，devComponentDir等)
    isSSR: +process.env.SSR === 1,                      // 是否是SSR
    isTest: +process.env.TEST === 1                     // 暂无用
};
