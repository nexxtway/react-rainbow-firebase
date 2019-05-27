import FirebaseApp from '../../../firebase';

export default function removeDocuments(collectionRef, ids) {
    const batch = FirebaseApp.instance.firestore().batch();

    let start = 0;
    let end = 500;

    let idsChunk = ids.slice(start, end);

    while (idsChunk.length) {
        idsChunk.forEach(({ id }) => {
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
        idsChunk = ids.slice(start, end);
    }
}
