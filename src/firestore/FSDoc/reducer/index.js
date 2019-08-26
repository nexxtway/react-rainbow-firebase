import {
    LOAD_DOC,
    LOAD_DOC_ERROR,
    RESET_DOC_STORE,
} from '../actions';

const initialState = {
    doc: null,
    isLoading: true,
};

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

export default function docReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_DOC:
            return loadDoc(state, action);

        case LOAD_DOC_ERROR:
            return loadError(state, action);

        case RESET_DOC_STORE:
            return initialState;

        default:
            return state;
    }
}
