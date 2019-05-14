import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';

const InputField = (props) => {
  const {
    blur, disabled, type, name, onChange, placeholder, value,

  } = props;

  return (
    <BaseInputField
      blur={blur || undefined}
      disabled={disabled}
      name={name || undefined}
      onChange={onChange}
      placeholder={placeholder}
      type={type === 'password' ? type : 'text'}
      value={value}
    />
  );
};

InputField.propTypes = {
  blur: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  blur: undefined,
  disabled: false,
  name: undefined,
  placeholder: 'Input text here...',
  type: '',
  value: '',
};

export default InputField;

const BaseInputField = styled.input`
  font-family: 'Lato', sans-serif;
  font-size: 0.875rem;
  border-radius: 0.2rem;
  border: 1px solid ${colors.inputBorder};
  width: 100%;
  padding: .6rem .75rem .6rem .75rem;
  cursor: ${props => (props.disabled ? 'default' : 'text')};

  &:disabled {
    color: ${colors.disabled}
    background-color: ${colors.disabled}
  }
  
  &::placeholder {
    color: ${props => (!props.disabled ? colors.inputPlaceHolder : colors.disabled)}
  }

  &:focus {
    outline: none;
    border-color: #2d66f8;
  }
`;
