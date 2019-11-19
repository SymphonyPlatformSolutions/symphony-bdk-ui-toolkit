import React, { useEffect, useState } from 'react';
import styled, { withTheme } from 'styled-components';
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
  FakeBorderBottom,
  BorderContainer,
} from './theme';

const INIT_DEBOUNCE = 500;

const Menu = (props) => {
  const {
    content,
    contentLabel,
    itemChooseHandler,
    theme,
    noResultsMessage,
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
      {content.map(el => (
        <MenuItem
          theme={theme}
          key={el[contentLabel]}
          onMouseDown={() => itemChooseHandler(el)}
        >
          <Text>{el[contentLabel]}</Text>
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
    ...rest
  } = props;
  const [typedTerm, setTypedTerm] = useState('');
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [memo, setMemo] = useState({});

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

  return (
    <SearchWrapper>
      <BorderContainer>
        <SearchContainer>
          <InputWrapper>
            <SearchIcon isLarge={size === 'large'} />
            <StyledSearch
              {...rest}
              size={size}
              value={typedTerm}
              onChange={({ target: { value } }) => setTypedTerm(value)}
              onFocus={() => setisMenuOpen(true)}
              onBlur={() => setisMenuOpen(false)}
              placeholder={placeholder}
            />
          </InputWrapper>
        </SearchContainer>
        <FakeBorderBottom theme={theme} show={isMenuOpen} />
      </BorderContainer>
      {isMenuOpen && (
        <Menu
          theme={theme}
          content={content}
          itemChooseHandler={(item) => {
            setTypedTerm(item[contentLabel]);
          }}
          contentLabel={contentLabel}
          noResultsMessage={noResultsMessage}
        />
      )}
    </SearchWrapper>
  );
};

Search.defaultProps = {
  debouncePeriod: INIT_DEBOUNCE,
  contentLabel: 'label',
  placeholder: 'Search...',
  noResultsMessage: 'No results',
};

export default withTheme(Search);
