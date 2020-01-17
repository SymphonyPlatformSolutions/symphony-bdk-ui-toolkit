import styled from 'styled-components';
import {
  StyledInput, Container, InputWrapper,
  ToggleButtonText,
} from '../input-field/theme';

export const ClearText = styled(ToggleButtonText)`
  white-space: nowrap;
  display: flex;
  padding-right: 8px;
  align-items: center;
`;
export const BorderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: inherit;
`;
export const SearchContainer = styled(Container)`
  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.oldprimary_400};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 1px solid transparent;
  }
  width: inherit;
  display: flex;
`;
export const StyledSearch = styled(StyledInput)`
  padding: ${({ size }) => (size === 'large' ? '10px 12px 11px 12px' : '9px 5px 9px 10px')};
`;
export const SearchWrapper = styled.div`
  width: 100%;
  position: relative;
`;
export const FloatWrapper = styled.div`
  position: relative;
`;
export const MenuContainer = styled.div`
  padding: 7px 0 5px 0;
  margin: -3px -1px -1px -1px;
  background-color: ${({ theme }) => theme.colors.mainbackground};
  border: 1px solid ${({ theme }) => (theme.colors.oldprimary_400)};
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  width: inherit;
  position: absolute;
  z-index: 8;
`;
export const MenuItem = styled.div`
  padding: 4px 8px 4px 12px;
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme, lightFocused }) => (lightFocused ? theme.colors.grey_200 : 'transparent')};
`;
export const ShrinkingBorder = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.colors.oldprimary_400};
  width: ${({ show }) => (show ? '80%' : '100%')};
  transition: all 0.3s ease;
  top: -3px;
  position: relative;
  height: 1px;  
  display: block;
  opacity: ${({ show }) => (show ? '1' : '0')};
`;
export const SearchIconWrapper = styled.div`
  position: absolute;
  top: ${({ isLarge }) => (isLarge ? '12px' : '9px')};
  left: ${({ isLarge }) => (isLarge ? '10px' : '12px')};
`;
export const SearchInputWrapper = styled(InputWrapper)`
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  position: ${({ hide }) => (hide ? 'absolute' : undefined)};
  height:${({ hide }) => (hide ? 0 : undefined)}; 
  width: ${({ hide }) => (hide ? 0 : '100%')};
  z-index: ${({ hide }) => (hide ? -1 : 2)};
  transition: ${({ hide }) => (hide ? 'none' : undefined)};
`;
export const LoaderWrapper = styled.div`
  padding: 14px 0 8px 0;
  display: flex;
  justify-content: center;
`;
