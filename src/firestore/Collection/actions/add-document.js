import FirebaseApp from '../../../firebase';

export default function addDocument(path, data) {
    FirebaseApp
        .instance
        .firestore()
        .collection(path)
        .add(data);
}
