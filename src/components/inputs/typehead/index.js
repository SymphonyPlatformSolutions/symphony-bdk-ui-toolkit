import React, { useEffect, useState, useRef } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import Loader from '../../misc/loader';
import Text from '../../misc/text';
import Box from '../../layout/box';
import { DownChevron } from '../../misc/icons';
import {
  StyledTextInput,
  TextInputWrapper,
  MenuContainer,
  MenuItem,
  InputContainer,
  ShrinkingBorder,
  BorderContainer,
  FloatWrapper,
  LoaderWrapper,
  ClearText,
  ChevronContainer,
  ChevronWrapper,
} from './theme';
import { ErrorWrapper } from '../input-field';

const INIT_DEBOUNCE = 500;
const UP_KEY = 38;
const DOWN_KEY = 40;
const ENTER_KEY = 13;
const ESC_KEY = 27;

export const simpleFilter = (data, value) => {
  if (!data || !value) {
    return null;
  }
  const lowercaseValue = value.toLowerCase();
  return data.filter(el => el.toLowerCase().includes(lowercaseValue));
};

const Menu = props => {
  const {
    data,
    clickHandler,
    theme,
    noResultsMessage,
    lightFocus,
    setLightFocus,
    CustomMenuItem,
    value,
    isLarge,
    loading,
    error,
  } = props;

  if (loading) {
    return (
      <MenuContainer theme={theme} error={error}>
        <Box align="center" justify="center" horizontal>
          <Text style={{ fontStyle: 'italic', paddingTop: '5px' }}>
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          </Text>
        </Box>
      </MenuContainer>
    );
  }

  if (!data.length) {
    return (
      <MenuContainer theme={theme} error={error}>
        <Box align="center" justify="center" horizontal>
          <Text style={{ fontStyle: 'italic', paddingTop: '5px' }}>
            {noResultsMessage}
          </Text>
        </Box>
      </MenuContainer>
    );
  }

  return (
    <MenuContainer theme={theme} isLarge={isLarge} error={error}>
      <FloatWrapper>
        {data.map((el, index) => (
          <MenuItem
            theme={theme}
            key={el.uid}
            onMouseDown={e => {
              e.preventDefault();
              clickHandler(el);
            }}
            onMouseEnter={() => setLightFocus(index)}
            lightFocused={index === lightFocus}
          >
            {CustomMenuItem ? (
              <CustomMenuItem element={el} elementIndex={index} value={value} />
            ) : (
              <Text>{el.label}</Text>
            )}
          </MenuItem>
        ))}
      </FloatWrapper>
    </MenuContainer>
  );
};

const cleanUpData = data => {
  if (data) {
    return data.map(el => ({
      uid: uuid.v4(),
      label: el,
    }));
  }
  return null;
};

