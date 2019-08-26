/* eslint-disable no-console */
import FirestoreListeners from '../../firestore-listeners';
import listenCollection from '../services/listen-collection';

export const COLLECTION_DATA_CHANGED = 'COLLECTION_DATA_CHANGED';
export const COLLECTION_LOAD_ERROR = 'COLLECTION_LOAD_ERROR';

export default function subscribeCollection(params) {
    return dispatch => {
        const { id, queryProps, onError } = params;
        if (!FirestoreListeners.isListening({ at: id })) {
            const unsubscribe = listenCollection(queryProps, data => {
                dispatch({
                    type: COLLECTION_DATA_CHANGED,
                    data,
                });
            }, error => {
                console.log(error.message);
                onError(error);
                dispatch({
                    type: COLLECTION_LOAD_ERROR,
                    error,
                });
            });
            FirestoreListeners.register({
                id,
                unsubscribe,
            });
        }
    };
}
