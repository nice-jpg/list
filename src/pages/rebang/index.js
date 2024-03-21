/**
 * @file index
 */

import app from '@/lib/App';
import AppComponent from './containers/app.js';
import {initStore} from './store';
import {connect} from '@/lib/Store';
import {keyZipObject} from '@/lib/utils';
// import SSRContentComponent from './containers/ssr/index';

const initPage = (sortsData) => {

    const store = initStore(sortsData);

    const keyMap = keyZipObject(Object.keys(store.raw));

    connect.san(keyMap)(AppComponent);

    const ssrEl = document.getElementById('ssr-content');

    const clearSsrEl = () => {
        if (ssrEl) {
            ssrEl.parentElement && ssrEl.parentElement.removeChild(ssrEl);
        }
    };
    const render = () => {
        app(AppComponent, '#app', {data: sortsData, append: false});
    };
    const degradeRender = () => {
        clearSsrEl();
        render();
    };
    degradeRender();
};
initPage(window.sortsData);