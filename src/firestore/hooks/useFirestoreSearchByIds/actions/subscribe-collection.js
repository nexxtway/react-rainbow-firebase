import getIdsCollectionOnce from './get-ids-collection-once';
import startListenIdsCollection from './start-listen-ids-collection';

export default function subscribeCollection(params) {
    return dispatch => {
        const {
            inCollection,
            idsCollection,
            once,
        } = params;
        if (once) {
            return dispatch(getIdsCollectionOnce(idsCollection, inCollection));
        }
        return dispatch(startListenIdsCollection(idsCollection, inCollection));
    };
}
