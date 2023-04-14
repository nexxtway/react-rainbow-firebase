import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import pick from 'lodash/pick';
import FirestoreListeners from '../firestore-listeners';
import {
    subscribeCollection,
    reset,
} from './actions';
import {
    addDocument,
    addDocuments,
    updateDocument,
    updateDocuments,
    removeDocument,
    removeDocuments,
} from './services';
import hasQueryPropsChanged from './helpers/has-query-props-changed';
import generateId from './helpers/generate-id';
import { create } from './store';

function pickProps(props) {
    return pick(props, [
        'collectionRef',
        'query',
        'limit',
        'startAt',
        'startAfter',
        'endAt',
        'endBefore',
    ]);
}

export default class FSCollection extends Component {
    constructor(props) {
        super(props);
        const queryProps = pickProps(props);
        const id = generateId(queryProps);
        const isSubscribeOnce = props.cacheStrategy === 'subscribeOnce';
        this.store = create(id, isSubscribeOnce);
        this.state = this.store.getState();
        this.subscribeToStore();
        this.addDoc = this.addDoc.bind(this);
        this.addDocs = this.addDocs.bind(this);
        this.updateDoc = this.updateDoc.bind(this);
        this.updateDocs = this.updateDocs.bind(this);
        this.removeDoc = this.removeDoc.bind(this);
        this.removeDocs = this.removeDocs.bind(this);
    }

    componentDidMount() {
        const { onError } = this.props;
        const queryProps = pickProps(this.props);
        const id = generateId(queryProps);
        this.store.dispatch(subscribeCollection({
            id,
            queryProps,
            onError,
        }));
    }

    componentDidUpdate(prevProps) {
        const prevQueryProps = pickProps(prevProps);
        const queryProps = pickProps(this.props);
        if (hasQueryPropsChanged(prevQueryProps, queryProps)) {
            const { onError } = this.props;
            const prevId = generateId(prevQueryProps);
            const id = generateId(queryProps);
            this.store.dispatch(reset({
                id,
                prevId,
                queryProps,
                onError,
            }));
        }
    }

    componentWillUnmount() {
        const { cacheStrategy } = this.props;
        const isSubscribeOnce = cacheStrategy === 'subscribeOnce';
        if (!isSubscribeOnce) {
            const queryProps = pickProps(this.props);
            const id = generateId(queryProps);
            FirestoreListeners.unsubscribe({ from: id });
        }
        this.unsubscribeFromStore();
    }

    subscribeToStore() {
        this.unsubscribeFromStore = this.store.subscribe(() => {
            const state = this.store.getState();
            if (state) {
                this.setState(state);
            } else {
                this.setState({ data: [] });
            }
        });
    }

    addDoc(data) {
        const { collectionRef } = this.props;
        return addDocument(collectionRef, data);
    }

    addDocs(data) {
        const { collectionRef } = this.props;
        return addDocuments(collectionRef, data);
    }

    updateDoc(id, data) {
        const { collectionRef } = this.props;
        return updateDocument(collectionRef, id, data);
    }

    updateDocs(docs) {
        const { collectionRef } = this.props;
        return updateDocuments(collectionRef, docs);
    }

    removeDoc(id) {
        const { collectionRef } = this.props;
        return removeDocument(collectionRef, id);
    }

    removeDocs(docs) {
        const { collectionRef } = this.props;
        return removeDocuments(collectionRef, docs);
    }

    render() {
        const {
            component: CollectionComponent,
            collectionRef,
            query,
            limit,
            startAt,
            startAfter,
            endAt,
            endBefore,
            cacheStrategy,
            ...rest
        } = this.props;
        const { data, isLoading, error } = this.state;

        return (
            <CollectionComponent
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
                collectionRef={collectionRef}
                data={data}
                isLoading={isLoading}
                error={error}
                addDoc={this.addDoc}
                addDocs={this.addDocs}
                updateDoc={this.updateDoc}
                updateDocs={this.updateDocs}
                removeDoc={this.removeDoc}
                removeDocs={this.removeDocs} />
        );
    }
}

FSCollection.propTypes = {
    collectionRef: PropTypes.string.isRequired,
    component: PropTypes.func,
    query: PropTypes.array,
    limit: PropTypes.number,
    startAt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
    ]),
    startAfter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
    ]),
    endAt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
    ]),
    endBefore: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
    ]),
    cacheStrategy: PropTypes.oneOf([
        'subscribeOnce',
    ]),
    onError: PropTypes.func,
};

FSCollection.defaultProps = {
    // eslint-disable-next-line react/prop-types
    component: ({ data }) => <ReactJson src={data} />,
    query: [],
    limit: undefined,
    startAt: undefined,
    startAfter: undefined,
    endAt: undefined,
    endBefore: undefined,
    cacheStrategy: undefined,
    onError: () => {},
};
