import { Component } from 'react';
import PropTypes from 'prop-types';
import Firebase from '../../../src/firebase';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID,
};
Firebase.initializeApp(config);

export default class Wrapper extends Component {
    componentDidCatch(error) {
        const { onError } = this.props;
        onError(error);
    }

    render() {
        const { children } = this.props;
        return children;
    }
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    onError: PropTypes.func.isRequired,
};
