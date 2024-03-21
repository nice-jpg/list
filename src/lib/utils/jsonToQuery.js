/**
 * @file jsonToQuery.js
 */


/**
 * @name jsonToQuery
 * @description 将对象转成url，但是没有添加对数组支持
 * @function
 * @param  {Object} json 待处理的json对象
 * @return {string}  str  处理之后的string字符串
 */

export default json => {
    if (typeof json === 'string') {
        return json;
    }
    let arr = [];
    for (let i in json) {
        arr.push(i + '=' + json[i]);
    }
    return arr.join('&');
};
