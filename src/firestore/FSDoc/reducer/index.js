import {
    START_LOADING_DOC,
    LOAD_DOC,
    DOC_ERROR,
    RESET_DOC_STORE,
} from '../actions';

const initialState = {};

function startLoading(state, { id }) {
    return {
        ...state,
        [id]: {
            ...state[id],
            isLoading: true,
            isListening: true,
        },
    };
}

function loadData(state, { id, doc }) {
    return {
        ...state,
        [id]: {
            ...state[id],
            isLoading: false,
            doc,
        },
    };
}

function loadError(state, { id, error }) {
    return {
        ...state,
        [id]: {
            ...state[id],
            isLoading: false,
            error,
        },
    };
}

function resetDocStore(state, { id }) {
    return {
        ...state,
        [id]: undefined,
    };
}

export default function docReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING_DOC:
            return startLoading(state, action);

        case LOAD_DOC:
            return loadData(state, action);

        case DOC_ERROR:
            return loadError(state, action);

        case RESET_DOC_STORE:
            return resetDocStore(state, action);

        default:
            return state;
    }
}
