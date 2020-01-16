import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Box from '../../layout/box';

const Wrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: -webkit-fill-available;
  background-color: ${({ theme }) => (theme.colors.mainbackground)};
`;
const getFontSize = ({ theme }) => {
  switch (theme.size) {
    case 'xsmall':
      return '12px';
    case 'small':
      return '13px';
    case 'large':
      return '17px';
    default:
      return '14px';
  }
};

const RemChanger = createGlobalStyle`
  html {
    font-size: ${(props) => getFontSize(props)};
  }
`;

export const StoryWrapper = ({ children }) => (
  <Wrapper>
    <RemChanger />
    {children}
  </Wrapper>
);
