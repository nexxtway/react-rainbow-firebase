import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

class Cache {
    constructor() {
        this.stores = {};
    }

    createStore(id) {
        const store = createStore(reducer, applyMiddleware(thunk));
        this.stores[id] = store;
        return store;
    }

    getStore(id) {
        return this.stores[id];
    }
}

export default new Cache();
