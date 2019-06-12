import FirebaseApp from '../../../firebase';

export default function removeDocument(collectionRef, id) {
    FirebaseApp
        .instance
        .firestore()
        .collection(collectionRef)
        .doc(id)
        .delete();
}
