import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Text from '../Text';
import { colors } from '../../../styles/colors';


const getBackgroundColor = (isChecked, disabled) => (
  isChecked
    ? disabled ? colors.grey : colors.system
    : disabled ? colors.lightgrey
      : colors.white
);

const CheckBox = (props) => {
  const {
    disabled, isChecked, onChange, label,
  } = props;


  return (
    <CheckBoxLabel
      key={`checkbox_${label}`}
      htmlFor={`checkbox-${label}`}
      disabled={disabled}
    >
      <CheckBoxInput
        key={`checkbox_${label}`}
        id={`checkbox-${label}`}
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
  disabled: PropTypes.bool,
  isChecked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  disabled: false,
  isChecked: false,
  label: '',
};

export default CheckBox;

const CheckBoxLabel = styled.label`
  display: flex;
  vertical-align: middle;
  line-height: 1.3rem;
  position: relative;
  user-select: none;
  cursor: ${p => (p.disabled ? 'default' : 'pointer')}
  width: fit-content;
`;

const Checkmark = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  opacity: ${p => (p.isChecked ? 1 : 0)}
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
  width: 1rem;
  height: 1rem;
  background: ${p => getBackgroundColor(p.isChecked, p.disabled)};
  border: 1px solid ${colors.grey};
  border-radius: 4px;
  cursor: ${p => (p.disabled ? 'default' : 'pointer')}
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
`;
