import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../text';
import { getBackgroundColor } from './theme';

const CheckBoxLabel = styled.label`
  display: flex;
  vertical-align: middle;
  line-height: 1.3rem;
  position: relative;
  user-select: none;
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  width: fit-content;
/* 
  position: relative;
  padding-left: 1.4rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  line-height: 0.9rem;
  display: inline-block; */
`;

const Checkmark = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  opacity: ${p => (p.isChecked ? 1 : 0)};
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
  background: ${props => getBackgroundColor(props)};
  border: 1px solid ${props => getBackgroundColor(props)};
  border-radius: 2px;
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
`;

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
      <Text style={{ position: 'relative', top: '2px' }} size="small" px="7px" my="0">{label}</Text>
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
