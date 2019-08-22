import FirestoreListeners from '../../../firestore-listeners';

export const REMOVE_DOC = 'REMOVE_DOC';
export default function removeDoc(docId, path) {
    return dispatch => {
        dispatch({
            type: REMOVE_DOC,
            docId,
        });
        FirestoreListeners.unsubscribe({ from: path });
    };
}
