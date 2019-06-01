import FirebaseApp from '../../../firebase';

export default function addDocuments(collectionRef, data) {
    const batch = FirebaseApp.instance.firestore().batch();

    let start = 0;
    let end = 500;

    let dataChunk = data.slice(start, end);

    while (dataChunk.length) {
        dataChunk.forEach(item => {
            const docRef = FirebaseApp
                .instance
                .firestore()
                .collection(collectionRef)
                .add();

            batch.set(docRef, item);
        });
        batch.commit();
        start = end;
        end += 500;
        dataChunk = data.slice(start, end);
    }
}
