import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';

const getWidth = copyInput => (copyInput ? 'calc(100% - 3rem)' : '100%');

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
                placeholder={placeholder}
                type="text"
                value={value}
                inputState={inputState}
                ref={inputRef}
                copyInput={copyInput}
              />
              <CopyInput copyInput={copyInput} onClick={copyToClipBoard}>
                copy
              </CopyInput>
            </CopyLinkInputWrapper>
          )
          : (
            <BaseInputField
              disabled={disabled}
              id={id}
              onChange={onChange}
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
  inputState: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  copyInput: false,
  disabled: false,
  inputState: false,
  id: '',
  placeholder: 'Input here...',
  value: '',
};

export default InputField;

const CopyLinkInputWrapper = styled.div`
  position: relative;
`;

const CopyInput = styled.div`
  position: absolute;
  top: 11px;
  right: -12px;
  font-family: 'Lato', sans-serif;
  font-size: .875rem;
  color: ${props => (props.disabled ? colors.grey : colors.blue)}
  cursor: pointer;
`;

const BaseInputField = styled.input`
  font-family: 'Lato', sans-serif;
  font-size: .875rem;
  border-radius: .2rem;
  border: 1px solid ${props => (props.inputState ? colors.caution : colors.lightgrey)};
  width: ${props => getWidth(props.copyInput)};
  padding: .6rem ${props => (props.copyInput ? '3.75rem' : '.75rem')} .6rem .75rem;
  cursor: ${props => (props.disabled ? 'default' : 'text')};

  &:disabled {
    color: ${colors.darkgrey}
    background-color: ${colors.lightgrey}
  }
  
  &::placeholder {
    color: ${colors.grey};
  }

  &:focus {
    outline: none;
    border-color: ${props => (props.inputState ? 'none' : colors.blue)};
  }
`;
