import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputField = (props) => {
  const { values } = props;

  return (
    <BaseInputField
      type="text"
      value={values}
    />
  );
};

const BaseInputField = styled.input`
  font-family: 'Lato', sans-serif;
  border-radius: 0.2rem;
  border: 1px solid gray;
  width: 100%;
  padding: .6rem .75rem .6rem .75rem;
`;

export default InputField;
