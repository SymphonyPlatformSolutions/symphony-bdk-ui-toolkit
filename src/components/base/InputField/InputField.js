import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../../styles/colors';

const InputField = (props) => {
  const {
    blur, disabled, inputType, isRequire, messageRequired, name, onChange, placeholder, values,

  } = props;

  return (
    <BaseInputField
      blur={blur || undefined}
      disabled={disabled}
      isRequire={isRequire}
      inputType={inputType}
      name={name || undefined}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      value={values}
    />
  );
};

InputField.propTypes = {
  blur: PropTypes.string,
  disabled: PropTypes.bool,
  inputType: PropTypes.string,
  isRequire: PropTypes.bool,
  messageRequired: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  values: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  blur: undefined,
  disabled: false,
  inputType: '',
  isRequire: false,
  name: undefined,
  messageRequired: 'Enter a valid input',
  placeholder: 'Input text here...',
  values: '',
};


const BaseInputField = styled.input`
  font-family: 'Lato', sans-serif;
  font-size: 0.875rem;
  color: ${colors.fontColor};
  border-radius: 0.2rem;
  border: 1px solid #d2d3d8;
  width: 100%;
  padding: .6rem .75rem .6rem .75rem;
  cursor: ${props => (props.disabled ? 'default' : 'text')};

  &:disabled {
    background-color: {$}
  }

  &:focus {
    outline: none;
    border-color: #2d66f8;
  }
`;

export default InputField;
