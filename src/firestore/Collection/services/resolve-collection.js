import FirebaseApp from '../../../firebase';
import createPipe from './helpers/create-pipe';

export default function resolveCollection(opts) {
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
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                return [];
            }
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        });
}
