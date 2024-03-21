/**
 * @file 将 storeDispatch 放到 Component 原型上；
 */
import {store} from '@/lib/Store';
import {Component} from 'san';

// Component 上的 dispatch 指示为 store 的 dispatch；
Component.prototype.storeDispatch = store.dispatch.bind(store);
// 删除空白节点，听说能提升性能
Component.prototype.trimWhitespace = 'all';
