import FirebaseApp from '../../../firebase';
import batchSplit from './batch-split';

function batchDelete(collectionRef, docs) {
    const batch = FirebaseApp.instance.firestore().batch();
    docs.forEach(({ id }) => {
        const docRef = FirebaseApp
            .instance
            .firestore()
            .collection(collectionRef)
            .doc(id);

        batch.delete(docRef);
    });
    return batch.commit();
}

export default function removeDocuments(collectionRef, docs) {
    return batchSplit(collectionRef, docs, batchDelete);
}
