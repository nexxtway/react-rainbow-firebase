import FirebaseApp from '../../../firebase';

export default function updateDocument(collectionRef, id, data) {
    FirebaseApp
        .instance
        .firestore()
        .collection(collectionRef)
        .doc(id)
        .update(data);
}
