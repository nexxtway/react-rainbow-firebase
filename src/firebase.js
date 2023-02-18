import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import FirestoreListeners from './firestore/firestore-listeners';

class FirebaseApp {
    initializeApp(config) {
        this.instance = firebase.initializeApp(config);
        this.instance.firestoreListeners = {
            unsubscribeFromAll: FirestoreListeners.unsubscribeFromAll.bind(FirestoreListeners),
        };
    }
}

export default new FirebaseApp();
