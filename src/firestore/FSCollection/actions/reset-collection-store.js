export const RESET_COLLECTION_STORE = 'RESET_COLLECTION_STORE';
export default function resetCollectionStore(id) {
    return {
        type: RESET_COLLECTION_STORE,
        id,
    };
}
