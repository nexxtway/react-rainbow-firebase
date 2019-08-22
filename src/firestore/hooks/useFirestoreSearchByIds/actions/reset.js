import resetStore from './reset-store';
import FirestoreListeners from '../../../firestore-listeners';

export default function reset(idsCollection, inCollection) {
    return (dispatch, getState) => {
        FirestoreListeners.unsubscribe({ from: idsCollection });
        const { data } = getState();
        if (Array.isArray(data)) {
            data.forEach(({ id }) => {
                FirestoreListeners.unsubscribe({ from: `${inCollection}/${id}` });
            });
        }
        return dispatch(resetStore());
    };
}
