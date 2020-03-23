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
export const InputContainer = styled(Container)`
  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.oldprimary_400};
    border-bottom-left-radius:  ${({ isMenuOpen }) => (isMenuOpen ? '0' : undefined)};
    border-bottom-right-radius: ${({ isMenuOpen }) => (isMenuOpen ? '0' : undefined)};
    border-bottom: ${({ isMenuOpen }) => (isMenuOpen ? '1px solid transparent' : undefined)};
  }
  
  width: inherit;
  display: flex;
`;
export const StyledTextInput = styled(StyledInput)`
  padding: ${({ size }) => (size === 'large' ? '10px 12px 11px 12px' : '9px 5px 9px 10px')};
`;
export const TextInputWrapper = styled.div`
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
  top: -2px;
  z-index: 10;
  position: relative;
  height: 1px;  
  display: block;
  opacity: ${({ show }) => (show ? '1' : '0')};
`;
export const LoaderWrapper = styled.div`
  padding: 14px 0 8px 0;
  display: flex;
  justify-content: center;
`;
