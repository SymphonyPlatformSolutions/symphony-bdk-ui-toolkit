import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export function DropdownIndicator(props) {
  const { selectProps: { menuIsOpen, isDisabled } } = props;

  return (
    <div className={`dropdown-custom-indicator ${isDisabled ? 'dropdown-custom-indicator--is-disabled' : ''}`}>
      <div className={`dropdown-custom-indicator__icon-container ${menuIsOpen ? 'dropdown-menu-is-open' : ''}`}>
        <i className="fas fa-chevron-down" />
      </div>
    </div>
  );
}
DropdownIndicator.propTypes = {
  selectProps: PropTypes.object.isRequired,
};

export default class DropdownConfig extends React.PureComponent {
  getPlaceholder() {
    const { placeholder } = this.props;

    return (<div><i className="fas fa-search select-icon" /> {placeholder}</div>);
  }

  render() {
    const {
      entry, identifier, onChangeOptions, option, isDisabled,
    } = this.props;
    const chosenOption = entry.find(el => el[identifier] === option);

    return (
      <Select
        value={chosenOption || null}
        options={entry}
        components={{ DropdownIndicator }}
        getOptionValue={el => el[identifier]}
        getOptionLabel={el => el.name}
        isSearchable
        isClearable
        placeholder={this.getPlaceholder()}
        onChange={onChangeOptions}
        className="dropdown-container"
        classNamePrefix="dropdown-config"
        isDisabled={isDisabled}
        blurInputOnSelect // important to allow the dropdown open after a modal is closed
      />
    );
  }
}

DropdownConfig.propTypes = {
  /** Placeholder string. */
  placeholder: PropTypes.string.isRequired,
  /** List of options to be shown as a picklist. Should all have a .name key to use as label. */
  entry: PropTypes.array.isRequired,
  /** Name of the object key that contains the unique identifier (e.g. id). */
  identifier: PropTypes.string.isRequired,
  /** Callback for when a new value is selected. */
  onChangeOptions: PropTypes.func.isRequired,
  /** Current selected option to be wired into React Select. */
  option: PropTypes.string,
  /** Property that signifies if Dropdown is disabled or not. */
  isDisabled: PropTypes.bool,
};

DropdownConfig.defaultProps = {
  option: undefined,
  isDisabled: false,
};
