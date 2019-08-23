import {
    LOAD_DATA,
    CHANGE_DOC,
    UPDATE_DOC_METADATA,
    REMOVE_DOC,
    RESET_STORE,
} from '../actions';

const initialState = {
    data: [],
    isLoading: true,
};

function loadData(state, { data }) {
    return {
        isLoading: false,
        data,
    };
}

function getNewData(data, doc, docId) {
    const index = data.findIndex(item => item.id === docId);
    if (index > -1) {
        const newData = [...data];
        newData[index] = doc;
        return newData;
    }
    return data.concat(doc);
}

function changeDoc(state, { doc, docId }) {
    return {
        isLoading: false,
        data: getNewData(state.data, doc, docId),
    };
}

function updateDocMetadata(state, { docId, metadata }) {
    const { data } = state;
    const index = data.findIndex(item => item.id === docId);
    if (index > -1) {
        const newData = [...data];
        newData[index] = {
            ...data[index],
            metadata,
        };
        return {
            ...state,
            data: newData,
        };
    }
    return state;
}

function removeDoc(state, { docId }) {
    return {
        ...state,
        data: state.data.filter(doc => doc && doc.id !== docId),
    };
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return loadData(state, action);

        case CHANGE_DOC:
            return changeDoc(state, action);

        case UPDATE_DOC_METADATA:
            return updateDocMetadata(state, action);

        case REMOVE_DOC:
            return removeDoc(state, action);

        case RESET_STORE:
            return initialState;

        default:
            return state;
    }
}
