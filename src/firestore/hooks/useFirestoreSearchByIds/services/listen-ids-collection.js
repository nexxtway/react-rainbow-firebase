import FirebaseApp from '../../../../firebase';

export default function listenIdsCollection(idsCollection, onChange, onError) {
    return FirebaseApp.instance
        .firestore()
        .collection(idsCollection)
        .onSnapshot(snapshot => {
            if (snapshot.empty) {
                onChange([]);
            } else {
                onChange(snapshot.docChanges().map(change => {
                    const { type, doc } = change;
                    return {
                        type,
                        id: doc.id,
                    };
                }));
            }
        }, onError);
}
