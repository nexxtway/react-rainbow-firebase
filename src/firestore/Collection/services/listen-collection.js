import FirebaseApp from '../../../firebase';
import createPipe from '../helpers/create-pipe';

export default function listenCollection(opts, onDocChange, onError) {
    const {
        path,
        query,
        startAt,
        startAfter,
        endAt,
        endBefore,
        limit,
    } = opts;

    const collectionRef = FirebaseApp.instance.firestore().collection(path);
    const queryArray = query.concat([
        { startAt },
        { startAfter },
        { endAt },
        { endBefore },
        { limit },
    ]);

    return createPipe(collectionRef, queryArray)
        .onSnapshot(snapshot => {
            if (snapshot.empty) {
                onDocChange(null);
            } else {
                snapshot.docChanges().forEach(change => {
                    const { doc, type } = change;
                    onDocChange({
                        type,
                        id: doc.id,
                        data: doc.data(),
                    });
                });
            }
        }, error => onError(error));
}
