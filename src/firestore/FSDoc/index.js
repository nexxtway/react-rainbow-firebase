import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import getDocReference from '../../helpers/get-doc-reference';
import { subscribeDoc, resetDocStore } from './actions';
import store from './store';

const privateUnsubscribeFromStore = Symbol('privateUnsubscribeFromStore');

function getInitialState(id) {
    const state = store.getState()[id];
    return state || {
        isLoading: false,
    };
}

export default class FSDoc extends Component {
    constructor(props) {
        super(props);
        const id = getDocReference(props.docRef).path;
        this.state = getInitialState(id);
        this.subscribeToStore();
    }

    componentDidMount() {
        const { docRef, once } = this.props;
        const ref = getDocReference(docRef);
        store.dispatch(subscribeDoc(ref, once));
    }

    componentDidUpdate({ docRef: prevDocRef }) {
        const { docRef, once } = this.props;
        if (prevDocRef !== docRef) {
            const { unsubscribe } = this.state;
            if (unsubscribe) {
                unsubscribe();
            }
            const prevId = getDocReference(prevDocRef).path;
            store.dispatch(resetDocStore(prevId));
            this[privateUnsubscribeFromStore]();

            this.subscribeToStore();
            const ref = getDocReference(docRef);
            store.dispatch(subscribeDoc(ref, once));
        }
    }

    componentWillUnmount() {
        const { docRef, once } = this.props;
        if (once) {
            const id = getDocReference(docRef).path;
            store.dispatch(resetDocStore(id));
        }
        this[privateUnsubscribeFromStore]();
    }

    subscribeToStore() {
        const { docRef } = this.props;
        const id = getDocReference(docRef).path;
        this[privateUnsubscribeFromStore] = store.subscribe(() => {
            const state = store.getState()[id];
            if (state) {
                this.setState(state);
            }
        });
    }

    render() {
        const {
            component: DocComponent,
            once,
            docRef,
            ...rest
        } = this.props;
        const { doc, isLoading, error } = this.state;

        return (
            <DocComponent
                {...rest}
                doc={doc}
                isLoading={isLoading}
                error={error} />
        );
    }
}

FSDoc.propTypes = {
    docRef: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]).isRequired,
    component: PropTypes.func,
    once: PropTypes.bool,
};

FSDoc.defaultProps = {
    /* eslint-disable-next-line */
    component: ({ doc }) => <ReactJson src={doc} />,
    once: false,
};
