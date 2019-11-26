import React, { useEffect, useState, useRef } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import SearchIcon from './search-icons';
import Text from '../text';
import Box from '../box';
import { InputWrapper } from '../input-field/theme';
import {
  StyledSearch,
  SearchWrapper,
  MenuContainer,
  MenuItem,
  SearchContainer,
  ShrinkingBorder,
  BorderContainer,
} from './theme';

const INIT_DEBOUNCE = 500;
const UP_KEY = 38;
const DOWN_KEY = 40;
const ENTER_KEY = 13;

const Menu = (props) => {
  const {
    data,
    dataLabel,
    itemChooseHandler,
    theme,
    noResultsMessage,
    lightFocus,
    setLightFocus,
    CustomMenuItem,
    typedTerm,
    isLarge,
  } = props;

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
      {data.map((el, index) => (
        <MenuItem
          theme={theme}
          key={el[dataLabel]}
          onMouseDown={() => itemChooseHandler(el)}
          onMouseEnter={() => setLightFocus(index)}
          onMouseLeave={() => setLightFocus(null)}
          lightFocused={index === lightFocus}
        >
          {CustomMenuItem ? (
            <CustomMenuItem item={el} typedTerm={typedTerm} />
          ) : (
            <Text>{el[dataLabel]}</Text>
          )}
        </MenuItem>
      ))}
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
    setTypedTerm(item[dataLabel]);
    itemChooseHandler(item);
    inputRef.current.blur();
  };

  const specialKeyHandler = ({ keyCode }) => {
    switch (keyCode) {
      case DOWN_KEY:
        return setLightFocus((lightFocus + 1) % data.length);
      case UP_KEY:
        return setLightFocus(
          lightFocus - 1 < 0 ? data.length - 1 : lightFocus - 1,
        );
      case ENTER_KEY:
        return choseItem(data[lightFocus]);
      default:
        return null;
    }
  };

  return (
    <SearchWrapper>
      <BorderContainer>
        <SearchContainer disabled={disabled}>
          <InputWrapper>
            <SearchIcon isLarge={size === 'large'} />
            <StyledSearch
              {...rest}
              disabled={disabled}
              ref={inputRef}
              onKeyDown={specialKeyHandler}
              size={size}
              value={typedTerm}
              onChange={({ target: { value } }) => setTypedTerm(value)}
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
          </InputWrapper>
        </SearchContainer>
        <ShrinkingBorder theme={theme} show={isMenuOpen} />
      </BorderContainer>
      {isMenuOpen && (
        <Menu
          isLarge={size === 'large'}
          typedTerm={typedTerm}
          CustomMenuItem={CustomMenuItem}
          lightFocus={lightFocus}
          setLightFocus={setLightFocus}
          theme={theme}
          data={data}
          itemChooseHandler={choseItem}
          dataLabel={dataLabel}
          noResultsMessage={noResultsMessage}
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
};
Search.defaultProps = {
  debouncePeriod: INIT_DEBOUNCE,
  dataLabel: 'label',
  placeholder: 'Search...',
  noResultsMessage: 'No results',
  data: [],
  size: 'regular',
  CustomMenuItem: null,
};

export default withTheme(Search);
