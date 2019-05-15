import React from 'react';
import PropTypes from 'prop-types';

export default function Collection(props) {
    const { className, style } = props;
    return (
        <div className={className} style={style} />
    );
};

Collection.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

Collection.defaultProps = {
    className: '',
    style: {},
};
