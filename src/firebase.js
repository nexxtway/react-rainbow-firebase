import firebase from 'firebase/app';
import 'firebase/firestore';

class FirebaseApp {
    initializeApp(config) {
        this.instance = firebase.initializeApp(config);
    }
}

export default new FirebaseApp();
