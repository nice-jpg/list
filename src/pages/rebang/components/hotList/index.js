import {Component} from 'san';
import {env} from '@baidu/auc-base/env';
import {WujiImage, WujiWidget, WujiIcon} from '@baidu/wuji-san';
import {jump} from '../../utils';
import {startFontSize} from '../../../../lib/utils/fontSize';
import invock from '@baidu/xbox/na/invoke';
import {invokeApp} from '@baidu/ug-invoke-app';
import {pageLog} from '@baidu/auc-log';
import timeSpot from '../time-spot';
import styles from '../../containers/app.module.less';

const url = encodeURIComponent(window.location.href);



export default class titleImage extends Component {
    static template = `
        <div class="{{styles.lists}}" id="lists">
            <div s-for="item,index in hotList"
                class="{{styles.content}}" 
                on-click="contentClick(item, index)"
            >
                <div class="{{styles.left}}">
                    <div class="{{styles.num}}">
                        <span>{{index +1}}</span>
                    </div>
                    <div class="{{styles.letfTitle}}">
                        <div class="{{styles.title}} title">
                            <span s-if="{{item.title_prefix}}" class="{{styles.leftLabel}}">
                                <span class="{{styles.label}} {{filterIconClass(item.title_prefix)}}">
                                    <span s-if="{{item.title_prefix === 'live'}}" class="{{styles.icon}}">
                                        <span class="{{styles.move}} {{styles.move1}}"></span>
                                        <span class="{{styles.move}} {{styles.move2}}"></span>
                                        <span class="{{styles.move}} {{styles.move3}}"></span>
                                    </span>
                                    <wuji-icon
                                        class="{{styles.wujiIcon}}"
                                        s-if="{{item.title_prefix === 'preload' || 
                                        item.title_prefix === 'playback'}}"
                                        type="{{item.title_prefix === 'preload' ?
                                        'live-newtrailer-f-30' : 'live-newreview-f-30'}}"
                                    ></wuji-icon>
                                    {{filterTitleLeft(item.title_prefix)}}
                                </span>
                            </span>
                            <label
                                s-if="{{item.show_tag && item.isHeight}}"
                                class="{{styles.btn}} {{styles.rightLabel}}
                                    {{filterTitleRight(item.show_tag)}} {{flag ? styles.abcdef : ''}}"
                            >
                                {{item.show_tag}}
                            </label>
                            <label
                                s-else-if="{{!item.show_tag && item.isHeight}}"
                                class="{{styles.btn}} {{styles.rightLabel}} {{filterTitleRight(item.show_tag)}}
                                    {{flag ? styles.abcdef : ''}}"
                                style="background: none;"
                            ></label>
                            <span class="rightLabel {{styles.text}}">
                                {{item.title}}
                                <span
                                    s-if="{{item.show_tag}}"
                                    class="{{styles.rightLabel}} {{filterTitleRight(item.show_tag)}}"
                                >   
                                    {{item.show_tag}}
                                </span>
                            </span>
                                
                        </div>
                        <wuji-widget
                            items="{{item.items}}"
                        ></wuji-widget>
                    </div>
                </div>
                <div s-if="{{item.image}}" class="{{styles.right}}">
                    <wuji-image
                        class="{{styles.image}}"
                        ratio="{{item.ratioList}}"
                        src="{{item.image}}"
                        label-icon="d20-capsule-video-f-30"
                        label-text="{{item.duration}}"
                    ></wuji-image>
                </div>
                <div class="{{styles.line}}"></div>
                <time-spot
                    item="{{item}}"
                    index="{{index}}"
                ></time-spot>
            </div>
        </div>
    `
    static components = {
        'wuji-image': WujiImage,
        'wuji-widget': WujiWidget,
        'wuji-icon': WujiIcon,
        'time-spot': timeSpot
    }

    initData() {
        return {
            styles,
            hotList: [],
            flag: false
        };
    }

    inited() {
        env.isBoxSeries && env.isIOS && startFontSize();
    }

    attached() {
        let contentItem = document.getElementById('lists');
        contentItem.addEventListener('touchstart', function () {});
        if (env.isAndroid) {
            this.data.set('flag', true);
        } else {
            this.data.set('flag', false);
        }
    }

    clickInvoke(channel_cmd) {
        if (channel_cmd) {
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
        invokeApp({
            appName: 'baiduboxapp',
            scheme: `baiduboxapp://v1/easybrowse/open?url=${url}&barcolor=00000000&layoutfullscreen=1&toolbaricons=%7B%22toolids%22%3A%5B%222%22%2C%223%22%5D%2C%22tids%22%3A%5B%222%22%2C%223%22%5D%7D`
        });
    }

    contentClick(item, index) {
        pageLog('comp_clk', {
            nid: item.id,
            index: index + 1,
            resource_type: item && item.id ? item.id.split('_')[0] : ''
        });
        jump(item);
    }


    // title前缀文字
    filterTitleLeft(titlePrefix) {
        let titleLeft = '';
        switch (titlePrefix) {
            case 'playback':
                titleLeft = '直播回放';
            break;
            case 'live':
                titleLeft = '直播中';
            break;
            case 'preload':
                titleLeft = '直播预告';
            break;
            case 'subject':
                titleLeft = '专题';
            break;
            case 'topic':
                titleLeft = '话题';
            break;
            default:
                titleLeft = '';
        }
        return titleLeft;
    }

    // title前缀颜色
    filterIconClass(titlePrefix) {
        let iconClass = '';
        switch (titlePrefix) {
            case 'playback':
                iconClass = styles.playback;
            break;
            case 'live':
                iconClass = styles.subject;
            break;
            case 'preload':
                iconClass = styles.preload;
            break;
            case 'subject':
                iconClass = styles.subject;
            break;
            case 'topic':
                iconClass = styles.subject;
            break;
            default:
                iconClass = '';
        }
        return iconClass;
    }

    // title后缀颜色
    filterTitleRight(showTag) {
        let showTagClass = '';
        switch (showTag) {
            case '爆':
                showTagClass = styles.bao;
            break;
            case '热':
                showTagClass = styles.re;
            break;
            case '新':
                showTagClass = styles.xin;
            break;
            case '沸':
                showTagClass = styles.fei;
            break;
            case '商':
                showTagClass = styles.shang;
            break;
            case '荐':
                showTagClass = styles.jian;
            break;
            default:
                showTagClass = '';
        }
        return showTagClass;
    }
}