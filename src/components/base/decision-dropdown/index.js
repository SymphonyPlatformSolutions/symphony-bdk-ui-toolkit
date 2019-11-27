import React, { useState, useEffect, useRef } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import {
  labelize,
} from './helpers';
import {
  DropdownControl,
  DropdownMenu,
} from './components';
import {
  ShrinkingBorder,
  Wrapper,
  MenuWrapper,
} from './theme';

const UP_KEY = 38;
const DOWN_KEY = 40;
const ENTER_KEY = 13;
const ESC_KEY = 27;

/*
TODO:
- Tooltip
- Typehead filtering
*/

const DecisionDropdown = (props) => {
  const {
    data,
    onChange,
    loading,
    disabled,
    placeholder,
    value,
    error,
    clickHandler,
    hasBackButton,
    size,
    isMulti,
    theme,
    ...rest
  } = props;
  const [labeledData, setLabeledData] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const node = useRef();
  const controlRef = useRef();
  const menuRef = useRef();

  useEffect(() => {
    if (disabled && menuIsOpen) {
      setMenuIsOpen(false);
    }
  }, [disabled]);

  useEffect(() => {
    const labelized = labelize(data);
    setLabeledData(labelized);
  }, [data]);

  const chooseHandler = (item) => {
    if (isMulti) {
      if (!value || !value.length) {
        onChange([item]);
      } else {
        const newItemIndex = value.findIndex(x => x.value === item.value);
        if (newItemIndex < 0) {
          onChange([...value, item]);
        } else {
          const newValue = [...value];
          newValue.splice(newItemIndex, 1);
          onChange(newValue);
        }
      }
    } else {
      onChange(item);
      controlRef.current.toggleInputBlur(true);
    }
  };

  const focusBlurHandler = (isFocus) => {
    if (isFocus && !menuIsOpen) {
      if (clickHandler) {
        clickHandler();
      }
      setMenuIsOpen(true);
    } else if (!isFocus && menuIsOpen) {
      setMenuIsOpen(false);
    }
  };

  // References child component, due to parent owning the input
  const specialKeyHandler = ({ keyCode }) => {
    switch (keyCode) {
      case DOWN_KEY:
        return menuRef.current.increaseLightFocus();
      case UP_KEY:
        return menuRef.current.decreaseLightFocus();
      case ENTER_KEY:
        return menuRef.current.enterOption();
      case ESC_KEY:
        return controlRef.current.toggleInputBlur(true);
      default:
        return null;
    }
  };

  return (
    <Wrapper ref={node} {...rest}>
      <div>
        <DropdownControl
          chooseHandler={chooseHandler}
          size={size}
          ref={controlRef}
          error={error}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          menuIsOpen={menuIsOpen}
          isMulti={isMulti}
          clearHandler={() => onChange(null)}
          specialKeyHandler={specialKeyHandler}
          focusBlurHandler={focusBlurHandler}
          theme={theme}
        />
        <MenuWrapper error={error}>
          <ShrinkingBorder show={menuIsOpen} error={error} />
          {menuIsOpen && !disabled && (
            <DropdownMenu
              value={value}
              isMulti={isMulti}
              ref={menuRef}
              chooseHandler={chooseHandler}
              data={labeledData}
              loading={loading}
              hasBackButton={hasBackButton}
              error={error}
            />
          )}
        </MenuWrapper>
      </div>
    </Wrapper>
  );
};

DecisionDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.array,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.bool,
  clickHandler: PropTypes.func,
  hasBackButton: PropTypes.bool,
  isMulti: PropTypes.bool,
  size: PropTypes.oneOf(['regular', 'large']),
};

DecisionDropdown.defaultProps = {
  placeholder: 'Select...',
  hasBackButton: false,
  data: null,
  loading: false,
  disabled: false,
  value: null,
  error: false,
  clickHandler: () => {},
  isMulti: false,
  size: 'regular',
};

export default withTheme(DecisionDropdown);
