import React from 'react';
import styled, { withTheme } from 'styled-components';

const SearchWrapper = styled.div`
  position: absolute;
  top: ${({ isLarge }) => (isLarge ? '12px' : '9px')};
  left: ${({ isLarge }) => (isLarge ? '10px' : '12px')};
`;

const LargeSearchIconSVG = ({ theme }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.7836 13.8364L12.6675 10.7204C12.5269 10.5797 12.3362 10.5016 12.1362 10.5016H11.6267C12.4894 9.39828 13.0019 8.01057 13.0019 6.50097C13.0019 2.90981 10.0921 0 6.50097 0C2.90981 0 0 2.90981 0 6.50097C0 10.0921 2.90981 13.0019 6.50097 13.0019C8.01057 13.0019 9.39828 12.4894 10.5016 11.6267V12.1362C10.5016 12.3362 10.5797 12.5269 10.7204 12.6675L13.8364 15.7836C14.1302 16.0774 14.6053 16.0774 14.896 15.7836L15.7805 14.8991C16.0743 14.6053 16.0743 14.1302 15.7836 13.8364ZM6.50097 10.5016C4.29127 10.5016 2.50037 8.7138 2.50037 6.50097C2.50037 4.29127 4.28814 2.50037 6.50097 2.50037C8.71068 2.50037 10.5016 4.28814 10.5016 6.50097C10.5016 8.71068 8.7138 10.5016 6.50097 10.5016Z"
      fill={theme.colors.grey_400}
    />
  </svg>
);

const SearchIconSVG = ({ theme }) => (
  <svg
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.837 10.3766L9.49986 8.03946C9.39438 7.93397 9.25138 7.87537 9.10136 7.87537H8.71926C9.36625 7.04788 9.75069 6.00708 9.75069 4.87486C9.75069 2.18143 7.56828 -0.000976562 4.87486 -0.000976562C2.18143 -0.000976562 -0.000976562 2.18143 -0.000976562 4.87486C-0.000976562 7.56828 2.18143 9.75069 4.87486 9.75069C6.00708 9.75069 7.04788 9.36625 7.87537 8.71926V9.10136C7.87537 9.25138 7.93397 9.39438 8.03946 9.49986L10.3766 11.837C10.5969 12.0573 10.9532 12.0573 11.1712 11.837L11.8346 11.1736C12.055 10.9532 12.055 10.5969 11.837 10.3766ZM4.87486 7.87537C3.21754 7.87537 1.87434 6.53451 1.87434 4.87486C1.87434 3.21754 3.2152 1.87434 4.87486 1.87434C6.53217 1.87434 7.87537 3.2152 7.87537 4.87486C7.87537 6.53217 6.53451 7.87537 4.87486 7.87537Z"
      fill={theme.colors.grey_400}
    />
  </svg>
);
const ThemedSearchIcon = withTheme(SearchIconSVG);
const ThemedLargeSearchIcon = withTheme(LargeSearchIconSVG);

const SearchIcon = (props) => {
  const { isLarge } = props;
  return (
    <SearchWrapper isLarge={isLarge}>
      {isLarge
        ? <ThemedLargeSearchIcon />
        : <ThemedSearchIcon />}
    </SearchWrapper>
  );
};

export default SearchIcon;
