import React from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends React.PureComponent {
  render() {
    const {
      children, onChange, isChecked, disabled,
    } = this.props;

    return (
      <div key={children}>
        <label
          key={`label_${children}`}
          htmlFor={`checkbox-${children}`}
          className={`checkbox-label ${disabled ? 'checkbox-label--disabled' : ''}`}
        >
          <input
            disabled={disabled}
            key={`checkbox_${children}`}
            id={`checkbox-${children}`}
            className="checkbox__input"
            onChange={onChange}
            type="checkbox"
            checked={isChecked}
          />
          {children}
          <span className="checkbox__checkmark" />
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  onChange: undefined,
  isChecked: false,
  disabled: false,
};
