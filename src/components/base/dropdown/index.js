import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import Select from 'react-select';
import Loader from '../loader';
import {
  customStyles,
  DropdownIndicator,
  SingleValue,
  Placeholder,
  Option,
  NoOptionsMessage,
} from './theme';

const LoaderContainer = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  margin: 8px 0;
  overflow: hidden;
`;

const LoaderComponent = () => <LoaderContainer><Loader presetSize="small" type="v2" /></LoaderContainer>;

const Dropdown = (props) => {
  const {
    disabled,
    options,
    onChange,
    value,
    chosenValue,
    noOptionsMessage,
    components,
    theme,
    clickHandler,
    isLoading,
    placeholder,
    ...rest
  } = props;

  let placeValue = null;
  if (value) {
    placeValue = value;
  } else if (chosenValue) {
    if (options) {
      placeValue = options.find(el => chosenValue === el.value);
    }
  }

  const [isFocused, toggleFocus] = useState(false);

  return (
    <div
      onFocus={() => {
        if (!clickHandler) { return; }
        if (!isFocused) {
          toggleFocus(true);
          clickHandler();
        }
      }}
      onBlur={() => {
        if (!clickHandler) { return; }
        toggleFocus(false);
      }}
    >
      <Select
        styles={customStyles(theme)}
        isDisabled={disabled}
        isClearable={false}
        options={options || []}
        onChange={data => onChange(data)}
        components={{
          DropdownIndicator: innerProps => DropdownIndicator({ ...innerProps, theme }),
          SingleValue,
          Placeholder,
          Option,
          NoOptionsMessage: isLoading ? LoaderComponent : NoOptionsMessage,
          ...components,
        }}
        value={placeValue}
        placeholder={isLoading ? 'Loading...' : placeholder}
        {...rest}
        noOptionsMessage={() => (isLoading ? 'Loading...' : 'No options')}
      />
    </div>
  );
};

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.object,
  chosenValue: PropTypes.string,
  noOptionsMessage: PropTypes.string,
  theme: PropTypes.object.isRequired,
  components: PropTypes.object,
  clickHandler: PropTypes.func,
  isLoading: PropTypes.bool,
  placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
  disabled: false,
  options: [],
  onChange: null,
  value: null,
  chosenValue: null,
  noOptionsMessage: undefined,
  components: null,
  placeholder: undefined,
  isLoading: false,
  clickHandler: null,
};

export default withTheme(Dropdown);
