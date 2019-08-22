import removeDoc from './remove-doc';

export const CHANGE_DOC = 'CHANGE_DOC';
export default function changeDoc(doc, docId, path) {
    return dispatch => {
        if (doc && doc.data) {
            dispatch({
                type: CHANGE_DOC,
                doc,
                docId,
            });
        } else {
            dispatch(removeDoc(docId, path));
        }
    };
}
