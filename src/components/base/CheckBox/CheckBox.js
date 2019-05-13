import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';

const CheckBoxLabel = styled.label.attrs({
  key: `label_${props => props.children}`,
  htmlFor: `checkbox-${props => props.children}`,
})`
  display: block;
  vertical-align: middle;
`;

const Checkmark = styled.div`
  position: absolute;
  left: 14px;
  top: 2px;
  width: 4px;
  height: 7px;
  opacity: ${props => (props.isChecked ? 1 : 0)}
  border: solid red;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg) scale(1);
  transform: rotate(45deg) scale(1);
  -webkit-transition: all 0.2s ease;
`;

const CheckBoxInput = styled.input.attrs({
  type: 'checkbox',
})`
  position: absolute;
  opacity: 1;
  cursor: pointer;
`;

const BaseCheckBox = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: ${props => (props.isChecked ? colors.system : colors.white)}
  border: 1px solid ${props => (props.isChecked ? colors.system : colors.checkBoxBorder)};
  border-radius: 4px;
`;


const CheckBox = (props) => {
  const {
    children, disabled, isChecked, onChange,
  } = props;


  return (

    <CheckBoxLabel disabled={disabled}>
      <CheckBoxInput />
      <BaseCheckBox isChecked={isChecked} />
      <Checkmark isChecked={isChecked} />
      {children}
    </CheckBoxLabel>
  );
};

export default CheckBox;
