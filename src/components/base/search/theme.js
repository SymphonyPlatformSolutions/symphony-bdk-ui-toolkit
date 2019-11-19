import React, { useEffect, useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { StyledInput, Container } from '../input-field/theme';

export const BorderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const SearchContainer = styled(Container)`
  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.oldprimary_400};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 1px solid transparent;
  }
`;
export const StyledSearch = styled(StyledInput)`
  padding: ${({ size }) => (size === 'large' ? '10px 12px 11px 33px' : '9px 5px 9px 30px')};
`;
export const SearchWrapper = styled.div``;
export const MenuContainer = styled.div`
  padding: 7px 0 5px 0;
  margin-top: -3px;
  background-color: ${({ theme }) => theme.colors.mainbackground};
  border: 1px solid ${({ theme }) => (theme.colors.oldprimary_400)};
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;
export const MenuItem = styled.div`
  padding: 4px 8px 4px 12px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey_200};
  }
`;
export const FakeBorderBottom = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.colors.oldprimary_400};
  width: ${({ show }) => (show ? '80%' : '100%')};
  transition: all 0.3s ease;
  top: -2px;
  position: relative;
  height: 1px;  
  display: block;
  opacity: ${({ show }) => (show ? '1' : '0')};
`;
