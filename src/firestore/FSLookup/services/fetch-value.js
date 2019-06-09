import FirebaseApp from '../../../firebase';

export default function fetchValue(options, value) {
    return new Promise((resolve, reject) => {
        if (value) {
            const { id, data } = value;
            if (id && data) {
                return resolve({
                    id,
                    data,
                });
            }
            return FirebaseApp.instance
                .firestore()
                .doc(value.ref.path)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        return resolve({
                            id: doc.id,
                            data: doc.data(),
                        });
                    }
                    return resolve(null);
                })
                .catch(e => reject(e));
        }
        return resolve(null);
    });
}
