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
};

FSLookup.defaultProps = {
    component: Lookup,
    optionsMapFn: doc => ({ label: doc.id }),
    onChange: () => {},
    value: undefined,
    error: undefined,
};

export default withReduxForm(FSLookup);
