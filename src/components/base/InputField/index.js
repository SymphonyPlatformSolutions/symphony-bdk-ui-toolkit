import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';

const InputField = (props) => {
  const {
    blur, disabled, name, onChange, placeholder, value, inputState,

  } = props;

  return (
    <BaseInputField
      blur={blur || undefined}
      disabled={disabled}
      name={name || undefined}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      value={value}
      inputState={inputState}
    />
  );
};

InputField.propTypes = {
  blur: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  blur: undefined,
  disabled: false,
  name: undefined,
  placeholder: 'Input here...',
  value: '',
};

export default InputField;

const BaseInputField = styled.input`
  font-family: 'Lato', sans-serif;
  font-size: 0.875rem;
  border-radius: 0.2rem;
  border: 1px solid ${props => (props.inputState ? colors.caution : colors.lightgrey)};
  width: 100%;
  padding: .6rem .75rem .6rem .75rem;
  cursor: ${props => (props.disabled ? 'default' : 'text')};

  &:disabled {
    color: ${colors.darkgrey}
    background-color: ${colors.lightgrey}
  }
  
  &::placeholder {
    color: ${colors.grey};
  }

  &:focus {
    outline: none;
    border-color: ${props => (props.inputState ? 'none' : colors.blue)};
  }
`;
