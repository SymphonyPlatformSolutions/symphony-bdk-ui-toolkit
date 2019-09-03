import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Select from 'react-select';
import {
  customStyles,
  DropdownIndicator,
  SingleValue,
  Placeholder,
  Option,
  NoOptionsMessage,
} from './theme';

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

  return (
    <Select
      styles={customStyles(theme)}
      isDisabled={disabled}
      isClearable={false}
      options={options}
      onChange={data => onChange(data)}
      components={{
        DropdownIndicator: innerProps => DropdownIndicator({ ...innerProps, theme }),
        SingleValue,
        Placeholder,
        Option,
        NoOptionsMessage,
        ...components,
      }}
      value={placeValue}
      {...rest}
    />
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
};

Dropdown.defaultProps = {
  disabled: false,
  options: [],
  onChange: null,
  value: null,
  chosenValue: null,
  noOptionsMessage: 'No options',
  components: null,
};

export default withTheme(Dropdown);
