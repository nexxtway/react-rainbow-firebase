import { fetchIdsCollection, fetchDocs } from '../services';

export const LOAD_DATA = 'LOAD_DATA';
export default function getIdsCollectionOnce(idsCollection, inCollection) {
    return dispatch => fetchIdsCollection(idsCollection)
        .then(ids => fetchDocs(ids, inCollection))
        .then(data => dispatch({
            type: LOAD_DATA,
            data,
        }));
}
