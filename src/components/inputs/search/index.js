import React, { useEffect, useState, useRef } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../../misc/text';
import Box from '../../layout/box';

import {
  StyledSearch,
  SearchWrapper,
  MenuContainer,
  MenuItem,
  SearchContainer,
  ShrinkingBorder,
  BorderContainer,
  SearchIconWrapper,
  FloatWrapper,
  SearchInputWrapper,
} from './theme';
import { MultiValueList, MultiSelectTick } from './components';
import { SearchIcon } from '../../misc/icons';
import { KEYCODES } from '../../utils/index';

const INIT_DEBOUNCE = 500;

const chooseItem = (item, isMulti, value, isStack) => {
  if (!isMulti) {
    return item;
  }
  if (!value) {
    return [item];
  }
  const chosenIndex = value.findIndex((l) => l.value === item.value);

  if (chosenIndex >= 0) {
    if (isStack && chosenIndex !== value.length - 1) {
      return value;
    }
    return value.filter((l) => l.value !== item.value);
  }

  return [...value, item];
};

const Menu = (props) => {
  const {
    data,
    dataLabel,
    clickHandler,
    theme,
    noResultsMessage,
    lightFocus,
    setLightFocus,
    CustomMenuItem,
    typedTerm,
    isLarge,
    isMulti,
    value,
  } = props;

  const hasValues = !!(isMulti && value && value.length);

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
            key={el[dataLabel]}
            onMouseDown={(e) => {
              e.preventDefault();
              clickHandler(el);
            }}
            onMouseEnter={() => setLightFocus(index)}
            lightFocused={index === lightFocus}
          >
            {CustomMenuItem ? (
              <CustomMenuItem item={el} typedTerm={typedTerm} />
            ) : (
              <Text>{el[dataLabel]}</Text>
            )}
            {hasValues && !!value.find((vEl) => vEl.value === el.value) && (
              <MultiSelectTick />
            )}
          </MenuItem>
        ))}
      </FloatWrapper>
    </MenuContainer>
  );
};

const Search = (props) => {
  const {
    theme,
    data,
    searchHandler,
    resultHandler,
    debouncePeriod,
    size,
    dataLabel,
    placeholder,
    noResultsMessage,
    itemChooseHandler,
    CustomMenuItem,
    disabled,
    isMulti,
    value,
    isStack,
    ...rest
  } = props;

  const [typedTerm, setTypedTerm] = useState('');
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [memo, setMemo] = useState({});
  const [lightFocus, setLightFocus] = useState(-1);
  const inputRef = useRef(null);

  const executeSearch = () => {
    if (memo[typedTerm]) {
      resultHandler(memo[typedTerm]);
      return;
    }
    searchHandler(typedTerm);
  };

  // Memoize search results
  useEffect(() => {
    if (typedTerm && !memo[typedTerm]) {
      setMemo({
        ...memo,
        [typedTerm]: data,
      });
    }
  }, [data]);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      executeSearch();
    }, debouncePeriod);
    return () => clearTimeout(handler);
  }, [typedTerm]);

  const choseItem = (item) => {
    itemChooseHandler(chooseItem(item, isMulti, value, isStack));
    if (!isMulti) {
      setTypedTerm(item[dataLabel]);
      inputRef.current.blur();
    }
  };

  const removeHandler = (removeValue) => {
    itemChooseHandler(value.filter((l) => l.value !== removeValue));
  };

  const specialKeyHandler = ({ keyCode }) => {
    switch (keyCode) {
      case KEYCODES.DOWN:
        return setLightFocus((lightFocus + 1) % data.length);
      case KEYCODES.UP:
        return setLightFocus(
          lightFocus - 1 < 0 ? data.length - 1 : lightFocus - 1
        );
      case KEYCODES.ESC:
        return inputRef.current.blur();
      case KEYCODES.BACKSPACE:
        if (!typedTerm && value && value.length) {
          return choseItem(value[value.length - 1]);
        }
        return null;
      case KEYCODES.ENTER:
        return choseItem(data[lightFocus]);
      default:
        return null;
    }
  };

  const hideInput = isMulti && value && value.length && !isMenuOpen;

  return (
    <SearchWrapper>
      <BorderContainer>
        <SearchContainer
          disabled={disabled}
          onClick={() => hideInput && inputRef.current.focus()}
        >
          {isMulti && (
            <MultiValueList
              isStack={isStack}
              value={value}
              removeHandler={removeHandler}
            />
          )}
          <SearchInputWrapper hide={hideInput}>
            <SearchIconWrapper isLarge={size === 'large'}>
              <SearchIcon size={size === 'large' ? 18 : 14} />
            </SearchIconWrapper>
            <StyledSearch
              {...rest}
              disabled={disabled}
              ref={inputRef}
              onKeyDown={specialKeyHandler}
              size={size}
              value={typedTerm}
              onChange={({ target }) => setTypedTerm(target.value)}
              onFocus={() => {
                setLightFocus(-1);
                setisMenuOpen(true);
              }}
              onBlur={() => {
                setLightFocus(-1);
                setisMenuOpen(false);
              }}
              placeholder={placeholder}
            />
          </SearchInputWrapper>
        </SearchContainer>
        <ShrinkingBorder theme={theme} show={isMenuOpen} />
      </BorderContainer>
      {isMenuOpen && (
        <Menu
          isStack={isStack}
          isMulti={isMulti}
          isLarge={size === 'large'}
          typedTerm={typedTerm}
          CustomMenuItem={CustomMenuItem}
          lightFocus={lightFocus}
          setLightFocus={setLightFocus}
          theme={theme}
          data={data}
          clickHandler={choseItem}
          dataLabel={dataLabel}
          noResultsMessage={noResultsMessage}
          value={value}
        />
      )}
    </SearchWrapper>
  );
};

Menu.propTypes = {
  data: PropTypes.array,
  dataLabel: PropTypes.string.isRequired,
  itemChooseHandler: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  noResultsMessage: PropTypes.string.isRequired,
  CustomMenuItem: PropTypes.node,
};
Menu.defaultProps = {
  data: [],
  CustomMenuItem: null,
};

Search.propTypes = {
  theme: PropTypes.object.isRequired,
  data: PropTypes.array,
  searchHandler: PropTypes.func.isRequired,
  resultHandler: PropTypes.func.isRequired,
  debouncePeriod: PropTypes.number,
  size: PropTypes.oneOf(['regular', 'large']),
  dataLabel: PropTypes.string,
  placeholder: PropTypes.string,
  noResultsMessage: PropTypes.string,
  itemChooseHandler: PropTypes.func.isRequired,
  CustomMenuItem: PropTypes.node,
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  isStack: PropTypes.bool,
};
Search.defaultProps = {
  debouncePeriod: INIT_DEBOUNCE,
  dataLabel: 'label',
  placeholder: 'Search...',
  noResultsMessage: 'No results',
  data: [],
  size: 'regular',
  CustomMenuItem: null,
  disabled: false,
  isMulti: false,
  isStack: false,
};

export default withTheme(Search);
