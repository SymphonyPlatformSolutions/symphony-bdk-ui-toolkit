import React from 'react';
import styled from 'styled-components';
import { Smile } from '@styled-icons/boxicons-solid';

const SmileContainer = styled.div`
  display: flex;
  height: 16px;
  align-items: center;
  transition: all 0.3s ease-out;
  transform: rotate(${({ menuIsOpen }) => (menuIsOpen ? '-180deg' : 0)});
  cursor: pointer;
`;

const StyledSmile = styled(Smile)`
  transition: all 0.3s;
  color: ${({ theme, menuIsOpen }) => (menuIsOpen ? theme.colors.warning_500 : theme.colors.grey_500)};
`;

export const CustomChevron = ({ menuIsOpen, blurInput, focusInput }) => (
  <SmileContainer
    onMouseDown={e => {
      e.preventDefault();
      if (menuIsOpen) {
        blurInput();
      } else {
        focusInput();
      }
    }}
    menuIsOpen={menuIsOpen}
  >
    <StyledSmile size={20} menuIsOpen={menuIsOpen} />
  </SmileContainer>
);
