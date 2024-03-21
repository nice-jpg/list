
/**
 * initReflow
 * @file reflow.js
 * @param openBoxConfig openBox的选项
 */

/* eslint-disable fecs-camelcase */
export const initReflow = openBoxConfig => {
    return new window.OpenBox({...openBoxConfig});
};


/* eslint-disable max-len */
export const getOpenBoxConfigByUrl = (url, toolids = ['']) => {
    const toolBarIconsString = encodeURIComponent(JSON.stringify({
        toolids
    }));
    let iosScheme = `baiduboxapp://easybrowse?opentype=1&sfrom=feed&newbrowser=1&openurl=${encodeURIComponent(url)}&rbtnstyle=0&isBdboxShare=1&isla=0&toolbaricons=${toolBarIconsString}&menumode=2`;
    let androidCommand = {
        mode: '0',
        intent: `intent:#Intent;S.toolbaricons=${toolBarIconsString};S.menumode=2;S.create_menu_key=false;S.bdsb_light_start_url=${encodeURIComponent(url)};end`,
        'class': 'com.baidu.searchbox.xsearch.UserSubscribeCenterActivity',
        min_v: '16787968'
    };
    return {
        iosScheme,
        androidCommand,
        matrix: 'main',
        notUseIdm: true,
        sfrom: 'livepreview'
    };
};

export const initReflowByUrl = url => {
    const config = getOpenBoxConfigByUrl(url);
    return initReflow({
        ...config,
        showTip: true,
        waitTime: 300
    });
};


export const openReflow = config => {
    let openbox = initReflow(config);
    openbox.open(config);
};

export const openReflowByUrl = (url, toolids = ['3'], type) => {
    const config = getOpenBoxConfigByUrl(url, toolids);
    openReflow(config);
};
