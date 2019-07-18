import FirebaseApp from '../../../firebase';
import createPipe from '../helpers/create-pipe';

export default function listenCollection(opts, onDocChange, onError) {
    const {
        collectionRef,
        query,
        startAt,
        startAfter,
        endAt,
        endBefore,
        limit,
    } = opts;

    const ref = FirebaseApp.instance.firestore().collection(collectionRef);
    const queryArray = query.concat([
        { startAt },
        { startAfter },
        { endAt },
        { endBefore },
        { limit },
    ]);

    return createPipe(ref, queryArray)
        .onSnapshot(snapshot => {
            if (snapshot.empty) {
                onDocChange([]);
            } else {
                onDocChange(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                })));
            }
        }, onError);
}
