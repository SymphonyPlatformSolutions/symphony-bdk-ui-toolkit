import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../../styles/colors';

const InputField = (props) => {
  const {
    blur, disabled, inputType, name, onChange, placeholder, values,
  } = props;

  return (
    <BaseInputField
      type="text"
      name={name || undefined}
      blur={blur || undefined}
      inputType={inputType}
      value={values}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

InputField.propTypes = {
  blur: PropTypes.string,
  disabled: PropTypes.bool,
  inputType: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  values: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  blur: undefined,
  disabled: false,
  inputType: '',
  name: undefined,
  placeholder: 'Input text here...',
  values: '',
};

// const getColor = (type => )

const BaseInputField = styled.input`
  font-family: 'Lato', sans-serif;
  font-size: 0.875rem;
  color: ${colors.fontColor};
  border-radius: 0.2rem;
  border: 1px solid #d2d3d8;
  width: 100%;
  padding: .6rem .75rem .6rem .75rem;

  &:focus {
    outline: none;
    border-color: #2d66f8;
  }
`;

export default InputField;
