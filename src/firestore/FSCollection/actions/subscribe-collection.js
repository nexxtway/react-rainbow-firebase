/* eslint-disable no-console */
import listenCollection from '../services/listen-collection';

export const START_LOADING_COLLECTION = 'START_LOADING_COLLECTION';
export const LOAD_COLLECTION_CHANGE = 'LOAD_COLLECTION_CHANGE';
export const COLLECTION_ERROR = 'COLLECTION_ERROR';
export const LOAD_UNSUBSCRIBE_FUNCTION = 'LOAD_UNSUBSCRIBE_FUNCTION';

export default function subscribeCollection(opts, id) {
    return dispatch => {
        dispatch({
            type: START_LOADING_COLLECTION,
            id,
        });
        const unsubscribe = listenCollection(opts, data => {
            dispatch({
                type: LOAD_COLLECTION_CHANGE,
                id,
                data,
            });
        }, error => {
            console.log(error.message);
            dispatch({
                type: COLLECTION_ERROR,
                id,
                error,
            });
        });
        dispatch({
            type: LOAD_UNSUBSCRIBE_FUNCTION,
            id,
            unsubscribe,
        });
    };
}
