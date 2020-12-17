import styled, { createGlobalStyle } from 'styled-components';

import Box from '../../layout/box';

const DEFAULT_FONT_SIZE = 14;

const getFontSize = ({ theme }) => {
  const sizes = {
    xsmall: '12px',
    small: '13px',
    large: '17px',
  };
  return sizes[theme.size] || `${DEFAULT_FONT_SIZE}px`;
};

export const Background = styled(Box)`
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.mainbackground};
`;

export const Wrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  overflow-y: hidden;
`;

export const RemChanger = createGlobalStyle`
  html {
    font-size: ${getFontSize};
  }
`;
