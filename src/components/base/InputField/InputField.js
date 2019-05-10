import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';

const InputField = (props) => {
  const {
    blur, disabled, type, isRequire, messageRequired, name, onChange, placeholder, values,

  } = props;

  return (
    <BaseInputField
      blur={blur || undefined}
      disabled={disabled}
      isRequire={isRequire}
      name={name || undefined}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={values}
    />
  );
};

InputField.propTypes = {
  blur: PropTypes.string,
  disabled: PropTypes.bool,
  isRequire: PropTypes.bool,
  messageRequired: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  values: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  blur: undefined,
  disabled: false,
  isRequire: false,
  name: undefined,
  messageRequired: 'Enter a valid input',
  placeholder: 'Input text here...',
  type: 'text',
  values: '',
};

export default InputField;

const BaseInputField = styled.input`
  font-family: 'Lato', sans-serif;
  font-size: 0.875rem;
  border-radius: 0.2rem;
  border: 1px solid #d2d3d8;
  width: 100%;
  padding: .6rem .75rem .6rem .75rem;
  cursor: ${props => (props.disabled ? 'default' : 'text')};

  &:disabled {
    color: ${colors.inputTextDisabled}
    background-color: ${colors.disabled}
  }
  
  &::placeholder {
    color: ${colors.inputPlaceHolder}
  }

  &:focus {
    outline: none;
    border-color: #2d66f8;
  }
`;
