import FirebaseApp from '../../../../firebase';

export default function fetchIdsCollection(idsCollection) {
    return FirebaseApp.instance
        .firestore()
        .collection(idsCollection)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                return [];
            }
            return querySnapshot.docs.map(doc => doc.id);
        })
        .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error.message);
            return [];
        });
}
