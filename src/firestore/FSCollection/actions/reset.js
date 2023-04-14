import FirestoreListeners from '../../firestore-listeners';
import resetCollectionStore from './reset-collection-store';
import subscribeCollection from './subscribe-collection';

export default function reset(params) {
    return dispatch => {
        const { prevId } = params;
        FirestoreListeners.unsubscribe({ from: prevId });
        dispatch(resetCollectionStore());
        return dispatch(subscribeCollection(params));
    };
}
