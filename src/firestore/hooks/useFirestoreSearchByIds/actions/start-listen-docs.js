import FirestoreListeners from '../../../firestore-listeners';
import { listenDoc } from '../services';
import changeDoc from './change-doc';
import removeDoc from './remove-doc';

export default function startListenDocs(docs, inCollection) {
    return dispatch => {
        docs.forEach(({ id: docId, type }) => {
            const path = `${inCollection}/${docId}`;
            if (type === 'added' && !FirestoreListeners.isListening({ at: path })) {
                const unsubscribe = listenDoc({
                    path,
                    onDocChange: doc => dispatch(changeDoc(doc, docId, path)),
                    // eslint-disable-next-line no-console
                    onError: error => console.log(error.message),
                });
                FirestoreListeners.register({
                    id: path,
                    unsubscribe,
                });
            }
            if (type === 'removed') {
                dispatch(removeDoc(docId, path));
            }
        });
    };
}
