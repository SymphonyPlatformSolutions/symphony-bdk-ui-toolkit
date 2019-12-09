import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import InputField from '../../input-field';
import { SearchIcon } from '../../icons';
import {
  SearchWrapper,
  InputWrapper,
  SearchIconWrapper,
  InputFieldBackground,
} from '../theme';

const TableSearchBar = (props) => {
  const { executeFilter, theme } = props;
  const [typedValue, setTypedValue] = useState('');

  // Search debouncing
  useEffect(() => {
    if (!typedValue) {
      executeFilter('');
      return () => {};
    }
    const handler = setTimeout(() => {
      executeFilter(typedValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [typedValue]);

  return (
    <SearchWrapper>
      <InputWrapper>
        <SearchIconWrapper>
          <SearchIcon color={theme.colors.grey_400} size={12} />
        </SearchIconWrapper>
        <InputFieldBackground>
          <InputField
            placeholder="Search value..."
            value={typedValue}
            onChange={({ target: { value } }) => setTypedValue(value)}
            type="text"
            style={{ padding: '4px 4px 4px 20px', minHeight: 0 }}
          />
        </InputFieldBackground>
      </InputWrapper>
    </SearchWrapper>
  );
};

TableSearchBar.propTypes = {
  executeFilter: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(TableSearchBar);
