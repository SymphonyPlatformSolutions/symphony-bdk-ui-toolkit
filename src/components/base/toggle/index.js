import React from 'react';
import styled, { withTheme } from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';
import {
  InvisibleInput,
  Wrapper,
  ToggleContainer,
  SwitchCircle,
} from './theme';

const Toggle = (props) => {
  const { toggled, onChange } = props;

  return (
    <Wrapper onClick={() => onChange(!toggled)}>
      <ToggleContainer toggled={toggled}>
        <SwitchCircle toggled={toggled} />
      </ToggleContainer>
      <InvisibleInput type="checkbox" onChange={() => onChange(!toggled)} checked={toggled} />
    </Wrapper>
  );
};

export default withTheme(Toggle);
