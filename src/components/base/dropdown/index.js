import React from 'react';
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
  Control,
} from './theme';
import { ErrorWrapper } from '../input-field';

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
    error,
    errorMessage,
    label,
    tooltip,
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
    <div>
      <ErrorWrapper error={error} errorMessage={errorMessage}>
        <Select
          styles={customStyles({ theme, error })}
          isDisabled={disabled}
          isClearable={false}
          options={options || []}
          onMenuOpen={clickHandler}
          onChange={data => onChange(data)}
          components={{
            DropdownIndicator: innerProps => DropdownIndicator({ ...innerProps, tooltip, theme }),
            SingleValue,
            Placeholder,
            Option,
            Control: innerProps => Control({
              ...innerProps, error, label, innerTheme: theme,
            }),
            NoOptionsMessage: isLoading ? LoaderComponent : NoOptionsMessage,
            ...components,
          }}
          value={placeValue}
          placeholder={isLoading ? 'Loading...' : placeholder}
          {...rest}
          noOptionsMessage={() => (isLoading ? 'Loading...' : 'No options')}
        />
      </ErrorWrapper>
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
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
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
  error: false,
  errorMessage: 'Something went wrong!',
  label: 'Dropdown input',
  tooltip: null,
};

export default withTheme(Dropdown);
