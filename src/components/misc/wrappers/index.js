import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Box from '../../layout/box';

const Background = styled(Box)`
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: ${({ theme }) => (theme.colors.mainbackground)};
`;

const Wrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  overflow-y: hidden;
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
  <Background>
    <Wrapper>
      <RemChanger />
      {children}
    </Wrapper>
  </Background>
);
