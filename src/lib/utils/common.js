/**
 * @file common.js
 */

export const getUrlParam = name => {
    let reg = new RegExp('(^|(&|/?))' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return (r[3]);
    }
    return '';
};

/**
 * loadImgs
 * @description 用于加载一个图片列表
 * @param {Array} list 图片url列表
 * @param {Number} maxTime 最大延迟时间(ms)
 * @returns {Promise} 加载完毕后的Promise
 */
export const loadImgs = (list, maxTime = 800) => {
    if (!Array.isArray(list)) {
        return Promise.resolve();
    }
    return new Promise(resolve => {
        let count = list.length;
        list.forEach(url => {
            let flag = false; // 是否处理过该图片的标志
            let img = new Image();
            img.src = url;
            const resolver = () => {
                if (flag) {
                    return;
                }
                count--;
                flag = true;
                count <= 0 && resolve();
            };
            img.onload = resolver;
            img.onerror = resolver;
            setTimeout(resolver, maxTime);
        });
    });
};

/**
 * invokeScheme
 * @description 调用scheme
 * @param {String} scheme 需要调用的scheme
 * @returns {undefined} 无返回值
 */
export const invokeScheme = scheme => {
    if (!scheme) {
        console.error('schema should not be empty');
        return;
    }
    let $node = document.createElement('iframe');
    $node.style.display = 'none';
    $node.src = scheme;
    let body = document.body || document.getElementsByTagName('body')[0];
    body.appendChild($node);

    setTimeout(function () {
        body.removeChild($node);
        $node = null;
    }, 0);
};

/**
 * debounce
 * @param {Function} func
 * @param {Number} wait
 * @param {Boolean} immediate
 */
export const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};

/**
 * @description 滑到容器底部
 */
export const scrollToBottom = (ref, func) => {
    if (!ref) {
        return;
    }
    // 容器滚动条滚动距离
    let scrollTop = ref.scrollTop;
    // 容器内容实际高度
    let scrollHeight = ref.scrollHeight;
    // 容器可视范围高度
    let clientHeight = ref.clientHeight;

    // 简单判断滚动到底，不同设备误差1px
    if (scrollTop + clientHeight >= scrollHeight - 1 && scrollTop + clientHeight <= scrollHeight + 1){
        if (Object.prototype.toString.call(func) === '[object Function]') {
            // 触底执行函数
            func();
        }
    }
};