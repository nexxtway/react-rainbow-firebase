/* eslint-disable no-console */
import FirestoreListeners from '../../firestore-listeners';
import { listenDoc, fetchDoc } from '../services';

export const LOAD_DOC = 'LOAD_DOC';
export const LOAD_DOC_ERROR = 'LOAD_DOC_ERROR';

function getDocOnce(docRef, onError) {
    return dispatch => fetchDoc(docRef)
        .then(doc => dispatch({
            type: LOAD_DOC,
            doc,
        }))
        .catch(error => {
            onError(error);
            console.log(error.message);
            dispatch({
                type: LOAD_DOC_ERROR,
                error,
            });
        });
}

function startListenDoc(docRef, onError) {
    return dispatch => {
        const { path } = docRef;
        if (!FirestoreListeners.isListening({ at: path })) {
            const unsubscribe = listenDoc(docRef, doc => {
                dispatch({
                    type: LOAD_DOC,
                    doc,
                });
            }, error => {
                onError(error);
                console.log(error.message);
                dispatch({
                    type: LOAD_DOC_ERROR,
                    error,
                });
            });
            FirestoreListeners.register({
                id: path,
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
