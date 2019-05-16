import fetchCollection from './fetch-collection';

export const REGISTER_COLLECTION = 'REGISTER_COLLECTION';

export default function registerCollection(opts) {
    const { path: id } = opts;
    return dispatch => {
        dispatch({
            type: REGISTER_COLLECTION,
            id,
        });
        dispatch(fetchCollection(opts));
    };
}
