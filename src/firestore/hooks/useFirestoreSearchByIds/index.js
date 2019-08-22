/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from 'react';
import { isObject, getDataType } from '../../../helpers';
import { subscribeCollection, reset } from './actions';
import { create } from './store';

export default function useFirestoreSearchByIds(params) {
    if (isObject(params)) {
        const {
            inCollection = '',
            idsCollection = '',
            once = false,
        } = params;

        const store = useRef();
        if (!store.current) {
            store.current = create(idsCollection, once);
        }

        const [state, setState] = useState(() => store.current.getState());

        useEffect(() => {
            const unsubscribeFromStore = store.current.subscribe(() => {
                setState(store.current.getState());
            });
            return () => {
                unsubscribeFromStore();
            };
        }, []);

        const isFirstRender = useRef(true);
        useEffect(() => {
            const opts = {
                inCollection,
                idsCollection,
                once,
            };
            if (!isFirstRender.current) {
                store.current.dispatch(reset(idsCollection, inCollection));
            }
            store.current.dispatch(subscribeCollection(opts));
            isFirstRender.current = false;
        }, [inCollection, idsCollection, once]);

        const { isLoading, data } = state;
        return {
            isLoading,
            data,
        };
    }
    // eslint-disable-next-line no-console
    console.error(`The argument passed to useFirestoreSearchByIds must be of type object, but got ${getDataType(params)}`);
    return {};
}
