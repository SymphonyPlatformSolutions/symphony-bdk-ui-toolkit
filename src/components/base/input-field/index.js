import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../text';
import {
  getBackgroundColor,
  getBorderColor,
  getColor, getInputColor,
  getInputFocusBorderColor,
  getPadding,
  getPlaceholderColor,
  getWidth,
} from './theme';


const InputWrapper = styled.div`
  position: relative;
`;

export const ErrorWrapper = ({
  children, error, errorMessage,
}) => (
  <div>
    {children}
    {error && <Text type="danger" style={{ marginTop: '5px' }} size="tiny">{errorMessage}</Text>}
  </div>
);

const FloatInput = styled.div`
  position: absolute;
  top: 10px;
  right: 18px;
  font-family: 'Lato', sans-serif;
  font-size: .875rem;
  color: ${props => getInputColor(props)};
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
  pointer-events: ${p => (p.disabled ? 'none' : '')};
`;

const BaseInputField = styled.input`
  font-family: 'Lato', sans-serif;
  font-size: .875rem;
  border-radius: .2rem;
  border: 1px solid ${props => getBorderColor(props)};
  width: ${props => getWidth(props)};
  min-height: 35px;
  padding: ${props => (getPadding(props))} 0 10px;
  cursor: ${p => (p.disabled ? 'inherit' : 'text')};
  transition: all .4s cubic-bezier(.25,.8,.25,1);
  background: ${props => getBackgroundColor(props)};
  color: ${props => getColor(props)};

  &:disabled {
    opacity: .8;
    cursor: not-allowed;
    font-style: italic;
  }
  
  &::placeholder {
    color: ${props => getPlaceholderColor(props)};
  }

  &:focus {
    outline: none;
    border-color: ${props => getInputFocusBorderColor(props)};
  }
`;

const TextArea = BaseInputField.withComponent('textarea');

const InputField = (props) => {
  const inputRef = useRef(null);
  const [showPassord, setShowPassword] = useState(false);

  function copyToClipBoard() {
    inputRef.current.select();
    document.execCommand('copy');
  }

  const {
    id,
    disabled,
    onChange,
    onBlur,
    placeholder,
    value,
    inputState,
    copyInput,
    hasPasswordShow,
    type,
    errorMessage,
    ...rest
  } = props;

  const hasPassword = type === 'password';
  const textArea = type === 'textarea';


  if (copyInput) {
    return (
      <ErrorWrapper error={inputState === 'error'} errorMessage={errorMessage}>
        <InputWrapper>
          <BaseInputField
            {...rest}
            disabled={disabled}
            id={id}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            type={type}
            value={value}
            inputState={inputState}
            ref={inputRef}
            copyInput={copyInput}
          />
          <FloatInput
            disabled={disabled}
            copyInput={copyInput}
            onClick={copyToClipBoard}
          >
          copy
          </FloatInput>
        </InputWrapper>
      </ErrorWrapper>
    );
  }

  if (hasPassword) {
    return (
      <ErrorWrapper error={inputState === 'error'} errorMessage={errorMessage}>
        <InputWrapper>
          <BaseInputField
            {...rest}
            disabled={disabled}
            id={id}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            type={showPassord ? 'text' : type}
            value={value}
            inputState={inputState}
            ref={inputRef}
            copyInput={copyInput}
          />
          {hasPasswordShow && (
          <FloatInput
            disabled={disabled}
            onClick={() => setShowPassword(!showPassord)}
          >
            { showPassord ? 'hide' : 'show' }
          </FloatInput>
          )}
        </InputWrapper>
      </ErrorWrapper>
    );
  }

  if (textArea) {
    return (
      <ErrorWrapper error={inputState === 'error'} errorMessage={errorMessage}>
        <InputWrapper>
          <TextArea
            {...rest}
            textArea
            disabled={disabled}
            id={id}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            type={type}
            value={value}
            inputState={inputState}
            ref={inputRef}
            rows="4"
          />
        </InputWrapper>
      </ErrorWrapper>
    );
  }

  return (
    <ErrorWrapper error={inputState === 'error'} errorMessage={errorMessage}>
      <InputWrapper>
        <BaseInputField
          {...rest}
          disabled={disabled}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          type={type}
          value={value}
          inputState={inputState}
          ref={inputRef}
        />
      </InputWrapper>
    </ErrorWrapper>
  );
};

InputField.propTypes = {
  copyInput: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  hasPasswordShow: PropTypes.bool,
  id: PropTypes.string,
  inputState: PropTypes.oneOf(['initial', 'modified', 'error']),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  errorMessage: PropTypes.string,
};

InputField.defaultProps = {
  copyInput: false,
  disabled: false,
  hasPasswordShow: true,
  inputState: 'initial',
  type: 'text',
  id: '',
  onChange: undefined,
  onBlur: undefined,
  placeholder: 'Input here...',
  errorMessage: 'Something went wrong!',
  value: '',
};

export default InputField;
