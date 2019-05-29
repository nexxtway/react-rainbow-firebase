/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
import Firebase from '../../../src/firebase';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: 'react-rainbow-firebase.firebaseapp.com',
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID,
};
Firebase.initializeApp(config);


const rootReducer = combineReducers({
    form: formReducer,
});

const store = createStore(rootReducer);


export default class Wrapper extends Component {
    componentDidCatch(error) {
        const { onError } = this.props;
        onError(error);
    }

    render() {
        const { children } = this.props;
        return (
            <Provider store={store}>
                {children}
            </Provider>
        );
    }
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    onError: PropTypes.func.isRequired,
};
