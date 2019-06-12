import FirebaseApp from '../../../firebase';

export default function removeDocument(collectionRef, id) {
    return FirebaseApp
        .instance
        .firestore()
        .collection(collectionRef)
        .doc(id)
        .delete();
}
