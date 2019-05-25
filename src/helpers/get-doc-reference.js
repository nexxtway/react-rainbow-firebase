import FirebaseApp from '../firebase';

export default function getDocReference(collectionRef, id) {
    return FirebaseApp.instance
        .firestore()
        .collection(collectionRef)
        .doc(id);
}
