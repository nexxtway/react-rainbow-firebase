import {
    START_LISTENING_LOOKUP_COLLECTION,
    LOAD_LOOKUP_COLLECTION_CHANGE,
    LOAD_LOOKUP_COLLECTION_ERROR,
    LOAD_LOOKUP_COLLECTION_VALUE,
} from '../actions';
import { findById } from '../helpers';

const initialState = {};

function startLoading(state, { id }) {
    return {
        ...state,
        [id]: {
            options: [],
            isListening: true,
        },
    };
}

function loadCollectionChange(state, { id, options }) {
    if (options) {
        const { value } = state[id];
        return {
            ...state,
            [id]: {
                ...state[id],
                options,
                value: value ? findById(options, value.id) : null,
            },
        };
    }
    return state;
}

function loadError(state, { id, error }) {
    return {
        ...state,
        [id]: {
            ...state[id],
            error,
        },
    };
}

function loadValue(state, { id, value }) {
    return {
        ...state,
        [id]: {
            ...state[id],
            value,
        },
    };
}

export default function lookupReducer(state = initialState, action) {
    switch (action.type) {
        case START_LISTENING_LOOKUP_COLLECTION:
            return startLoading(state, action);

        case LOAD_LOOKUP_COLLECTION_CHANGE:
            return loadCollectionChange(state, action);

        case LOAD_LOOKUP_COLLECTION_ERROR:
            return loadError(state, action);

        case LOAD_LOOKUP_COLLECTION_VALUE:
            return loadValue(state, action);

        default:
            return state;
    }
}
