import FirebaseApp from '../../../firebase';
import batchSplit from './batch-split';

function batchAdd(collectionRef, data) {
    const batch = FirebaseApp.instance.firestore().batch();
    data.forEach(item => {
        const docRef = FirebaseApp
            .instance
            .firestore()
            .collection(collectionRef)
            .doc();

        batch.set(docRef, item);
    });
    return batch.commit();
}

export default function addDocuments(collectionRef, data) {
    return batchSplit(collectionRef, data, batchAdd);
}
