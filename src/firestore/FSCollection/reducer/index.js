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

function addDoc(state, key, payload) {
    const currentData = state[key].data;
    let data;
    if (currentData) {
        data = currentData.concat(payload);
    } else {
        data = [payload];
    }
    return {
        ...state,
        [key]: {
            ...state[key],
            data,
        },
    };
}

function updateDoc(state, key, payload) {
    const currentData = [...state[key].data];
    const docIndex = currentData.findIndex(doc => doc.id === payload.id);

    if (docIndex > -1) {
        currentData[docIndex] = payload;
        return {
            ...state,
            [key]: {
                ...state[key],
                data: currentData,
            },
        };
    }
    return state;
}

function removeDoc(state, key, payload) {
    const data = state[key].data.filter(doc => doc.id !== payload.id);
    return {
        ...state,
        [key]: {
            ...state[key],
            data,
        },
    };
}

function loadCollectionChange(state, { id: key, payload }) {
    const newState = {
        ...state,
        [key]: {
            ...state[key],
            isLoading: false,
        },
    };
    if (payload === null) {
        return newState;
    }

    const { type, data, id } = payload;
    if (type === 'added') {
        return addDoc(newState, key, { data, id });
    }
    if (type === 'modified') {
        return updateDoc(newState, key, { data, id });
    }
    if (type === 'removed') {
        return removeDoc(newState, key, { data, id });
    }
    return newState;
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
