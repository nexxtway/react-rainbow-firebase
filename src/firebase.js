import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import FirestoreListeners from './firestore/firestore-listeners';

class FirebaseApp {
    initializeApp(config) {
        this.instance = firebase.initializeApp(config);
        this.instance.listeners = {
            unsubscribeFromAll: FirestoreListeners.unsubscribeFromAll,
        };
    }
}

export default new FirebaseApp();
