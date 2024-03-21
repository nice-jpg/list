import {env} from '@baidu/auc-base/env';

export const getQueryString = (name) => {
    if (env.isSSR) {
        return;
    }
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
