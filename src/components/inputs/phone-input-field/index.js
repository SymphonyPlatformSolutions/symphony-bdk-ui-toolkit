import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import ReactPhoneInput from 'react-phone-input-2';
import { withTheme } from 'styled-components';
import { ErrorWrapper } from '../input-field';
import './assets/flags.css';
import {
  PhoneInputWrapper,
  InputLabel,
  Container,
} from './theme';
import Tooltip from '../../misc/tooltip';

import { NoOp } from '../../../utils/helpers';

const PhoneInputField = ({
  value, defaultValue, inputState, disabled, onChange,
  disableAreaCodes, id, onBlur, errorMessage, hasSearchField,
  onFocus, label, tooltip, theme,
  ...rest
}) => {
  const [hasRef, setRef] = useState(null);
  const [isFocused, setFocus] = useState(false);
  const elRef = createRef();

  useEffect(() => {
    setRef(elRef.current);
  }, [elRef, elRef.current]);
  const error = inputState === 'error';
  return (
    <ErrorWrapper error={error} errorMessage={errorMessage}>
      {label && <label><InputLabel disabled={disabled} focused={isFocused} error={error}>{label}</InputLabel></label>}
      <Container disabled={disabled} error={error}>
        <PhoneInputWrapper
          ref={elRef}
          hasRef={hasRef}
          disabled={disabled}
          inputState={inputState}
        >
          {tooltip && (
          <Tooltip
            size={14}
            color={theme.colors.grey_600}
            style={{ marginRight: '5px' }}
          >{tooltip}
          </Tooltip>
          )}
          <ReactPhoneInput
            disableAreaCodes={disableAreaCodes}
            disabled={disabled}
            defaultCountry={hasSearchField ? null : defaultValue}
            value={value}
            onChange={onChange}
            onBlur={(...e) => { setFocus(false); onFocus(...e); }}
            onFocus={(...e) => { setFocus(true); onFocus(...e); }}
            enableSearchField={hasSearchField}
            disableSearchIcon
            searchPlaceholder="Type country name"
            inputExtraProps={{
              id,
            }}
            {...rest}
          />
        </PhoneInputWrapper>
      </Container>
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
  hasSearchField: PropTypes.bool,
  onFocus: PropTypes.func,
  label: PropTypes.string,
  tooltip: PropTypes.string,
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
  hasSearchField: false,
  onFocus: NoOp,
  label: 'Phone number',
  tooltip: null,
};

export default withTheme(PhoneInputField);
