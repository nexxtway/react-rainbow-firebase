import {
    COLLECTION_DATA_CHANGED,
    COLLECTION_LOAD_ERROR,
    RESET_COLLECTION,
} from '../actions';

const initialState = {
    data: [],
    isLoading: true,
};

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

export default function collectionReducer(state = initialState, action) {
    switch (action.type) {
        case COLLECTION_DATA_CHANGED:
            return loadCollectionChange(state, action);

        case COLLECTION_LOAD_ERROR:
            return collectionError(state, action);

        case RESET_COLLECTION:
            return initialState;

        default:
            return state;
    }
}
