import FirebaseApp from '../../../firebase';

export default function addDocument(collectionRef, data) {
    FirebaseApp
        .instance
        .firestore()
        .collection(collectionRef)
        .add(data);
}
