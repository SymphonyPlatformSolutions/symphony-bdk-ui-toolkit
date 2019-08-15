import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css';

import {
  PhoneInputWrapper,
} from './theme';

import { NoOp } from '../../../utils/helpers';


const PhoneInputField = ({
  value, defaultValue, inputState, disabled, onChange,
}, ...rest) => {
  const [hasRef, setRef] = useState(null);
  const elRef = createRef();

  useEffect(() => {
    setRef(elRef.current);
  }, [elRef, elRef.current]);

  return (
    <PhoneInputWrapper
      ref={elRef}
      hasRef={hasRef}
      disabled={disabled}
      inputState={inputState}
    >
      <ReactPhoneInput
        disabled={disabled}
        defaultCountry={defaultValue}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </PhoneInputWrapper>
  );
};

PhoneInputField.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  inputState: PropTypes.oneOf(['initial', 'error']),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

PhoneInputField.defaultProps = {
  disabled: false,
  inputState: 'initial',
  id: '',
  placeholder: 'Input here...',
  value: '',
  onChange: NoOp,
  defaultValue: 'us',
};

export default PhoneInputField;
