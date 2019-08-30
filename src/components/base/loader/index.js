import React from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import {
  getBackgroundColor, getTileColor,
} from './theme';

const LoaderWrapper = styled.div`
  width: 100%;
  position: absolute;
`;

const SPINNER_SIZES = {
  SMALL: 'small',
  NORMAL: 'normal',
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
  border: ${borderWidth} solid ${({ theme }) => getBackgroundColor(theme)};
  border-color: ${({ theme }) => getBackgroundColor(theme)};
  
  &:after {
    content: " ";
    display: block;
    width: ${spinnerSize};
    height: ${spinnerSize};
    margin: -${borderWidth};
    border-radius: 50%;
    border: ${borderWidth} solid ${({ theme }) => getTileColor(theme)};
    border-color: ${({ theme }) => getTileColor(theme)} transparent transparent transparent;
    animation: ${spin} 0.7s linear infinite;
  }
`;

const Loader = (props) => {
  const {
    size, color, type, theme, presetSize,
  } = props;

  if (type === 'v2') {
    return <InnerRing size={presetSize} theme={theme} />;
  }

  return (
    <LoaderWrapper>
      <ClipLoader
        sizeUnit="px"
        size={size}
        color={color}
      />
    </LoaderWrapper>
  );
};

Loader.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number,
  type: PropTypes.string,
  presetSize: PropTypes.string,
};

Loader.defaultProps = {
  type: 'v1',
  presetSize: SPINNER_SIZES.NORMAL,
  size: 12,
};

export default withTheme(Loader);
