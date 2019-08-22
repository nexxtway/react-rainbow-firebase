import FirebaseApp from '../../../../firebase';

export default function fetchDocs(ids, inCollection) {
    const promises = ids.map(
        id => FirebaseApp.instance
            .firestore()
            .doc(`${inCollection}/${id}`)
            .get()
            .catch(() => null),
    );

    return Promise.all(promises)
        .then(docs => docs.reduce((acc, doc) => {
            if (doc && doc.exists) {
                acc.push({
                    id: doc.id,
                    data: doc.data(),
                });
            }
            return acc;
        }, []))
        .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error.message);
            return [];
        });
}