const Typehead = props => {
  const {
    hideClear,
    theme,
    data,
    debouncePeriod,
    size,
    placeholder,
    noResultsMessage,
    CustomMenuItem,
    CustomTag,
    disabled,
    clearMessage,
    value,
    onChange,
    loading,
    errorMessage,
    helpDebouncePeriod,
    hideChevron,
    CustomChevron,
    ...rest
  } = props;

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [lightFocus, setLightFocus] = useState(-1);
  const [cleanData, setCleanData] = useState(cleanUpData(data));
  const [shouldMenuOpen, setShouldMenuOpen] = useState(false);

  const inputRef = useRef(null);

  const handleType = typedValue => {
    onChange(typedValue);
  };

  useEffect(() => {
    setCleanData(cleanUpData(data));
  }, [data]);

  useEffect(() => {
    if (helpDebouncePeriod) {
      if (isInputFocused) {
        setShouldMenuOpen(false);
        const handler = setTimeout(() => {
          setShouldMenuOpen(true);
        }, helpDebouncePeriod);
        return () => clearTimeout(handler);
      }

      if (!isInputFocused && shouldMenuOpen) {
        setShouldMenuOpen(false);
      }
    }
    return undefined;
  }, [isInputFocused, value]);

  const choseItem = item => {
    setLightFocus(-1);
    onChange(item.label);
    inputRef.current.blur();
  };

  const wipeHandler = () => {
    setLightFocus(-1);
    onChange('');
    inputRef.current.blur();
  };

  const specialKeyHandler = ({ keyCode }) => {
    switch (keyCode) {
      case DOWN_KEY:
        return setLightFocus((lightFocus + 1) % cleanData.length);
      case UP_KEY:
        return setLightFocus(
          lightFocus - 1 < 0 ? cleanData.length - 1 : lightFocus - 1,
        );
      case ESC_KEY:
        return inputRef.current.blur();
      case ENTER_KEY:
        if (lightFocus < 0) {
          return null;
        }
        return choseItem(cleanData[lightFocus]);
      default:
        return null;
    }
  };

  const menuIsOpen = (shouldMenuOpen || !helpDebouncePeriod)
    && isInputFocused
    && !!value
    && !!cleanData
    && !!cleanData.length;

  const blurInput = () => inputRef.current.blur();
  const focusInput = () => inputRef.current.focus();

  const renderChevron = () => {
    if (hideChevron) {
      return null;
    }

    if (CustomChevron) {
      return (
        <CustomChevron
          blurInput={blurInput}
          focusInput={focusInput}
          disabled={disabled}
          menuIsOpen={menuIsOpen}
        />
      );
    }
    return (
      <ChevronWrapper
        disabled={disabled}
        onMouseDown={e => {
          e.preventDefault();
          if (menuIsOpen) {
            blurInput();
          } else {
            focusInput();
          }
        }}
        turn={menuIsOpen}
      >
        <DownChevron
          color={disabled ? theme.colors.grey_300 : theme.colors.grey_600}
        />
      </ChevronWrapper>
    );
  };

  return (
    <ErrorWrapper error={!!errorMessage} errorMessage={errorMessage}>
      <TextInputWrapper>
        <BorderContainer>
          <InputContainer
            disabled={disabled}
            menuIsOpen={menuIsOpen}
            error={!!errorMessage}
            onClick={() => inputRef.current.focus()}
          >
            <Box type="flat" style={{ width: '100%' }} horizontal>
              <StyledTextInput
                {...rest}
                disabled={disabled}
                ref={inputRef}
                onKeyDown={specialKeyHandler}
                size={size}
                value={value}
                onChange={({ target }) => {
                  handleType(target.value);
                }}
                onFocus={() => {
                  setLightFocus(-1);
                  setIsInputFocused(true);
                }}
                onBlur={() => {
                  setLightFocus(-1);
                  setIsInputFocused(false);
                }}
                placeholder={placeholder}
              />
            </Box>
            <ChevronContainer>
              {!!value && value.length > 0 && !hideClear && (
                <ClearText onMouseDown={wipeHandler}>{clearMessage}</ClearText>
              )}
              {renderChevron()}
            </ChevronContainer>
          </InputContainer>
          <ShrinkingBorder
            theme={theme}
            show={menuIsOpen}
            error={!!errorMessage}
          />
        </BorderContainer>
        {menuIsOpen && (
          <Menu
            loading={loading}
            isLarge={size === 'large'}
            CustomMenuItem={CustomMenuItem}
            lightFocus={lightFocus}
            setLightFocus={setLightFocus}
            theme={theme}
            error={!!errorMessage}
            data={cleanData}
            clickHandler={choseItem}
            noResultsMessage={noResultsMessage}
            value={value}
            CustomTag={CustomTag}
          />
        )}
      </TextInputWrapper>
    </ErrorWrapper>
  );
};

Typehead.propTypes = {
  theme: PropTypes.object.isRequired,
  debouncePeriod: PropTypes.number,
  placeholder: PropTypes.string,
  data: PropTypes.array,
  size: PropTypes.oneOf(['regular', 'large']),
  noResultsMessage: PropTypes.string,
  CustomMenuItem: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  CustomTag: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  disabled: PropTypes.bool,
  value: PropTypes.string,
  clearMessage: PropTypes.string,
  hideClear: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errorMessage: PropTypes.string,
  helpDebouncePeriod: PropTypes.number,
  hideChevron: PropTypes.bool,
  CustomChevron: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Typehead.defaultProps = {
  debouncePeriod: INIT_DEBOUNCE,
  placeholder: 'Type value...',
  size: 'regular',
  data: null,
  clearMessage: 'clear',
  noResultsMessage: 'No results found',
  CustomMenuItem: null,
  CustomTag: null,
  disabled: false,
  value: [],
  hideClear: false,
  hideChevron: false,
  loading: false,
  errorMessage: null,
  helpDebouncePeriod: 1000,
  CustomChevron: null,
};

export default withTheme(Typehead);
