import FirebaseApp from '../../../firebase';
import { findById } from '../helpers';

export default function fetchValue(options, value) {
    return new Promise((resolve, reject) => {
        if (value) {
            const option = findById(options, value.ref.id);
            if (option) {
                return resolve(option);
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
