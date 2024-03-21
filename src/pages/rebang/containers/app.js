import {Component} from 'san';
import invokeDrag from '@baidu/wise-invoke-drag';
import {env} from '@baidu/auc-base/env';
import {init, pageLog, timingStart} from '@baidu/auc-log';
import {getQueryString} from '../../../lib/utils/getQueryString';
import {numberFormatter, jump} from '../utils';
import {setShareInfo} from '../../../lib/utils/setShareInfo';
import {startFontSize} from '../../../lib/utils/fontSize';
import invock from '@baidu/xbox/na/invoke';
import styles from './app.module.less';
import {invokeApp} from '@baidu/ug-invoke-app';
import HotList from '../components/hotList';
import '@baidu/wuji-icons';

const url = encodeURIComponent(window.location.href);

export default class App extends Component {
    static template = `
        <div class="{{styles.mainPage}}" id="mainPage">
            <hot-list
                hotList="{{hot_list}}"
            ></hot-list>
        </div>
    `
    static components = {
        'hot-list': HotList
    }

    initData() {
        return {
            styles,
            defaultImg: 'https://b.bdstatic.com/searchbox/icms/searchbox/img/baidu_slogan@2x.png',
            shareTitle: '',
            isBoxSeries: env.isBoxSeries,
        };
    }

    inited() {
        env.isBoxSeries && env.isIOS && startFontSize();
        this.handleData();
        this.initLog();
        if (!env.isBoxSeries) {
            new invokeDrag.DragSingle({
                title: '百度APP内阅读',
                backflow: () => {
                    // TODO: 点击回调
                    pageLog('disp');
                    invokeApp({
                        appName: 'baiduboxapp',
                        scheme: `baiduboxapp://v1/easybrowse/open?url=${url}&barcolor=00000000&layoutfullscreen=1&toolbaricons=%7B%22toolids%22%3A%5B%222%22%2C%223%22%5D%2C%22tids%22%3A%5B%222%22%2C%223%22%5D%7D`
                    });
                }
            });
        }
    }

    attached() {
        pageLog('disp');
        setShareInfo({
            title: this.data.get('title') + '-' + this.data.get('shareTitle'),
            description: '查看' + this.data.get('title') + '实时热点，就在百度APP',
            icon: this.data.get('shared_icon'),
            link: window.location.href
        });
        let title = document.getElementsByClassName('title');
        let rightLabel = document.getElementsByClassName('rightLabel');
        const titleHeight = title[0].clientHeight;
        for (let i = 0; i < rightLabel.length; i++) {
            if (rightLabel[i].offsetHeight > titleHeight) {
                this.data.set(`hot_list[${i}].isHeight`, 1);
            } else {
                this.data.set(`hot_list[${i}].isHeight`, 0);
            }
        }
    }

    initLog() {
        init([
            // 页面打点
            {
                event: 'page',
                ubcId: '5069',
                params: {
                    page: getQueryString('city_code'),
                    source: 'luodi',
                    from: 'bendi',
                    ext: {
                        city_code: getQueryString('city_code')
                    }
                }
            }
        ]);
        // 时长打点统计
        timingStart('5118', {
            page: getQueryString('city_code'),
            source: 'luodi',
            from: 'bendi',
            type: 'time',
            ext: {
                city_code: getQueryString('city_code')
            }
        });
    }

    handleData() {
       const sortsData = window.sortsData;
        this.filterList(sortsData.hot_list);
    }

    clickInvoke(channel_cmd) {
        if (channel_cmd) {
            pageLog('disp');
            if (!env.isBoxSeries) {
                invokeApp({
                    appName: 'baiduboxapp',
                    scheme: this.data.get('channel_cmd')
                });
            } else {
                invock(channel_cmd);
            }
        }
    }

    buttonClick() {
        // 点击回流端内
        pageLog('disp');
        invokeApp({
            appName: 'baiduboxapp',
            scheme: `baiduboxapp://v1/easybrowse/open?url=${url}&barcolor=00000000&layoutfullscreen=1&toolbaricons=%7B%22toolids%22%3A%5B%222%22%2C%223%22%5D%2C%22tids%22%3A%5B%222%22%2C%223%22%5D%7D`
        });
    }

    filterList(list) {
        this.data.set('shareTitle', list[0].title);
        list.map((item) => {
            let heat_value = numberFormatter(item.heat_value).str;
            item.items = [{
                text: item.source,
            }, {
                text: heat_value + '热度',
            }];
            return item;
        });
    }
}