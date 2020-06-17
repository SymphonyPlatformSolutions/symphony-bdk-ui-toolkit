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
import { ErrorWrapper } from '../input-field';

const UP_KEY = 38;
const DOWN_KEY = 40;
const ENTER_KEY = 13;
const ESC_KEY = 27;

const DecisionDropdown = (props) => {
  const {
    data,
    onChange,
    loading,
    disabled,
    placeholder,
    value,
    errorMessage,
    clickHandler,
    hasBackButton,
    size,
    isMulti,
    theme,
    tooltip,
    CustomValue,
    hideClear,
    CustomChevron,
    ...rest
  } = props;

  const [labeledData, setLabeledData] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

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
  const specialKeyController = ({ keyCode }) => {
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

  const forceQueryWipe = () => controlRef.current.wipeQuery();

  return (
    <ErrorWrapper error={!!errorMessage} errorMessage={errorMessage}>
      <Wrapper ref={node} {...rest} onClick={() => focusBlurHandler(true)}>
        <div>
          <DropdownControl
            hideClear={hideClear}
            filterQueryHandler={setFilterQuery}
            chooseHandler={chooseHandler}
            size={size}
            ref={controlRef}
            error={!!errorMessage}
            disabled={disabled}
            value={value}
            placeholder={placeholder}
            menuIsOpen={menuIsOpen}
            isMulti={isMulti}
            clearHandler={() => onChange(null)}
            specialKeyController={specialKeyController}
            focusBlurHandler={focusBlurHandler}
            theme={theme}
            tooltip={tooltip}
            CustomValue={CustomValue}
            CustomChevron={CustomChevron}
          />
          <MenuWrapper error={!!errorMessage}>
            <ShrinkingBorder show={menuIsOpen} error={!!errorMessage} />
            {menuIsOpen && !disabled && (
              <DropdownMenu
                filterQuery={filterQuery}
                value={value}
                isMulti={isMulti}
                ref={menuRef}
                chooseHandler={chooseHandler}
                data={labeledData}
                loading={loading}
                hasBackButton={hasBackButton}
                error={!!errorMessage}
                wipeQueryHandler={forceQueryWipe}
              />
            )}
          </MenuWrapper>
        </div>
      </Wrapper>
    </ErrorWrapper>
  );
};

DecisionDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  errorMessage: PropTypes.string,
  clickHandler: PropTypes.func,
  hasBackButton: PropTypes.bool,
  isMulti: PropTypes.bool,
  size: PropTypes.oneOf(['regular', 'large']),
  tooltip: PropTypes.string,
  CustomValue: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  hideClear: PropTypes.bool,
  CustomChevron: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

DecisionDropdown.defaultProps = {
  placeholder: 'Select...',
  hasBackButton: false,
  data: null,
  loading: false,
  disabled: false,
  value: null,
  errorMessage: null,
  clickHandler: () => {},
  isMulti: false,
  size: 'regular',
  tooltip: null,
  CustomValue: null,
  hideClear: false,
  CustomChevron: null,
};

export default withTheme(DecisionDropdown);
