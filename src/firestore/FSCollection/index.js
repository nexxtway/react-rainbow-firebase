import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import pick from 'lodash/pick';
import {
    subscribeCollection,
    resetCollectionStore,
    addDocument,
    updateDocument,
    removeDocument,
} from './actions';
import hasQueryPropsChanged from './helpers/has-query-props-changed';
import generateId from './helpers/generate-id';
import store from './store';

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
        this.state = {
            data: [],
            isLoading: false,
        };
        this.subscribeToStore();
        this.addDoc = this.addDoc.bind(this);
        this.updateDoc = this.updateDoc.bind(this);
        this.removeDoc = this.removeDoc.bind(this);
    }

    componentDidMount() {
        const queryProps = pickProps(this.props);
        const id = generateId(queryProps);
        store.dispatch(subscribeCollection(queryProps, id));
    }

    componentDidUpdate(prevProps) {
        const prevQueryProps = pickProps(prevProps);
        const queryProps = pickProps(this.props);
        if (hasQueryPropsChanged(prevQueryProps, queryProps)) {
            this.resetQuery(prevQueryProps, queryProps);
        }
    }

    componentWillUnmount() {
        const { unsubscribe } = this.state;
        const queryProps = pickProps(this.props);
        const id = generateId(queryProps);
        unsubscribe();
        store.dispatch(resetCollectionStore(id));
        this.unsubscribeFromStore();
    }

    resetQuery(prevQueryProps, nextQueryProps) {
        const { unsubscribe } = this.state;
        const nextId = generateId(nextQueryProps);
        const prevId = generateId(prevQueryProps);
        unsubscribe();
        store.dispatch(resetCollectionStore(prevId));
        this.unsubscribeFromStore();
        this.subscribeToStore();
        store.dispatch(subscribeCollection(nextQueryProps, nextId));
    }

    subscribeToStore() {
        const id = generateId(pickProps(this.props));
        this.unsubscribeFromStore = store.subscribe(() => {
            const state = store.getState()[id];
            if (state) {
                this.setState(state);
            } else {
                this.setState({ data: [] });
            }
        });
    }

    addDoc(data) {
        const { collectionRef } = this.props;
        addDocument(collectionRef, data);
    }

    updateDoc(id, data) {
        const { collectionRef } = this.props;
        updateDocument(collectionRef, id, data);
    }

    removeDoc(id) {
        const { collectionRef } = this.props;
        removeDocument(collectionRef, id);
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
            ...rest
        } = this.props;
        const { data, isLoading, error } = this.state;

        return (
            <CollectionComponent
                {...rest}
                data={data}
                isLoading={isLoading}
                error={error}
                addDoc={this.addDoc}
                updateDoc={this.updateDoc}
                removeDoc={this.removeDoc} />
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
};

FSCollection.defaultProps = {
    /* eslint-disable-next-line */
    component: ({ data }) => <ReactJson src={data} />,
    query: [],
    limit: undefined,
    startAt: undefined,
    startAfter: undefined,
    endAt: undefined,
    endBefore: undefined,
};
