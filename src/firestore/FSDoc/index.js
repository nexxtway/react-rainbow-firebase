import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import getDocReference from '../../helpers/get-doc-reference';
import { subscribeDoc, resetDocStore } from './actions';
import { updateDocument, removeDocument } from './services';
import { create } from './store';

const privateUnsubscribeFromStore = Symbol('privateUnsubscribeFromStore');

export default class FSDoc extends Component {
    constructor(props) {
        super(props);
        const id = getDocReference(props.docRef).path;
        this.store = create(id, props.once);
        this.state = this.store.getState();
        this.subscribeToStore();
        this.updateDoc = this.updateDoc.bind(this);
        this.removeDoc = this.removeDoc.bind(this);
    }

    componentDidMount() {
        const { docRef, once, onError } = this.props;
        const ref = getDocReference(docRef);
        this.store.dispatch(subscribeDoc(ref, once, onError));
    }

    componentDidUpdate({ docRef: prevDocRef }) {
        const { docRef, once, onError } = this.props;
        if (prevDocRef !== docRef) {
            const { unsubscribe } = this.state;
            if (unsubscribe) {
                unsubscribe();
            }
            this.store.dispatch(resetDocStore());
            const ref = getDocReference(docRef);
            this.store.dispatch(subscribeDoc(ref, once, onError));
        }
    }

    componentWillUnmount() {
        this[privateUnsubscribeFromStore]();
    }

    subscribeToStore() {
        this[privateUnsubscribeFromStore] = this.store.subscribe(() => {
            const state = this.store.getState();
            if (state) {
                this.setState(state);
            }
        });
    }

    updateDoc(data) {
        const { docRef } = this.props;
        const ref = getDocReference(docRef);
        updateDocument(ref, data);
    }

    removeDoc() {
        const { docRef } = this.props;
        const ref = getDocReference(docRef);
        removeDocument(ref);
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
                error={error}
                updateDoc={this.updateDoc}
                removeDoc={this.removeDoc} />
        );
    }
}

FSDoc.propTypes = {
    docRef: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]).isRequired,
    component: PropTypes.func,
    /** If set to true get the doc data once and does not stay listening. */
    once: PropTypes.bool,
    onError: PropTypes.func,
};

FSDoc.defaultProps = {
    /* eslint-disable-next-line */
    component: ({ doc }) => <ReactJson src={doc} />,
    once: false,
    onError: () => {},
};
