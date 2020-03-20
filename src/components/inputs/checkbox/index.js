import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../../misc/text';
import { getBackgroundColor, getBorderColor } from './theme';

const SIZES = {
  LARGE: 'large',
  REGULAR: 'regular',
};

const CheckBoxLabel = styled.label`
  display: flex;
  vertical-align: middle;
  position: relative;
  user-select: none;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  width: fit-content;
  margin: 5px 0;
`;

const Checkmark = styled.svg`
  fill: none;
  stroke: white;
  stroke-linecap: round;
  stroke-width: ${({ size }) => (size === SIZES.REGULAR ? '2px' : '3px')};;
  opacity: ${(props) => (props.isChecked ? '1' : '0')};
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
`;

const CheckBoxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  clip: rect(0 0 0 0);
`;

const BaseCheckBox = styled.div`
  align-self:center;
  width: ${({ size }) => (size === SIZES.REGULAR ? '16px' : '20px')};
  height: ${({ size }) => (size === SIZES.REGULAR ? '16px' : '20px')};
  background: ${(props) => getBackgroundColor(props, false)};
  border: ${(props) => getBorderColor(props, false)};
  border-radius: 3px;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;

  ${CheckBoxLabel}:hover & {
    background: ${(props) => getBackgroundColor(props, true)};
    border: ${(props) => getBorderColor(props, true)};
  }

  ${CheckBoxInput}:focus ~ & {
    background: ${(props) => getBackgroundColor(props, true)};
    border: ${(props) => getBorderColor(props, true)};
  }
`;

const LabelText = styled(Text)`
  position: relative;
  display: flex;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? '0.25' : '1')};
`;

const Drawing = styled.polyline`
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  opacity: ${({ show }) => (show ? '1' : '0')};
`;

const CheckBox = (props) => {
  const {
    disabled, checked, onChange, children,
    size, indeterminate,
    ...rest
  } = props;

  return (
    <CheckBoxLabel
      key={`checkbox_${children}`}
      htmlFor={`checkbox-${children}`}
      disabled={disabled}
    >
      <CheckBoxInput
        {...rest}
        key={`checkbox_${children}`}
        id={`checkbox-${children}`}
        checked={checked}
        disabled={disabled}
        type="checkbox"
        onChange={onChange}
      />
      <BaseCheckBox isChecked={checked} size={size} disabled={disabled}>
        <Checkmark isChecked={checked} viewBox="0 0 24 24">
          <Drawing points="19 7 9 17 4 12" show={checked && !indeterminate} />
          <Drawing points="6 12 18 12" show={checked && indeterminate} />
        </Checkmark>
      </BaseCheckBox>
      <LabelText checkSize={size} disabled={disabled} size="small" px="7px">{children}</LabelText>
    </CheckBoxLabel>
  );
};

CheckBox.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  children: PropTypes.string,
  size: PropTypes.oneOf(['large', 'regular']),
  onChange: PropTypes.func.isRequired,
  indeterminate: PropTypes.bool,
};

CheckBox.defaultProps = {
  disabled: false,
  checked: false,
  size: 'regular',
  children: '',
  indeterminate: false,
};

export default CheckBox;
