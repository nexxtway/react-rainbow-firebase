import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Lookup } from 'react-rainbow-components';
import { subscribeCollection } from './actions';
import fetchValue from './services/fetch-value';
import getDocReference from '../../helpers/get-doc-reference';
import {
    filter,
    getNormalizedOptions,
    getNormalizedValue,
} from './helpers';
import store from './store';
import withReduxForm from '../../hocs/with-redux-form';

const privateOptions = Symbol('privateOptions');
const privateReduxOptions = Symbol('privateReduxOptions');

class FSLookup extends Component {
    constructor(props) {
        super(props);
        const { collectionRef, optionsMapFn } = props;
        const reduxStore = store.getState()[collectionRef];
        this.state = {
            options: [],
            value: null,
        };
        this[privateOptions] = reduxStore
            ? getNormalizedOptions(reduxStore.options, optionsMapFn) : [];
        this.subscribeToStore();
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { collectionRef } = this.props;
        store.dispatch(subscribeCollection(collectionRef));
        this.resolveValue();
    }

    componentDidUpdate({ value: prevValue }) {
        const { value } = this.props;
        if (value !== prevValue) {
            if (value === '') {
                this.resetOptions();
            }
            this.resolveValue();
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
                const { options } = reduxStore;
                if (this[privateReduxOptions] !== options) {
                    this[privateOptions] = getNormalizedOptions(options, optionsMapFn);
                    const { value } = this.state;
                    if (value) {
                        this.resolveValue();
                    }
                }
                this[privateReduxOptions] = options;
            }
        });
    }

    resolveValue() {
        const { collectionRef, value, optionsMapFn } = this.props;
        const { options } = store.getState()[collectionRef];
        return fetchValue(options, getNormalizedValue(value))
            .then(fetchedValue => {
                this.setState({
                    value: fetchedValue ? optionsMapFn(fetchedValue) : null,
                });
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
            return onChange(getDocReference(`${collectionRef}/${value.id}`));
        }
        return onChange(value);
    }

    resetOptions() {
        this.setState({
            options: [],
        });
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
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
};

FSLookup.defaultProps = {
    component: Lookup,
    optionsMapFn: doc => ({ label: doc.id }),
    onChange: () => {},
    value: undefined,
};

export default withReduxForm(FSLookup);
