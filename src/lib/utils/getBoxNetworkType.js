import boxx from '@baidu/auc-base/boxx';

export const getBoxNetworkType = () => {
    return new Promise((resolove, rejetc) => {
        if (!boxx.canIUse('device.getNetworkType')) {
            resolove('mobileNet');
            return;
        }
        boxx.call('device.getNetworkType', {
            success(res) {
                if (+res.status === 0) {
                    const networkType = res.data.networkType;
                    resolove(networkType);
                } else {
                    resolove('mobileNet');
                }
            },
            fail(err) {
                console.log(err);
                resolove('mobileNet');
            }
        });
    });
};