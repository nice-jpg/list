/**
 * @file store 文件
 */

 import {store} from '@/lib/Store';
 import allActions from '../actions';
 import processInitData from './processInitData';

 const getQueries = () => {
    const url = location.search;
    let result = {};

     if (url.indexOf('?') >= 0) {
        let str = url.substr(1);
        let queries = str.split('&');

        queries.forEach(query => {
            let name = query.split('=')[0];
            let value = unescape(query.split('=')[1]);
            result[name] = value;
        });
     }

     return result;
 };


 export const initStore = data => {
    const finalData = processInitData(data, getQueries());
    store.initData(finalData).addActions(allActions);

    return store;
 };
