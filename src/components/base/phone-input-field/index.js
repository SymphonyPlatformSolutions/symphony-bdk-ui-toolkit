import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import ReactPhoneInput from 'react-phone-input-2';
import { ErrorWrapper } from '../input-field';
import './assets/flags.css';

import {
  PhoneInputWrapper,
} from './theme';

import { NoOp } from '../../../utils/helpers';

const PhoneInputField = ({
  value, defaultValue, inputState, disabled, onChange,
  disableAreaCodes, id, onBlur, errorMessage, ...rest
}) => {
  const [hasRef, setRef] = useState(null);
  const elRef = createRef();

  useEffect(() => {
    setRef(elRef.current);
  }, [elRef, elRef.current]);

  return (
    <ErrorWrapper error={inputState === 'error'} errorMessage={errorMessage}>
      <PhoneInputWrapper
        ref={elRef}
        hasRef={hasRef}
        disabled={disabled}
        inputState={inputState}
      >
        <ReactPhoneInput
          disableAreaCodes={disableAreaCodes}
          disabled={disabled}
          defaultCountry={defaultValue}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          inputExtraProps={{
            id,
          }}
          {...rest}
        />
      </PhoneInputWrapper>
    </ErrorWrapper>
  );
};

PhoneInputField.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  inputState: PropTypes.oneOf(['initial', 'error']),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.string,
  disableAreaCodes: PropTypes.bool,
  errorMessage: PropTypes.string,
};

PhoneInputField.defaultProps = {
  disabled: false,
  inputState: 'initial',
  id: '',
  placeholder: 'Input here...',
  value: '',
  onChange: NoOp,
  onBlur: NoOp,
  defaultValue: 'us',
  disableAreaCodes: true,
  errorMessage: 'Something went wrong!',
};

export default PhoneInputField;
