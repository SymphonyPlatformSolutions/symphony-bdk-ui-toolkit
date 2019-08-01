import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';
import {
  getBackgroundColor,
  getBorderColor,
  getColor,
  getPadding,
  getPlaceholderColor,
  getWidth,
} from './theme';


const CopyLinkInputWrapper = styled.div`
  position: relative;
`;

const CopyInput = styled.div`
  position: absolute;
  top: 11px;
  right: -12px;
  font-family: 'Lato', sans-serif;
  font-size: .875rem;
  color: ${p => (p.disabled ? colors.grey : colors.blue)}
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
  transition: border 1s cubic-bezier(.25,.8,.25,1);
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
    border-color: ${p => (p.inputState === 'error' ? colors.caution : colors.blue)};
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
  } = props;

  return (
    <div>
      {
        copyInput
          ? (
            <CopyLinkInputWrapper>
              <BaseInputField
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
  inputState: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

InputField.defaultProps = {
  copyInput: false,
  disabled: false,
  inputState: 'INITIAL',
  id: '',
  onChange: undefined,
  onBlur: undefined,
  placeholder: 'Input here...',
  value: '',
};

export default InputField;
