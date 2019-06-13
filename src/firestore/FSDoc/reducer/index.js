import {
    START_LOADING_DOC,
    LOAD_DOC,
    DOC_ERROR,
    LOAD_DOC_UNSUBSCRIBE_FUNCTION,
    RESET_DOC_STORE,
} from '../actions';

const initialState = {
    doc: undefined,
    isLoading: true,
    isListening: false,
};

function startLoading(state) {
    return {
        ...state,
        isLoading: true,
        isListening: true,
    };
}

function loadDoc(state, { doc }) {
    return {
        ...state,
        isLoading: false,
        doc,
    };
}

function loadError(state, { error }) {
    return {
        ...state,
        isLoading: false,
        error,
    };
}

function loadDocUnsubscribe(state, { unsubscribe }) {
    return {
        ...state,
        unsubscribe,
    };
}

export default function docReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING_DOC:
            return startLoading(state, action);

        case LOAD_DOC:
            return loadDoc(state, action);

        case DOC_ERROR:
            return loadError(state, action);

        case LOAD_DOC_UNSUBSCRIBE_FUNCTION:
            return loadDocUnsubscribe(state, action);

        case RESET_DOC_STORE:
            return initialState;

        default:
            return state;
    }
}
