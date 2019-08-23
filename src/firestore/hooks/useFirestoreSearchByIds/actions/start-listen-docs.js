import FirestoreListeners from '../../../firestore-listeners';
import { listenDoc } from '../services';
import changeDoc from './change-doc';
import updateDocMetadata from './update-doc-metadata';
import removeDoc from './remove-doc';

export default function startListenDocs(docs, inCollection) {
    return dispatch => {
        docs.forEach(({ type, id: docId, data: metadata }) => {
            const path = `${inCollection}/${docId}`;
            if (type === 'added' && !FirestoreListeners.isListening({ at: path })) {
                const unsubscribe = listenDoc({
                    path,
                    onDocChange: doc => dispatch(changeDoc({
                        doc,
                        docId,
                        path,
                        metadata,
                    })),
                    // eslint-disable-next-line no-console
                    onError: error => console.log(error.message),
                });
                return FirestoreListeners.register({
                    id: path,
                    unsubscribe,
                });
            }
            if (type === 'modified') {
                return dispatch(updateDocMetadata(docId, metadata));
            }
            if (type === 'removed') {
                return dispatch(removeDoc(docId, path));
            }
            return null;
        });
    };
}
