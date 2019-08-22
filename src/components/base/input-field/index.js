import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  getBackgroundColor,
  getBorderColor,
  getColor, getInputColor,
  getInputFocusBorderColor,
  getPadding,
  getPlaceholderColor,
  getWidth,
} from './theme';


const CopyLinkInputWrapper = styled.div`
  position: relative;
`;

const CopyInput = styled.div`
  position: absolute;
  top: 10px;
  right: 18px;
  font-family: 'Lato', sans-serif;
  font-size: .875rem;
  color: ${props => getInputColor(props)}
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
  pointer-events: ${p => (p.disabled ? 'none' : '')}
`;

const BaseInputField = styled.input`
  font-family: 'Lato', sans-serif;
  font-size: .875rem;
  border-radius: .2rem;
  border: 1px solid ${props => getBorderColor(props)};
  width: ${props => getWidth(props)};
  padding: .6rem ${props => (getPadding(props))} .6rem .75rem;
  cursor: ${p => (p.disabled ? 'inherit' : 'text')};
  transition: border .4s cubic-bezier(.25,.8,.25,1);
  background: ${props => getBackgroundColor(props)};
  color: ${props => getColor(props)};
  &:disabled {
    opacity: .8;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${props => getPlaceholderColor(props)};
  }

  &:focus {
    outline: none;
    border-color: ${props => getInputFocusBorderColor(props)};
  }
`;

const InputField = (props) => {
  const inputRef = useRef(null);

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
    ...rest
  } = props;

  return (
    <div>
      {
        copyInput
          ? (
            <CopyLinkInputWrapper>
              <BaseInputField
                {...rest}
                disabled={disabled}
                id={id}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                type="text"
                value={value}
                inputState={inputState}
                ref={inputRef}
                copyInput={copyInput}
              />
              <CopyInput
                disabled={disabled}
                copyInput={copyInput}
                onClick={copyToClipBoard}
              >
                copy
              </CopyInput>
            </CopyLinkInputWrapper>
          )
          : (
            <BaseInputField
              {...rest}
              disabled={disabled}
              id={id}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              type="text"
              value={value}
              inputState={inputState}
              ref={inputRef}
            />
          )
      }
    </div>
  );
};

InputField.propTypes = {
  copyInput: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  inputState: PropTypes.oneOf(['initial', 'modified', 'error']),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

InputField.defaultProps = {
  copyInput: false,
  disabled: false,
  inputState: 'initial',
  id: '',
  onChange: undefined,
  onBlur: undefined,
  placeholder: 'Input here...',
  value: '',
};

export default InputField;
