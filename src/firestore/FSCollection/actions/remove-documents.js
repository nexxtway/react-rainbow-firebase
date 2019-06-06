import FirebaseApp from '../../../firebase';

export default function removeDocuments(collectionRef, docs) {
    const batch = FirebaseApp.instance.firestore().batch();

    let start = 0;
    let end = 500;

    let dataChunk = docs.slice(start, end);

    while (dataChunk.length) {
        dataChunk.forEach(({ id }) => {
            const docRef = FirebaseApp
                .instance
                .firestore()
                .collection(collectionRef)
                .doc(id);

            batch.delete(docRef);
        });
        batch.commit();
        start = end;
        end += 500;
        dataChunk = docs.slice(start, end);
    }
}
