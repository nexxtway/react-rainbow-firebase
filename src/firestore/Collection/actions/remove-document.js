import FirebaseApp from '../../../firebase';

export default function removeDocument(path, id) {
    FirebaseApp
        .instance
        .firestore()
        .collection(path)
        .doc(id)
        .delete();
}
