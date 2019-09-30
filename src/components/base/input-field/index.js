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
  getLineColor,
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
  right: 3px;
  font-size: .875rem;
  color: ${props => getInputColor(props)};
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
  pointer-events: ${p => (p.disabled ? 'none' : '')};
  z-index: 3;
`;

const OtherInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const InputInput = styled.input`
  padding: 6px 4px;
  border: 0;
  outline: none;
  font-size: 16px;
  transition: all 0.3s;
  width: 100%;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textcolor};
  resize: vertical;
  font-family: "SymphonyLato", "Lato", "Segoe UI", "Helvetica Neue", "Verdana", "Arial", sans-serif !important;
  z-index: 2;
  position: relative;

  ::placeholder {
    transition: all 0.3s;
  }

  &:not(:focus)::placeholder { 
    color: transparent;
  }
`;

const NewTextArea = InputInput.withComponent('textarea');

const InputLine = styled.span`
  width: 100%;
  position: relative;
  display: block;

  &:before {
    content:'';
    height: 1px;
    width: 100%;
    bottom: 0;
    position: absolute;
    border-bottom: 1px ${({ disabled }) => (disabled ? 'dotted' : 'solid')} ${props => getLineColor(props)};
  }

  ${InputInput}:hover:not(:disabled) ~ &:before {
    border-bottom: 2px solid ${props => getLineColor(props)};
  }

  &:after {
    content: '';
    height: 2px;
    width: ${({ error }) => (error ? '100%' : 0)};
    bottom: 0;
    position: absolute;
    background: ${({ error, theme }) => (error ? theme.colors.danger : theme.colors.primary)};
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
  }

  ${InputInput}:focus ~ &:after, ${NewTextArea}:focus ~ &:after {
    width: 100%;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  left: 4px;
  font-size: 16px;
  transition: all 0.2s;
  top: 5px;
  color: ${props => getPlaceholderColor(props)};
  font-style: ${({ disabled }) => (disabled ? 'italic' : 'none')};
  ${InputInput}:focus + &, ${InputInput}:valid + &,
  ${NewTextArea}:focus + &, ${NewTextArea}:valid + & {
    color: ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.primary)};
    top: -13px;
    font-size: 12px;
  }
  z-index: 1;
`;


const InputField = (props) => {
  const inputRef = useRef(null);
  const [showPassord, setShowPassword] = useState(false);

  function copyToClipBoard() {
    inputRef.current.select();
    document.execCommand('copy');
  }

  const {
    id,
    label,
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
          <OtherInputWrapper>
            <InputInput
              {...rest}
              placeholder={placeholder}
              disabled={disabled}
              id={id}
              onChange={onChange}
              onBlur={onBlur}
              type={type}
              value={value}
              inputState={inputState}
              ref={inputRef}
              copyInput={copyInput}
              required
            />
            <InputLabel error={inputState === 'error'}>{label}</InputLabel>
            <InputLine error={inputState === 'error'} disabled={disabled} />
            <FloatInput
              disabled={disabled}
              copyInput={copyInput}
              onClick={copyToClipBoard}
            >
            copy
            </FloatInput>
          </OtherInputWrapper>
        </InputWrapper>
      </ErrorWrapper>
    );
  }

  if (hasPassword) {
    return (
      <ErrorWrapper error={inputState === 'error'} errorMessage={errorMessage}>
        <InputWrapper>
          <OtherInputWrapper>
            <InputInput
              {...rest}
              placeholder={placeholder}
              disabled={disabled}
              id={id}
              onChange={onChange}
              onBlur={onBlur}
              type={showPassord ? 'text' : type}
              value={value}
              inputState={inputState}
              ref={inputRef}
              copyInput={copyInput}
              required
            />
            <InputLabel error={inputState === 'error'}>{label}</InputLabel>
            <InputLine error={inputState === 'error'} disabled={disabled} />
            {hasPasswordShow && (
            <FloatInput
              disabled={disabled}
              onClick={() => setShowPassword(!showPassord)}
            >
              { showPassord ? 'hide' : 'show' }
            </FloatInput>
            )}
          </OtherInputWrapper>
        </InputWrapper>
      </ErrorWrapper>
    );
  }

  if (textArea) {
    return (
      <ErrorWrapper error={inputState === 'error'} errorMessage={errorMessage}>
        <OtherInputWrapper>
          <NewTextArea
            {...rest}
            placeholder={placeholder}
            textArea
            disabled={disabled}
            id={id}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={inputRef}
            rows="2"
            required
          />
          <InputLabel error={inputState === 'error'} disabled={disabled}>{label}</InputLabel>
          <InputLine disabled={disabled} error={inputState === 'error'} />
        </OtherInputWrapper>
      </ErrorWrapper>
    );
  }

  return (
    <ErrorWrapper error={inputState === 'error'} errorMessage={errorMessage}>
      <OtherInputWrapper>
        <InputInput
          {...rest}
          disabled={disabled}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          required
        />
        <InputLabel error={inputState === 'error'} disabled={disabled}>{label}</InputLabel>
        <InputLine error={inputState === 'error'} disabled={disabled} />
      </OtherInputWrapper>
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
  label: '',
};

export default InputField;
