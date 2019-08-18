/* eslint-disable react/prop-types, react/jsx-props-no-spreading */
import React, { Component } from 'react';
import FirebaseApp from '../../firebase';

export default function withCurrentUserClaims(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: true,
                claims: {},
                error: null,
            };
        }

        componentDidMount() {
            return FirebaseApp.instance
                .auth()
                .currentUser
                .getIdTokenResult()
                .then(idTokenResult => {
                    this.setState({
                        isLoading: false,
                        claims: idTokenResult.claims,
                    });
                })
                .catch(error => this.setState({
                    isLoading: false,
                    error,
                }));
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    {...this.state}
                />
            );
        }
    };
}
