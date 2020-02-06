import React, { useState, useRef, useEffect } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import {
  ControlInput,
  TagBarContainer,
  ValueContainer,
  MultiSelectContainer,
  MultiSelectText,
  MultiValueContainer,
  IconMarginContainer,
  TooltipMargin,
  ValueAndControl,
  MenuWrapper,
  ShrinkingBorder,
  Binder,
  IconsContainer,
} from './theme';
import { CrossIcon, CloseIcon } from '../../misc/icons';
import Tooltip from '../../misc/tooltip';
import { ErrorWrapper } from '../input-field';
import TagBarMenu from './components';

const BS_KEY = 8;
const ENTER_KEY = 13;
const ESC_KEY = 27;
const UP_KEY = 38;
const DOWN_KEY = 40;

const INIT_DEBOUNCE = 1500;

const MultiSelectValue = ({ children, removeHandler }) => (
  <MultiSelectContainer
    onMouseDown={e => {
      e.preventDefault();
      removeHandler();
    }}
  >
    <MultiSelectText size="tiny">{children}</MultiSelectText>
    <CloseIcon size={8} />
  </MultiSelectContainer>
);

const MultiValueList = props => {
  const {
    value, removeHandler, size, CustomValue,
  } = props;

  if (!value || !value.length) {
    return null;
  }

  return (
    <ValueContainer size={size}>
      <MultiValueContainer>
        {value.map(l => (CustomValue ? (
          <CustomValue
            removeHandler={() => removeHandler(l)}
            key={l.value}
            value={l}
          />
        ) : (
          <MultiSelectValue
            removeHandler={() => removeHandler(l)}
            key={l.value}
          >
            {l.value}
          </MultiSelectValue>
        )))}
      </MultiValueContainer>
    </ValueContainer>
  );
};

const TagBar = props => {
  const {
    placeholder,
    value,
    disabled,
    size,
    onChoose,
    onRemove,
    onClear,
    theme,
    tooltip,
    CustomValue,
    errorMessage,
    autocompleteList,
    debouncePeriod,
    ...rest
  } = props;

  const [typedValue, setTypedValue] = useState('');
  const [hideInput, setHideInput] = useState(true);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [currQuery, setCurrQuery] = useState(null);
  const [uidAutocompleteList] = useState(
    autocompleteList
      ? autocompleteList.map(el => ({ value: el, uid: uuid.v4() }))
      : null,
  );
  const inputRef = useRef();
  const menuRef = useRef();

  const hasValue = !!(value && value.length);
  const hasError = !!errorMessage;
  const hasAutoList = autocompleteList && autocompleteList.length;

  useEffect(() => {
    if (value) {
      setTypedValue(value.label);
    } else {
      setTypedValue('');
    }
  }, [value]);

  const chooseValue = (newValue) => {
    onChoose(newValue);
    setTypedValue('');
    setMenuIsOpen(false);
  };

  const backSpaceHandler = () => {
    if (!typedValue && value && value.length) {
      onRemove(value[value.length - 1]);
    }
  };

  const specialKeyController = ({ keyCode }) => {
    let lightFocusValue;
    switch (keyCode) {
      case DOWN_KEY:
        return menuRef.current.increaseLightFocus();
      case UP_KEY:
        return menuRef.current.decreaseLightFocus();
      case ENTER_KEY:
        if (menuIsOpen && hasAutoList) {
          lightFocusValue = menuRef.current.getCurrentOption();
          if (lightFocusValue) {
            chooseValue(lightFocusValue);
          }
        } else if (typedValue) {
          chooseValue(typedValue);
        }
        break;
      case ESC_KEY:
        inputRef.current.blur();
        break;
      case BS_KEY:
        backSpaceHandler();
        break;
      default:
        return null;
    }
    return null;
  };

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrQuery(typedValue);
      if (hasAutoList) {
        setMenuIsOpen(!!typedValue);
      }
    }, debouncePeriod);
    return () => clearTimeout(handler);
  }, [typedValue]);


  return (
    <ErrorWrapper error={hasError} errorMessage={errorMessage}>
      <TagBarContainer disabled={disabled} error={hasError} menuIsOpen={menuIsOpen} {...rest}>
        <Binder>
          <ValueAndControl
            onClick={() => {
              inputRef.current.focus();
            }}
            size={size}
          >
            <MultiValueList
              CustomValue={CustomValue}
              removeHandler={onRemove}
              value={value}
              size={size}
            />
            <div style={{ width: 'auto', display: 'flex' }}>
              <ControlInput
                hide={hideInput && hasValue}
                onKeyDown={specialKeyController}
                ref={inputRef}
                placeholder={placeholder}
                value={typedValue}
                onChange={({ target }) => {
                  setTypedValue(target.value);
                }}
                onFocus={() => setHideInput(false)}
                onBlur={() => {
                  setTypedValue('');
                  setMenuIsOpen(false);
                  setHideInput(true);
                }}
                disabled={disabled}
                size={size}
              />
              <IconsContainer>
                {hasValue && (
                <IconMarginContainer onMouseDown={onClear}>
                  <CrossIcon />
                </IconMarginContainer>
                )}
                {tooltip && (
                <TooltipMargin>
                  <Tooltip size={14} color={theme.colors.grey_600}>
                    {tooltip}
                  </Tooltip>
                </TooltipMargin>
                )}
              </IconsContainer>
            </div>
          </ValueAndControl>
          <MenuWrapper error={!!errorMessage}>
            <ShrinkingBorder show={menuIsOpen} error={!!errorMessage} />
            {menuIsOpen && hasAutoList && (
            <TagBarMenu
              ref={menuRef}
              data={uidAutocompleteList}
              currQuery={currQuery}
              value={value}
              chooseHandler={chooseValue}
            />
            )}
          </MenuWrapper>
        </Binder>
      </TagBarContainer>
    </ErrorWrapper>
  );
};

TagBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.array,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['regular', 'large']),
  onChoose: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  onClear: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  tooltip: PropTypes.string,
  CustomValue: PropTypes.node,
  errorMessage: PropTypes.string,
  debouncePeriod: PropTypes.number,
  autocompleteList: PropTypes.array,
};
TagBar.defaultProps = {
  placeholder: 'Input here...',
  value: [],
  disabled: false,
  size: 'regular',
  onRemove: null,
  tooltip: null,
  CustomValue: null,
  errorMessage: null,
  debouncePeriod: INIT_DEBOUNCE,
  autocompleteList: null,
};

export default withTheme(TagBar);
