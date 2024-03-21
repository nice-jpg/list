import AucComponent from '@baidu/auc-base/AucComponent';
import {pageLog} from '@baidu/auc-log';

export default class timeSpot extends AucComponent {
    static template = ``
    initData() {
        return {
            item: '',
            index: 0
        };
    }
    attached() {
        this.registerScrollInView().then(() => {
            let item = this.data.get('item');
            let index = this.data.get('index');
            pageLog('comp_show', {
                nid: item.id,
                resource_type: item && item.id ? item.id.split('_')[0] : '',
                index: index + 1
            });
        })
    }
}