import React from 'react';
import PropTypes from 'prop-types';

export default function TextInput(props) {
  const {
    onChange, placeholder, value, disabled, name, blur,
  } = props;

  return (
    <input
      name={name || undefined}
      blur={blur || undefined}
      className="default-input"
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      type="text"
    />
  );
}

TextInput.propTypes = {
  name: PropTypes.string,
  blur: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

TextInput.defaultProps = {
  name: undefined,
  blur: undefined,
  onChange: undefined,
  placeholder: 'Input text here...',
  value: '',
  disabled: false,
};
