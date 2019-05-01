import React from 'react';
import PropTypes from 'prop-types';
import { PulseLoader } from 'react-spinners';

export default function Spinner(props) {
  const { isBig, color } = props;

  if (isBig) {
    return <PulseLoader color={color} sizeUnit="rem" size={1.1} />;
  }

  return <PulseLoader color={color} sizeUnit="px" size={8} />;
}

Spinner.propTypes = {
  isBig: PropTypes.bool,
  color: PropTypes.string,
};

Spinner.defaultProps = {
  isBig: false,
  color: '#4d4d4d',
};
