import FirebaseApp from '../../../firebase';
import batchSplit from './batch-split';

function batchUpdate(collectionRef, docs) {
    const batch = FirebaseApp.instance.firestore().batch();
    docs.forEach(({ id, data }) => {
        const docRef = FirebaseApp
            .instance
            .firestore()
            .collection(collectionRef)
            .doc(id);

        batch.set(docRef, data);
    });
    return batch.commit();
}

export default function updateDocuments(collectionRef, docs) {
    return batchSplit(collectionRef, docs, batchUpdate);
}
