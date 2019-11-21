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
    content,
    contentLabel,
    itemChooseHandler,
    theme,
    noResultsMessage,
    lightFocus,
    setLightFocus,
    CustomMenuItem,
    typedTerm,
  } = props;

  if (!content.length) {
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
    <MenuContainer theme={theme}>
      {content.map((el, index) => (
        <MenuItem
          theme={theme}
          key={el[contentLabel]}
          onMouseDown={() => itemChooseHandler(el)}
          onMouseEnter={() => setLightFocus(index)}
          onMouseLeave={() => setLightFocus(null)}
          lightFocused={index === lightFocus}
        >
          {CustomMenuItem ? (
            <CustomMenuItem item={el} typedTerm={typedTerm} />
          ) : (
            <Text>{el[contentLabel]}</Text>
          )}
        </MenuItem>
      ))}
    </MenuContainer>
  );
};

const Search = (props) => {
  const {
    theme,
    content,
    searchHandler,
    resultHandler,
    debouncePeriod,
    size,
    contentLabel,
    placeholder,
    noResultsMessage,
    itemChooseHandler,
    CustomMenuItem,
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
        [typedTerm]: content,
      });
    }
  }, [content]);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      executeSearch();
    }, debouncePeriod);
    return () => clearTimeout(handler);
  }, [typedTerm]);

  const choseItem = (item) => {
    setTypedTerm(item[contentLabel]);
    itemChooseHandler(item);
    inputRef.current.blur();
  };

  const specialKeyHandler = ({ keyCode }) => {
    switch (keyCode) {
      case DOWN_KEY:
        return setLightFocus((lightFocus + 1) % content.length);
      case UP_KEY:
        return setLightFocus(
          lightFocus - 1 < 0 ? content.length - 1 : lightFocus - 1,
        );
      case ENTER_KEY:
        return choseItem(content[lightFocus]);
      default:
        return null;
    }
  };

  return (
    <SearchWrapper>
      <BorderContainer>
        <SearchContainer>
          <InputWrapper>
            <SearchIcon isLarge={size === 'large'} />
            <StyledSearch
              {...rest}
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
          typedTerm={typedTerm}
          CustomMenuItem={CustomMenuItem}
          lightFocus={lightFocus}
          setLightFocus={setLightFocus}
          theme={theme}
          content={content}
          itemChooseHandler={choseItem}
          contentLabel={contentLabel}
          noResultsMessage={noResultsMessage}
        />
      )}
    </SearchWrapper>
  );
};

Menu.propTypes = {
  content: PropTypes.array,
  contentLabel: PropTypes.string.isRequired,
  itemChooseHandler: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  noResultsMessage: PropTypes.string.isRequired,
  CustomMenuItem: PropTypes.node,
};
Menu.defaultProps = {
  content: [],
  CustomMenuItem: null,
};

Search.propTypes = {
  theme: PropTypes.object.isRequired,
  content: PropTypes.array,
  searchHandler: PropTypes.func.isRequired,
  resultHandler: PropTypes.func.isRequired,
  debouncePeriod: PropTypes.number,
  size: PropTypes.oneOf(['regular', 'large']),
  contentLabel: PropTypes.string,
  placeholder: PropTypes.string,
  noResultsMessage: PropTypes.string,
  itemChooseHandler: PropTypes.func.isRequired,
  CustomMenuItem: PropTypes.node,
};
Search.defaultProps = {
  debouncePeriod: INIT_DEBOUNCE,
  contentLabel: 'label',
  placeholder: 'Search...',
  noResultsMessage: 'No results',
  content: [],
  size: 'regular',
  CustomMenuItem: null,
};

export default withTheme(Search);
