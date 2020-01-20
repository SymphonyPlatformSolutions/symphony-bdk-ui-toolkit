import React from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import {
  InnerRing, SpinnerIcon, SPINNER_SIZES,
} from './theme';

const Loader = (props) => {
  const {
    size, type, theme, color, background, ...rest
  } = props;


  if (type === 'v2') {
    return <InnerRing {...rest} size={size} theme={theme} color={color} background={background}/>;
  }

  return (
    <div {...rest}>
      <SpinnerIcon size={size} color={color} />
    </div>
  );
};

Loader.propTypes = {
  type: PropTypes.oneOf(['v1', 'v2']),
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  theme: PropTypes.object.isRequired,
  color: PropTypes.string,
  background: PropTypes.string,
};

Loader.defaultProps = {
  type: 'v1',
  size: SPINNER_SIZES.REGULAR,
  color: null,
  background: null,
};

export default withTheme(Loader);
