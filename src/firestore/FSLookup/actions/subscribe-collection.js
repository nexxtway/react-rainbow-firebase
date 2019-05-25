/* eslint-disable no-console */
import listenCollection from '../services/listen-collection';
import { isListening } from '../reducer/getters';

export const START_LISTENING_LOOKUP_COLLECTION = 'START_LISTENING_LOOKUP_COLLECTION';
export const LOAD_LOOKUP_COLLECTION_CHANGE = 'LOAD_LOOKUP_COLLECTION_CHANGE';
export const LOAD_LOOKUP_COLLECTION_ERROR = 'LOAD_LOOKUP_COLLECTION_ERROR';

export default function subscribeCollection(id) {
    return (dispatch, getState) => {
        if (!isListening(getState(), id)) {
            dispatch({
                type: START_LISTENING_LOOKUP_COLLECTION,
                id,
            });
            listenCollection(id, options => {
                dispatch({
                    type: LOAD_LOOKUP_COLLECTION_CHANGE,
                    id,
                    options,
                });
            }, error => {
                console.log(error.message);
                dispatch({
                    type: LOAD_LOOKUP_COLLECTION_ERROR,
                    id,
                    error,
                });
            });
        }
    };
}
