import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';

const CheckBox = (props) => {
  const {
    children, disabled, isChecked, onChange,
  } = props;

  const CheckBoxLabel = styled.label.attrs({
    key: `label_${children}`,
    htmlFor: `checkbox-${children}`,
  })`
    display: block;
    vertical-align: middle;
  `;

  const CheckBoxIcon = styled.svg`
    fill: none;
    stroke: ${colors.system};
    stroke-width: 2px;
  `;

  const CheckBoxDefaultHide = styled.input.attrs({
    type: 'checkbox',
  })`
    position: absolute;
    opacity: 0;
    cursor: pointer;
  `;

  const BaseCheckBox = styled.div`
    display: 
  `;

  return (
    <BaseCheckBox />
  );
};
