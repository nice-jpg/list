import boxx from '@baidu/auc-base/boxx';
import {boxxOn} from './index';

const changeFontSize = (fontData = {}) => {
    const fontSize = fontData.data && fontData.data.fontsize || 'font-size-1';
    const $root = document.body.parentElement;
    const newClassName = $root.className.replace(/font-size-[0-3]{1}/g, '');
    $root.className = newClassName;
    $root.classList.add(fontSize);
};
export const startFontSize = () => {
    boxx.call('device.getGlobalSettings', {
        success(data) {
            changeFontSize(data);
        }
    });
    setTimeout(() => {
        boxxOn({
            page: 'topic',
            action: 'globalSettingChange',
            jscallback(action, data) {
                if (data === undefined) {
                    return;
                }
                if (typeof data === 'string') {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (_) {}
                }
                changeFontSize(data);
            }
        });
    }, 0);
};