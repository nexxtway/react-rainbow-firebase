/* eslint-disable no-console */
import resolveCollection from '../services/resolve-collection';
import { isFirstTime } from '../reducer/getters';

export const START_LOADING_COLLECTION = 'START_LOADING_COLLECTION';
export const LOAD_COLLECTION = 'LOAD_COLLECTION';
export const ERROR_COLLECTION = 'ERROR_COLLECTION';

export default function fetchCollection(opts) {
    const { path: id } = opts;
    return (dispatch, getState) => {
        if (isFirstTime(getState(), id)) {
            dispatch({
                type: START_LOADING_COLLECTION,
                id,
            });
            return resolveCollection(opts)
                .then(data => {
                    dispatch({
                        type: LOAD_COLLECTION,
                        id,
                        data,
                    });
                }).catch(error => {
                    console.log(error.message);
                    dispatch({
                        type: ERROR_COLLECTION,
                        id,
                        error,
                    });
                });
        }
        return null;
    };
}
