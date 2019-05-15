import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Text from '../Text';
import { colors } from '../../../styles/colors';

const getBgColor = (isChecked, disabled) => (
  (!disabled && isChecked)
    ? colors.system
    : (disabled || isChecked ? colors.grey : colors.white)
);

const CheckBox = (props) => {
  const {
    children, disabled, isChecked, onChange, label,
  } = props;

  return (

    <CheckBoxLabel
      key={`checkbox_${children}`}
      htmlFor={`checkbox-${children}`}
      disabled={disabled}
    >
      <CheckBoxInput
        key={`checkbox_${children}`}
        id={`checkbox-${children}`}
        checked={isChecked}
        disabled={disabled}
        type="checkbox"
        onChange={onChange}
      />
      <BaseCheckBox isChecked={isChecked} disabled={disabled}>
        <Checkmark isChecked={isChecked} viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Checkmark>
      </BaseCheckBox>
      <Text size="small">{label}</Text>
    </CheckBoxLabel>
  );
};

CheckBox.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  disabled: false,
  isChecked: false,
};

export default CheckBox;

const CheckBoxLabel = styled.label`
  display: flex;
  vertical-align: middle;
  line-height: 1.3rem;
  position: relative;
  user-select: none;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')}
  width: fit-content;
`;

const Checkmark = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  opacity: ${props => (props.isChecked ? 1 : 0)}
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
`;

const CheckBoxInput = styled.input`
  position: absolute;
  opacity: 0;
`;

const BaseCheckBox = styled.div`
  align-self:center;
  width: 1rem;
  height: 1rem;
  margin-right: .5rem;
  background: ${props => getBgColor(props.isChecked, props.disabled)}
  border: 1px solid ${props => (!props.disabled && props.isChecked ? colors.system : colors.grey)};
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')}
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
`;
