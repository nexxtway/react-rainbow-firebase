import FirestoreListeners from '../../firestore-listeners';
import resetCollectionStore from './reset-collection-store';
import subscribeCollection from './subscribe-collection';

export default function reset(params) {
    return dispatch => {
        const { id } = params;
        FirestoreListeners.unsubscribe({ from: id });
        dispatch(resetCollectionStore());
        return dispatch(subscribeCollection(params));
    };
}
