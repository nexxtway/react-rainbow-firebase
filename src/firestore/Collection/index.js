import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import pick from 'lodash/pick';
import { subscribeCollection, resetCollectionStore } from './actions';
import hasQueryPropsChanged from './helpers/has-query-props-changed';
import generateId from './helpers/generate-id';
import store from './store';

function pickProps(props) {
    return pick(props, [
        'path',
        'query',
        'limit',
        'startAt',
        'startAfter',
        'endAt',
        'endBefore',
    ]);
}

export default class Collection extends Component {
    constructor(props) {
        super(props);
        this.subscribeToStore();
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
            const { unsubscribe } = this.state;
            const id = generateId(queryProps);
            const prevId = generateId(prevQueryProps);
            unsubscribe();
            this.unsubscribeFromStore();
            this.subscribeToStore();
            store.dispatch(resetCollectionStore(prevId));
            store.dispatch(subscribeCollection(queryProps, id));
        }
    }

    componentWillUnmount() {
        const { unsubscribe } = this.state;
        const queryProps = pickProps(this.props);
        const id = generateId(queryProps);
        unsubscribe();
        store.dispatch(resetCollectionStore(id));
    }

    subscribeToStore() {
        const id = generateId(pickProps(this.props));
        this.unsubscribeFromStore = store.subscribe(() => {
            const state = store.getState()[id];
            if (state) {
                this.setState(state);
            }
        });
    }

    render() {
        const {
            component: CollectionComponent,
            ...rest
        } = this.props;

        return <CollectionComponent {...rest} {...this.state} />;
    }
}

Collection.propTypes = {
    path: PropTypes.string.isRequired,
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

Collection.defaultProps = {
    /* eslint-disable-next-line */
    component: ({ data }) => <ReactJson src={data} />,
    query: [],
    limit: undefined,
    startAt: undefined,
    startAfter: undefined,
    endAt: undefined,
    endBefore: undefined,
};
