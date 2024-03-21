import {env} from '@baidu/auc-base/env';
import invoke from '@baidu/xbox/na/invoke';
export const numberFormatter = (val) => {
    let unit = '';
    val = +val;
    if (val >= 100000000) {
        val = parseFloat((val / 100000000).toFixed(1));
        unit = '亿';
    } else if (val >= 10000) {
        val = parseFloat((val / 10000).toFixed(1));
        unit = '万';
    }
    return {
        val,
        unit,
        str: val + unit
    };
};
export const jump = (data) => {
    const {link, cmd, swan} = data;
    if (env.isBoxSeries) {
        if (swan) {
            boxx.call('swan.open', {
                appKey: swan.appId,
                path: swan.url,
                _baiduboxapp: {
                    ext: swan.ext,
                    from: swan.from
                },
                query: swan.params
            });
        }
        else if (typeof cmd === 'string') {
            invoke(cmd);
        }
        else if (+cmd.mode === 2 || +cmd.mode === -1) {
            invoke(cmd.url);
        }
        else {
            if (/baiduboxapp/.test(cmd.intent)) {
                invoke(cmd.intent);
            } else {
                command(cmd.intent, cmd.mode, cmd.class, cmd.min_v);
            }
        }
    } else {
        location.href = link;
    }
};
