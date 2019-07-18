/* eslint-disable no-console */
import { listenDoc, fetchDoc } from '../services';
import { isListening } from '../reducer/getters';

export const START_LOADING_DOC = 'START_LOADING_DOC';
export const LOAD_DOC = 'LOAD_DOC';
export const DOC_ERROR = 'DOC_ERROR';
export const LOAD_DOC_UNSUBSCRIBE_FUNCTION = 'LOAD_DOC_UNSUBSCRIBE_FUNCTION';

function getDocOnce(docRef, onError) {
    return dispatch => {
        dispatch({
            type: START_LOADING_DOC,
        });
        return fetchDoc(docRef)
            .then(doc => dispatch({
                type: LOAD_DOC,
                doc,
            }))
            .catch(error => {
                onError(error);
                console.log(error.message);
                dispatch({
                    type: DOC_ERROR,
                    error,
                });
            });
    };
}

function startListenDoc(docRef, onError) {
    return (dispatch, getState) => {
        if (!isListening(getState())) {
            dispatch({
                type: START_LOADING_DOC,
            });
            const unsubscribe = listenDoc(docRef, doc => {
                dispatch({
                    type: LOAD_DOC,
                    doc,
                });
            }, error => {
                onError(error);
                console.log(error.message);
                dispatch({
                    type: DOC_ERROR,
                    error,
                });
            });
            dispatch({
                type: LOAD_DOC_UNSUBSCRIBE_FUNCTION,
                unsubscribe,
            });
        }
    };
}

export function subscribeDoc(docRef, once, onError) {
    return dispatch => {
        if (once) {
            return dispatch(getDocOnce(docRef, onError));
        }
        return dispatch(startListenDoc(docRef, onError));
    };
}

export const RESET_DOC_STORE = 'RESET_DOC_STORE';
export function resetDocStore() {
    return {
        type: RESET_DOC_STORE,
    };
}
