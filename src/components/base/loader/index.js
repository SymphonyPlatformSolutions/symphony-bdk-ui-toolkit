import React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import { PropTypes } from 'prop-types';

const LoaderWrapper = styled.div`
  width: 100%;
  position: absolute;
`;

export default function Loader(props) {
  const { size, color } = props;
  return (
    <LoaderWrapper>
      <ClipLoader
        sizeUnit="px"
        size={size}
        color={color}
      />
    </LoaderWrapper>
  );
}

Loader.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
