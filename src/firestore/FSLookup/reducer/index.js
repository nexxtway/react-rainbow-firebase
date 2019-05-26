import {
    START_LISTENING_LOOKUP_COLLECTION,
    LOAD_LOOKUP_COLLECTION_CHANGE,
    LOAD_LOOKUP_COLLECTION_ERROR,
} from '../actions';

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
        return {
            ...state,
            [id]: {
                ...state[id],
                options,
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

export default function lookupReducer(state = initialState, action) {
    switch (action.type) {
        case START_LISTENING_LOOKUP_COLLECTION:
            return startLoading(state, action);

        case LOAD_LOOKUP_COLLECTION_CHANGE:
            return loadCollectionChange(state, action);

        case LOAD_LOOKUP_COLLECTION_ERROR:
            return loadError(state, action);

        default:
            return state;
    }
}
