import React, { useRef, useState, forwardRef } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../../misc/text';
import Tooltip from '../../misc/tooltip';
import {
  FloatInput,
  InputLabel,
  InputWrapper,
  StyledInput,
  TextArea,
  ToggleButtonText,
  Container,
} from './theme';
import { EyeIcon, ClosedEyeIcon } from '../../misc/icons';

const INPUT_TYPES = {
  PASSWORD: 'password',
  TEXTAREA: 'textarea',
  COPY: 'copy',
  TEXT: 'text',
  NUMBER: 'number',
};

export const ErrorWrapper = ({ children, error, errorMessage }) => (
  <div>
    {children}
    {error && (
      <Text type="danger" style={{ marginTop: '3px' }} size="small">
        {errorMessage}
      </Text>
    )}
  </div>
);

const InputAddons = (props) => {
  const {
    tooltip,
    disabled,
    showPassword,
    copyToClipBoard,
    setShowPassword,
    type,
    theme,
  } = props;

  const hasPassword = type === INPUT_TYPES.PASSWORD;
  const copyInput = type === INPUT_TYPES.COPY;

  if (!tooltip && !copyInput && !hasPassword) {
    return null;
  }

  return (
    <FloatInput>
      {(copyInput || hasPassword) && (
        <ToggleButtonText
          disabled={disabled}
          onClick={copyInput ? copyToClipBoard : setShowPassword}
        >
          {copyInput ? 'copy' : showPassword ? (<ClosedEyeIcon />) : (<EyeIcon />)}
        </ToggleButtonText>
      )}
      {tooltip && (
        <Tooltip
          size={14}
          color={theme.colors.grey_600}
          style={{ paddingRight: '8px' }}
        >
          {tooltip}
        </Tooltip>
      )}
    </FloatInput>
  );
};

const InputField = forwardRef((props, inputRef) => {
  const ownRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    id,
    label,
    disabled,
    required,
    onChange,
    placeholder,
    value,
    inputState,
    copyInput,
    hasPasswordShow,
    type,
    errorMessage,
    tooltip,
    readOnly,
    size,
    theme,
    ...rest
  } = props;

  function copyToClipBoard() {
    if (inputRef) {
      inputRef.current.select();
    } else {
      ownRef.current.select();
    }
    document.execCommand('copy');
  }

  function renderInputFieldForType(type) {
    return type === INPUT_TYPES.TEXTAREA ?
      <TextArea
        {...rest}
        size={size}
        placeholder={placeholder}
        textArea
        disabled={disabled}
        id={id}
        onChange={onChange}
        value={value}
        ref={inputRef || ownRef}
        rows="2"
        required={required}
      />
    :
      (<>
        <InputAddons
          copyToClipBoard={copyToClipBoard}
          setShowPassword={() => setShowPassword(!showPassword)}
          showPassword={showPassword}
          theme={theme}
          {...props}
        />
        <StyledInput
          {...rest}
          size={size}
          readOnly={readOnly}
          disabled={disabled}
          id={id}
          onChange={readOnly ? null : onChange}
          value={value}
          ref={inputRef || ownRef}
          type={showPassword ? INPUT_TYPES.TEXT : type}
          placeholder={placeholder}
          inputState={inputState}
          required={required}
        />
      </>);
  }
  
  return (
    <ErrorWrapper error={inputState === 'error'} errorMessage={errorMessage}>
      {label && <label><InputLabel size="small">{label}</InputLabel></label>}
      <Container disabled={disabled} error={inputState === 'error'}>
        <InputWrapper>
        {renderInputFieldForType(type)}
        </InputWrapper>
      </Container>
    </ErrorWrapper>
  );
});

InputField.propTypes = {
  copyInput: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  hasPasswordShow: PropTypes.bool,
  id: PropTypes.string,
  inputState: PropTypes.oneOf(['initial', 'modified', 'error']),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  type: PropTypes.oneOf(['password', 'textarea', 'copy', 'text', 'number']),
  readOnly: PropTypes.bool,
  size: PropTypes.oneOf(['regular', 'large']),
};

InputField.defaultProps = {
  copyInput: false,
  disabled: false,
  required: true,
  hasPasswordShow: true,
  inputState: 'initial',
  type: INPUT_TYPES.TEXT,
  id: '',
  onChange: undefined,
  placeholder: 'Input here...',
  errorMessage: 'Something went wrong!',
  value: '',
  label: null,
  tooltip: null,
  readOnly: false,
  size: 'regular',
};

export default withTheme(InputField);
