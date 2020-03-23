import React, { useEffect, useState, useRef } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import Loader from '../../misc/loader';
import Text from '../../misc/text';
import Box from '../../layout/box';
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
  } = props;

  if (loading) {
    return (
      <MenuContainer theme={theme}>
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
      <MenuContainer theme={theme}>
        <Box align="center" justify="center" horizontal>
          <Text style={{ fontStyle: 'italic', paddingTop: '5px' }}>
            {noResultsMessage}
          </Text>
        </Box>
      </MenuContainer>
    );
  }

  return (
    <MenuContainer theme={theme} isLarge={isLarge}>
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

const cleanUpData = (data) => {
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
    hasReset,
    theme,
    data,
    debouncePeriod,
    size,
    placeholder,
    noResultsMessage,
    onChange,
    CustomMenuItem,
    CustomTag,
    disabled,
    clearMessage,
    value,
    loading,
    ...rest
  } = props;

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [lightFocus, setLightFocus] = useState(-1);
  const [cleanData, setCleanData] = useState(cleanUpData(data));

  const inputRef = useRef(null);

  const handleType = (typedValue) => {
    onChange(typedValue);
  };

  useEffect(() => {
    setCleanData(cleanUpData(data));
  }, [data]);

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

  const isMenuOpen = isInputFocused && !!value && !!cleanData?.length;

  return (
    <TextInputWrapper>
      <BorderContainer>
        <InputContainer
          disabled={disabled}
          isMenuOpen={isMenuOpen}
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
          {!!value && value.length > 0 && hasReset && (
            <ClearText onMouseDown={wipeHandler}>{clearMessage}</ClearText>
          )}
        </InputContainer>
        <ShrinkingBorder theme={theme} show={isMenuOpen} error />
      </BorderContainer>
      {isMenuOpen && (
        <Menu
          loading={loading}
          isLarge={size === 'large'}
          CustomMenuItem={CustomMenuItem}
          lightFocus={lightFocus}
          setLightFocus={setLightFocus}
          theme={theme}
          data={cleanData}
          clickHandler={choseItem}
          noResultsMessage={noResultsMessage}
          value={value}
          CustomTag={CustomTag}
        />
      )}
    </TextInputWrapper>
  );
};

Typehead.propTypes = {
  theme: PropTypes.object.isRequired,
  endpoints: PropTypes.array.isRequired,
  itemChooseHandler: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  debouncePeriod: PropTypes.number,
  placeholder: PropTypes.string,
  data: PropTypes.array,
  size: PropTypes.oneOf(['regular', 'large']),
  noResultsMessage: PropTypes.string,
  CustomMenuItem: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  CustomTag: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  disabled: PropTypes.bool,
  value: PropTypes.array,
  clearMessage: PropTypes.string,
  hasReset: PropTypes.bool,
};

Typehead.defaultProps = {
  debouncePeriod: INIT_DEBOUNCE,
  placeholder: 'Type value...',
  size: 'regular',
  data: null,
  clearMessage: 'reset',
  noResultsMessage: 'No results found',
  CustomMenuItem: null,
  CustomTag: null,
  disabled: false,
  value: [],
  hasReset: true,
};

export default withTheme(Typehead);
