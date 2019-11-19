import React, { useEffect, useState } from 'react';
import styled, { withTheme } from 'styled-components';
import InputField from '../input-field';
import { LargeSearchIcon, SearchIcon } from './search-icon';

const INIT_DEBOUNCE = 500;

const Search = (props) => {
  const {
    theme,
    content,
    searchHandler,
    resultHandler,
    debouncePeriod,
    size,
    ...rest
  } = props;
  const [typedTerm, setTypedTerm] = useState('');
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
    <InputField
      {...rest}
      size={size}
      style={{ padding: size === 'large' ? '9px 12px 11px 33px' : '9px 5px 9px 30px' }}
      Icon={size === 'large' ? LargeSearchIcon : SearchIcon}
      value={typedTerm}
      onChange={({ target: { value } }) => setTypedTerm(value)}
    />
  );
};

Search.defaultProps = {
  debouncePeriod: INIT_DEBOUNCE,
};

export default withTheme(Search);
