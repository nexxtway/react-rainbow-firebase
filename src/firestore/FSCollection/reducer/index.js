import {
    START_LOADING_COLLECTION,
    LOAD_COLLECTION_CHANGE,
    COLLECTION_ERROR,
    LOAD_UNSUBSCRIBE_FUNCTION,
    RESET_COLLECTION_STORE,
} from '../actions';

const initialState = {};

function startLoading(state, { id }) {
    return {
        ...state,
        [id]: {
            ...state[id],
            isLoading: true,
        },
    };
}

function loadCollectionChange(state, { id, data }) {
    return {
        ...state,
        [id]: {
            ...state[id],
            isLoading: false,
            data,
        },
    };
}

function collectionError(state, { id, error }) {
    return {
        ...state,
        [id]: {
            ...state[id],
            isLoading: false,
            error,
        },
    };
}

function loadUnsubscribeFunction(state, { id, unsubscribe }) {
    return {
        ...state,
        [id]: {
            ...state[id],
            unsubscribe,
        },
    };
}

function resetCollectionStore(state, { id }) {
    return {
        ...state,
        [id]: undefined,
    };
}

export default function collectionReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING_COLLECTION:
            return startLoading(state, action);

        case LOAD_COLLECTION_CHANGE:
            return loadCollectionChange(state, action);

        case COLLECTION_ERROR:
            return collectionError(state, action);

        case LOAD_UNSUBSCRIBE_FUNCTION:
            return loadUnsubscribeFunction(state, action);

        case RESET_COLLECTION_STORE:
            return resetCollectionStore(state, action);

        default:
            return state;
    }
}
