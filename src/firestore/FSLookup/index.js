import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Lookup } from 'react-rainbow-components';
import {
    subscribeCollection,
    resolveValue,
} from './actions';
import getDocReference from '../../helpers/get-doc-reference';
import {
    filter,
    getNormalizedOptions,
} from './helpers';
import store from './store';

const privateOptions = Symbol('privateOptions');
const privateReduxOptions = Symbol('privateReduxOptions');

export default class FSLookup extends Component {
    constructor(props) {
        super(props);
        const { collectionRef, optionsMapFn } = props;
        const reduxStore = store.getState()[collectionRef];
        this.state = {
            options: [],
        };
        this[privateOptions] = reduxStore
            ? getNormalizedOptions(reduxStore.options, optionsMapFn) : [];
        this.subscribeToStore();
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { collectionRef, value } = this.props;
        store.dispatch(subscribeCollection(collectionRef));
        store.dispatch(resolveValue(collectionRef, value));
    }

    componentDidUpdate({ value: prevValue }) {
        const { collectionRef, value } = this.props;
        if (value !== prevValue) {
            store.dispatch(resolveValue(collectionRef, value));
        }
    }

    componentWillUnmount() {
        this.unsubscribeFromStore();
    }

    subscribeToStore() {
        const { collectionRef, optionsMapFn } = this.props;
        this.unsubscribeFromStore = store.subscribe(() => {
            const reduxStore = store.getState()[collectionRef];
            if (reduxStore) {
                const { options, value } = reduxStore;
                if (this[privateReduxOptions] !== options) {
                    this[privateOptions] = getNormalizedOptions(options, optionsMapFn);
                }
                this[privateReduxOptions] = options;
                if (value) {
                    this.setState({
                        value: optionsMapFn(value),
                    });
                } else {
                    this.setState({
                        value: null,
                    });
                }
            }
        });
    }

    handleSearch(value) {
        this.setState({
            options: filter(value, this[privateOptions]),
        });
    }

    handleChange(value) {
        const { onChange, collectionRef } = this.props;
        if (value) {
            return onChange(getDocReference(collectionRef, value.id));
        }
        return onChange(value);
    }

    render() {
        const {
            component: LookupComponent,
            onChange,
            collectionRef,
            optionsMapFn,
            ...rest
        } = this.props;
        const { options, value } = this.state;

        return (
            <LookupComponent
                {...rest}
                options={options}
                value={value}
                onChange={this.handleChange}
                onSearch={this.handleSearch} />
        );
    }
}

FSLookup.propTypes = {
    collectionRef: PropTypes.string.isRequired,
    component: PropTypes.func,
    optionsMapFn: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.object,
};

FSLookup.defaultProps = {
    component: Lookup,
    optionsMapFn: doc => ({ label: doc.id }),
    onChange: () => {},
    value: undefined,
};
