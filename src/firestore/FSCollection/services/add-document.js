import FirebaseApp from '../../../firebase';

export default function addDocument(collectionRef, data) {
    return FirebaseApp
        .instance
        .firestore()
        .collection(collectionRef)
        .add(data);
}
