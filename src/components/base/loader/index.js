import React from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import {
  getBackgroundColor, getTileColor,
} from './theme';
import LoaderPNG from './Loading.png';
import WhiteLoaderPNG from './Loading_White.png';

const SPINNER_SIZES = {
  SMALL: 'small',
  REGULAR: 'regular',
  LARGE: 'large',
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const spinnerSize = ({ size }) => {
  switch (size) {
    case SPINNER_SIZES.SMALL:
      return '16px';
    case SPINNER_SIZES.LARGE:
      return '64px';
    default:
      return '32px';
  }
};

const borderWidth = ({ size }) => {
  switch (size) {
    case SPINNER_SIZES.SMALL:
      return '3px';
    case SPINNER_SIZES.LARGE:
      return '8px';
    default:
      return '6px';
  }
};

const InnerRing = styled.div`
  display: inline-block;
  width: ${spinnerSize};
  height: ${spinnerSize};
  border-radius: 50%;
  border: ${borderWidth} solid ${props => getBackgroundColor(props)};
  border-color: ${props => getBackgroundColor(props)};
  overflow: visible;

  &:after {
    content: " ";
    display: block;
    width: ${spinnerSize};
    height: ${spinnerSize};
    margin: -${borderWidth};
    border-radius: 50%;
    border: ${borderWidth} solid ${props => getTileColor(props)};
    border-color: ${props => getTileColor(props)} transparent transparent transparent;
    animation: ${spin} 0.7s linear infinite;
  }
`;

const LoaderImg = styled.img`
  animation: ${spin} 0.7s linear infinite;
  height: ${props => spinnerSize(props)};
  width: ${props => spinnerSize(props)};
`;

const Loader = (props) => {
  const {
    size, type, theme, color, ...rest
  } = props;


  if (type === 'v2') {
    return <InnerRing {...rest} size={size} theme={theme} />;
  }

  return (
    <div {...rest}>
      <LoaderImg src={color === 'white' ? WhiteLoaderPNG : LoaderPNG} size={size} />
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
