import FirebaseApp from '../../../firebase';

export default function updateDocument(path, id, data) {
    FirebaseApp
        .instance
        .firestore()
        .collection(path)
        .doc(id)
        .update(data);
}
