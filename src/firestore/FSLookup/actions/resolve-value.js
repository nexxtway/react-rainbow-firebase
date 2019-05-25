import fetchValue from '../services/fetch-value';
import { getOptions } from '../reducer/getters';

export const LOAD_LOOKUP_COLLECTION_VALUE = 'LOAD_LOOKUP_COLLECTION_VALUE';

export default function resolveValue(id, value) {
    return (dispatch, getState) => {
        const options = getOptions(getState(), id);
        return fetchValue(options, value)
            .then(fetchedValue => dispatch({
                type: LOAD_LOOKUP_COLLECTION_VALUE,
                id,
                value: fetchedValue,
            }));
    };
}
