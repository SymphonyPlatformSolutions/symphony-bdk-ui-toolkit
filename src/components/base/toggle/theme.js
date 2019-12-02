import styled, { withTheme } from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';

export const InvisibleInput = styled.input`
  opacity: 0;
  z-index: -1;
  position: absolute;
  width: 0;
`;
export const Wrapper = styled.div`
  cursor: pointer;
`;
export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 32px;
  height: 11px;
  transition: all 0.3s;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.grey_300};
  border-radius: 45px;
  transform: translateX(10px);
  ${Wrapper}:hover & {
    background-color: ${({ theme }) => theme.colors.grey_400};
  }
  ${Wrapper}:focus-within   & {
    background-color: ${({ theme }) => theme.colors.grey_400};
  }
`;

export const SwitchCircle = styled.div`
  border-radius: 50%;
  width: 14px;
  height: 14px;
  background-color: ${({ theme, toggled }) => (toggled ? theme.colors.primary_500 : theme.colors.grey_100)};
  border: ${({ theme }) => `2px solid ${theme.colors.primary_500}`};
  transition: all 0.3s ease-in-out;
  transform: translateX(${({ toggled }) => (toggled ? '16px' : '-16px')});
  box-shadow: ${({ theme }) => (theme.mode === THEME_TYPES.DARK ? '' : '1px 2px 4px 0px rgba(0,0,0,0.15)')};
`;
