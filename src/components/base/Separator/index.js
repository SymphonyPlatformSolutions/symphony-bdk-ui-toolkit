import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export default function Separator() {

  return (
    <BaseSeparator />
  );
}

const BaseSeparator = styled.div`
  width: 100%;
  border-bottom: 1px ${colors.lightgrey} solid;
`;
