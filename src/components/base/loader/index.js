import React from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import {
  InnerRing, SpinnerIcon, SPINNER_SIZES,
} from './theme';

const Loader = (props) => {
  const {
    size, type, theme, color, ...rest
  } = props;


  if (type === 'v2') {
    return <InnerRing {...rest} size={size} theme={theme} />;
  }

  return (
    <div {...rest}>
      <SpinnerIcon size={size} color={color} />
    </div>
  );
};

Loader.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(SPINNER_SIZES).map(el => SPINNER_SIZES[el])),
  theme: PropTypes.object.isRequired,
};

Loader.defaultProps = {
  type: 'v1',
  size: SPINNER_SIZES.REGULAR,
};

export default withTheme(Loader);
