import removeDoc from './remove-doc';

export const CHANGE_DOC = 'CHANGE_DOC';
export default function changeDoc(params) {
    return dispatch => {
        const {
            doc,
            docId,
            path,
            metadata,
        } = params;

        if (doc && doc.data) {
            dispatch({
                type: CHANGE_DOC,
                doc: {
                    ...doc,
                    metadata,
                },
                docId,
            });
        } else {
            dispatch(removeDoc(docId, path));
        }
    };
}
