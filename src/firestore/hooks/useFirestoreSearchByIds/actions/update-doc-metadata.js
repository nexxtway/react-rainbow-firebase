export const UPDATE_DOC_METADATA = 'UPDATE_DOC_METADATA';
export default function updateDocMetadata(docId, metadata) {
    return {
        type: UPDATE_DOC_METADATA,
        docId,
        metadata,
    };
}
