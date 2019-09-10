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
  margin: 5px 0;
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
    disabled, checked, onChange, children, ...rest
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
      <BaseCheckBox isChecked={checked} disabled={disabled}>
        <Checkmark isChecked={checked} viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Checkmark>
      </BaseCheckBox>
      <Text style={{ position: 'relative', top: '2px' }} size="small" px="7px">{children}</Text>
    </CheckBoxLabel>
  );
};

CheckBox.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  children: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  disabled: false,
  checked: false,
  children: '',
};

export default CheckBox;
