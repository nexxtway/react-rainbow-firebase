import FirebaseApp from '../firebase';

export default function getDocReference(docRef) {
    if (typeof docRef === 'string') {
        return FirebaseApp.instance
            .firestore()
            .doc(docRef);
    }
    return docRef;
}
