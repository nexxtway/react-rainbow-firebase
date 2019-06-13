import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class FirebaseApp {
    initializeApp(config) {
        this.instance = firebase.initializeApp(config);
    }
}

export default new FirebaseApp();
