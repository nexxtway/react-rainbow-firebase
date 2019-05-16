import {
    REGISTER_COLLECTION,
    START_LOADING_COLLECTION,
    LOAD_COLLECTION,
    ERROR_COLLECTION,
} from '../actions';

const initialState = {};

function registerCollection(state, { id }) {
    const collection = state[id];
    if (collection) {
        return state;
    }
    return {
        ...state,
        [id]: {
            isFirstTime: true,
            data: [],
            isLoading: false,
        },
    };
}

function startLoading(state, { id }) {
    return {
        ...state,
        [id]: {
            ...state[id],
            isLoading: true,
        },
    };
}

function loadCollection(state, { id, data }) {
    return {
        ...state,
        [id]: {
            ...state[id],
            isFirstTime: false,
            isLoading: false,
            data,
        },
    };
}

function errorCollection(state, { id, error }) {
    return {
        ...state,
        [id]: {
            ...state[id],
            isLoading: false,
            error,
        },
    };
}

export default function collectionReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_COLLECTION:
            return registerCollection(state, action);

        case START_LOADING_COLLECTION:
            return startLoading(state, action);

        case LOAD_COLLECTION:
            return loadCollection(state, action);

        case ERROR_COLLECTION:
            return errorCollection(state, action);

        default:
            return state;
    }
}
