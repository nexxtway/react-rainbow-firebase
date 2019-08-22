import FirestoreListeners from '../../../firestore-listeners';
import { listenIdsCollection } from '../services';
import startListenDocs from './start-listen-docs';

export default function startListenIdsCollection(idsCollection, inCollection) {
    return dispatch => {
        if (!FirestoreListeners.isListening({ at: idsCollection })) {
            const unsubscribe = listenIdsCollection(
                idsCollection,
                docs => dispatch(startListenDocs(docs, inCollection)),
                // eslint-disable-next-line no-console
                error => console.log(error.message),
            );
            FirestoreListeners.register({
                id: idsCollection,
                unsubscribe,
            });
        }
    };
}
