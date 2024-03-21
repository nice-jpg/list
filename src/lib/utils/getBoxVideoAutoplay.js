import boxx from '@baidu/auc-base/boxx';

export const getWifiVideoAutoplaySwitchType = () => {
    return new Promise((resolove, rejetc) => {
        if (boxx.canIUse('search.getWifiVideoAutoplaySwitchType')) {
            boxx.call('search.getWifiVideoAutoplaySwitchType', {
                success(res) {
                    if (+res.status === 0) {
                        resolove(res.data.value);
                    } else {
                        resolove(0);
                    }
                },
                fail(err) {
                    resolove(0);
                }
            });
        } else {
            resolove(0);
        }
    });
};

export const getMobileNetVideoAutoplaySwitchType = () => {
    return new Promise((resolove, rejetc) => {
        if (boxx.canIUse('search.getMobileNetVideoAutoplaySwitchType')) {
            boxx.call('search.getMobileNetVideoAutoplaySwitchType', {
                success(res) {
                    if (+res.status === 0) {
                        resolove(res.data.value);
                    } else {
                        resolove(0);
                    }
                },
                fail(err) {
                    resolove(0);
                }
            });
        } else {
            resolove(0);
        }
    });
};

export const getBoxVideoAutoplay = async () => {
    const result = await Promise.all([getWifiVideoAutoplaySwitchType(), getMobileNetVideoAutoplaySwitchType()]);
    return {
        wifi: result[0],
        mobileNet: result[1]
    };
};