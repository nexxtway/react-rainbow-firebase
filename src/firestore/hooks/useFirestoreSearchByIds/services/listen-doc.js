import FirebaseApp from '../../../../firebase';

export default function listenDoc(params) {
    const {
        path,
        onDocChange,
        onError,
    } = params;

    return FirebaseApp.instance
        .firestore()
        .doc(path)
        .onSnapshot(doc => onDocChange({
            id: doc.id,
            data: doc.data(),
        }), onError);
}
