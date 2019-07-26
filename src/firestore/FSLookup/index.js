/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Lookup } from 'react-rainbow-components';
import FSCollection from '../FSCollection';
import withReduxForm from '../../hocs/with-redux-form';
import FSLookupComponent from './component';

class FSLookup extends Component {
    render() {
        const {
            component: LookupComponent,
            error,
            ...rest
        } = this.props;

        return (
            <FSCollection
                {...rest}
                lookupComponent={LookupComponent}
                lookupError={error}
                component={FSLookupComponent}
                cacheStrategy="subscribeOnce"
            />
        );
    }
}

FSLookup.propTypes = {
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
    optionsMapFn: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]),
    /* If it set to true then the value typed will show as first option. */
    includeValueAsOption: PropTypes.bool,
};

FSLookup.defaultProps = {
    component: Lookup,
    query: [],
    limit: undefined,
    startAt: undefined,
    startAfter: undefined,
    endAt: undefined,
    endBefore: undefined,
    optionsMapFn: doc => ({ label: doc.id }),
    onChange: () => {},
    value: undefined,
    error: undefined,
    includeValueAsOption: false,
};

export default withReduxForm(FSLookup);
