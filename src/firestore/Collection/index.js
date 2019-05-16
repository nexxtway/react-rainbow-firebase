import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import pick from 'lodash/pick';
import { registerCollection } from './actions';
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
        store.subscribe(() => {
            this.setState(store.getState()[props.path]);
        });
    }

    componentDidMount() {
        store.dispatch(registerCollection(pickProps(this.props)));
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
