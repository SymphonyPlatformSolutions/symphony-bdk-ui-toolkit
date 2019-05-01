import React from 'react';
import PropTypes from 'prop-types';

export default function RadioButton(props) {
  const {
    id, groupName, checked, onChange, children, disabled,
  } = props;

  return (
    <div className="radio-container">
      <label className={`radio-label ${disabled ? 'radio-label--disabled' : ''}`} htmlFor={id}>
        <input
          disabled={disabled}
          className="radio-input"
          type="radio"
          id={id}
          name={groupName}
          checked={checked}
          onChange={onChange}
        />
        {children}
      </label>
    </div>
  );
}

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  children: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

RadioButton.defaultProps = {
  checked: false,
  children: undefined,
  onChange: undefined,
  disabled: false,
};
