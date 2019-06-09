/* eslint-disable no-console */
import listenCollection from '../services/listen-collection';

export const START_LOADING = 'START_LOADING';
export const COLLECTION_DATA_CHANGED = 'COLLECTION_DATA_CHANGED';
export const COLLECTION_LOAD_ERROR = 'COLLECTION_LOAD_ERROR';
export const COLLECTION_UNSUBSCRIBE_FUNCTION = 'COLLECTION_UNSUBSCRIBE_FUNCTION';

export default function subscribeCollection(opts) {
    return dispatch => {
        dispatch({
            type: START_LOADING,
        });
        const unsubscribe = listenCollection(opts, data => {
            dispatch({
                type: COLLECTION_DATA_CHANGED,
                data,
            });
        }, error => {
            console.log(error.message);
            dispatch({
                type: COLLECTION_LOAD_ERROR,
                error,
            });
        });
        dispatch({
            type: COLLECTION_UNSUBSCRIBE_FUNCTION,
            unsubscribe,
        });
    };
}
