export default function listenDoc(ref, onDocChange, onError) {
    return ref.onSnapshot(doc => {
        if (doc.exists) {
            onDocChange({
                id: doc.id,
                data: doc.data(),
            });
        } else {
            onDocChange(null);
        }
    }, onError);
}
