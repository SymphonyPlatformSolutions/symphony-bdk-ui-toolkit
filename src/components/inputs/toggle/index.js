import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import {
  InvisibleInput,
  Wrapper,
  ToggleContainer,
  SwitchCircle,
} from './theme';
import { NoOp } from '../../../utils/helpers';

const Toggle = (props) => {
  const {
    onChange = NoOp,
    toggled = false,
    disabled = false,
    color = null,
    ...rest
  } = props;

  return (
    <Wrapper disabled={disabled} onClick={() => !disabled && onChange(!toggled)} {...rest}>
      <ToggleContainer disabled={disabled} toggled={toggled}>
        <SwitchCircle disabled={disabled} toggled={toggled} color={color} />
      </ToggleContainer>
      <InvisibleInput type="checkbox" disabled={disabled} onChange={() => onChange(!toggled)} checked={toggled} />
    </Wrapper>
  );
};

Toggle.propTypes = {
  onChange: PropTypes.func,
  toggled: PropTypes.bool,
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

export default withTheme(Toggle);
