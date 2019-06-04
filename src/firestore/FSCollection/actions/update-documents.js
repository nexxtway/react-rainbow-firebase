import FirebaseApp from '../../../firebase';

export default function updateDocuments(collectionRef, payload) {
    const batch = FirebaseApp.instance.firestore().batch();

    let start = 0;
    let end = 500;

    let dataChunk = payload.slice(start, end);

    while (dataChunk.length) {
        dataChunk.forEach(({ id, data }) => {
            const docRef = FirebaseApp
                .instance
                .firestore()
                .collection(collectionRef)
                .doc(id);

            batch.set(docRef, data);
        });
        batch.commit();
        start = end;
        end += 500;
        dataChunk = payload.slice(start, end);
    }
}
