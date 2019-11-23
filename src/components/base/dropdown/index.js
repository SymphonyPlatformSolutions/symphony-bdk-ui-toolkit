import React, { useState, useEffect, useRef } from 'react';
import { withTheme } from 'styled-components';
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
  InvisibleInput,
  MenuWrapper,
} from './theme';

const UP_KEY = 38;
const DOWN_KEY = 40;
const ENTER_KEY = 13;
const ESC_KEY = 27;

const Dropdown = (props) => {
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
    ...rest
  } = props;
  const [labeledData, setLabeledData] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const node = useRef();
  const controlNode = useRef();
  const inputRef = useRef();
  const menuRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled) {
      if (controlNode.current.contains(e.target)) {
        if (!menuIsOpen) {
          inputRef.current.focus();
          if (clickHandler) {
            clickHandler();
          }
        } else {
          inputRef.current.blur();
        }
      } else if (menuIsOpen && !node.current.contains(e.target)) {
        inputRef.current.blur();
      }
    }
  };

  useEffect(() => {
    if (disabled && menuIsOpen) {
      setMenuIsOpen(false);
    }
  }, [disabled]);

  useEffect(() => {
    const labelized = labelize(data);
    setLabeledData(labelized);
  }, [data]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

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
      inputRef.current.blur();
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
        return inputRef.current.blur();
      default:
        return null;
    }
  };

  return (
    <Wrapper ref={node} {...rest}>
      <InvisibleInput
        onKeyDown={specialKeyHandler}
        ref={inputRef}
        onFocus={() => focusBlurHandler(true)}
        onBlur={() => focusBlurHandler(false)}
        disabled={disabled}
      />
      <div>
        <DropdownControl
          chooseHandler={chooseHandler}
          size={size}
          ref={controlNode}
          error={error}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          menuIsOpen={menuIsOpen}
          isMulti={isMulti}
          clearHandler={() => onChange(null)}
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
            />
          )}
        </MenuWrapper>
      </div>
    </Wrapper>
  );
};

Dropdown.defaultProps = {
  placeholder: 'Select...',
  hasBackButton: false,
};

export default withTheme(Dropdown);
