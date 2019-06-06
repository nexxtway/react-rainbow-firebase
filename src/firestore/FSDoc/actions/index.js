/* eslint-disable no-console */
import listenDoc from '../services/listen-doc';
import fetchDoc from '../services/fetch-doc';
import { isListening } from '../reducer/getters';

export const START_LOADING_DOC = 'START_LOADING_DOC';
export const LOAD_DOC = 'LOAD_DOC';
export const DOC_ERROR = 'DOC_ERROR';

function getDocOnce(docRef, id) {
    return dispatch => {
        dispatch({
            type: START_LOADING_DOC,
            id,
        });
        return fetchDoc(docRef)
            .then(doc => dispatch({
                type: LOAD_DOC,
                id,
                doc,
            }))
            .catch(error => {
                console.log(error.message);
                dispatch({
                    type: DOC_ERROR,
                    id,
                    error,
                });
            });
    };
}

function startListenDoc(docRef, id) {
    return (dispatch, getState) => {
        if (!isListening(getState(), id)) {
            dispatch({
                type: START_LOADING_DOC,
                id,
            });
            listenDoc(docRef, doc => {
                dispatch({
                    type: LOAD_DOC,
                    id,
                    doc,
                });
            }, error => {
                console.log(error.message);
                dispatch({
                    type: DOC_ERROR,
                    id,
                    error,
                });
            });
        }
    };
}

export function subscribeDoc(docRef, once) {
    return dispatch => {
        const id = docRef.path;
        if (once) {
            return dispatch(getDocOnce(docRef, id));
        }
        return dispatch(startListenDoc(docRef, id));
    };
}

export const RESET_DOC_STORE = 'RESET_DOC_STORE';
export function resetDocStore(id) {
    return {
        type: RESET_DOC_STORE,
        id,
    };
}
