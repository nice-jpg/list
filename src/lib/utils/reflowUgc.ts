
/**
 * initReflow
 *
 * @param invokeDrag invokeApp
 */

/* eslint-disable fecs-camelcase */
import invokeDrag from '@baidu/wise-invoke-drag';
import {invokeApp} from '@baidu/ug-invoke-app';

export const initReflowByUrl = url => {
    return new invokeDrag.DragSingle({
        isNeedDrag: false,
        backflow: () => {
            // TODO: 点击回调
            openReflowByUrl(url)
        }
    });
};

export const openReflowByUrl = (url) => {
    invokeApp(getConfigByUrl(url));
};

export const getConfigByUrl = (url) => {
    !/isimmersive/.test(url) ? url += '&isimmersive=immersive': '';
    let toolbaricons = encodeURIComponent('{"toolids":["2","3"],"tids":["2","3"]}');// 底bar按钮 1 评论 2 收藏 3 分享 4 评论输入框 5 点赞 6 转发 
    let immersive = "barcolor=00000000&layoutfullscreen=1";// 沉浸式参数
    let logargs = encodeURIComponent('{"channel":"1019151h"}'); // 统计参数
    return {
        appName: 'baiduboxapp',
        scheme: `baiduboxapp://v1/easybrowse/open?url=${encodeURIComponent(url)}&toolbaricons=${toolbaricons}&${immersive}&logargs=${logargs}&needlog=1`
    }
};

