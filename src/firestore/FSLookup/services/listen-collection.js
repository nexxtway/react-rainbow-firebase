import FirebaseApp from '../../../firebase';

export default function listenCollection(collectionRef, onDocChange, onError) {
    const ref = FirebaseApp.instance.firestore().collection(collectionRef);

    return ref.onSnapshot(snapshot => {
        if (snapshot.empty) {
            onDocChange(null);
        } else {
            onDocChange(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })));
        }
    }, error => onError(error));
}
