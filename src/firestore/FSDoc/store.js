/* eslint-disable import/prefer-default-export */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import cache from './cache';

export function create(id, once) {
    if (once) {
        return createStore(reducer, applyMiddleware(thunk));
    }
    return cache.getStore(id) || cache.createStore(id);
}
