import {
    START_LOADING,
    COLLECTION_DATA_CHANGED,
    COLLECTION_LOAD_ERROR,
    COLLECTION_UNSUBSCRIBE_FUNCTION,
    RESET_COLLECTION,
} from '../actions';

const initialState = {
    data: [],
    isLoading: false,
    isListening: false,
};

function startLoading(state) {
    return {
        ...state,
        isLoading: true,
        isListening: true,
    };
}

function loadCollectionChange(state, { data }) {
    return {
        ...state,
        isLoading: false,
        data,
    };
}

function collectionError(state, { error }) {
    return {
        ...state,
        isLoading: false,
        error,
    };
}

function loadUnsubscribeFunction(state, { unsubscribe }) {
    return {
        ...state,
        unsubscribe,
    };
}

export default function collectionReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return startLoading(state, action);

        case COLLECTION_DATA_CHANGED:
            return loadCollectionChange(state, action);

        case COLLECTION_LOAD_ERROR:
            return collectionError(state, action);

        case COLLECTION_UNSUBSCRIBE_FUNCTION:
            return loadUnsubscribeFunction(state, action);

        case RESET_COLLECTION:
            return initialState;

        default:
            return state;
    }
}
