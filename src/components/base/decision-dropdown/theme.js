import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';
import { Container, StyledInput } from '../input-field/theme';
import Text from '../text';

export const INPUT_SIZES = {
  REGULAR: 'regular',
  LARGE: 'large',
};

const getBorderColor = ({ theme, error, menuIsOpen }) => {
  if (error) {
    return theme.colors.error_500;
  }
  if (menuIsOpen) {
    return theme.colors.oldprimary_400;
  }
  return theme.colors.grey_300;
};

export const MenuItemContainer = styled.div`
  padding: 8px 0;
  border-top: ${({ hasTopBar, theme }) => (hasTopBar ? `1px solid ${theme.colors.grey_200}` : 'none')};
  border-bottom: ${({ hasBottomBar, theme }) => (hasBottomBar ? `1px solid ${theme.colors.grey_200}` : 'none')};
`;
export const MenuItemTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_900};
  font-weight: bold;
  font-size: 1rem;
  padding: 4px 12px 6px 12px;
`;
export const MenuItemSubtitle = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_500};
  font-size: 0.7rem;
  padding: 0 12px 6px 12px;
`;
export const SimpleItemContainer = styled.div`
  transition: all 0.2s linear;
  padding: 10px 12px;
  background-color: ${({ theme, lightFocused }) => (lightFocused
    ? theme.mode === THEME_TYPES.DARK
      ? theme.colors.grey_100
      : theme.colors.oldprimary_100
    : 'transparent')};
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: pointer;
`;
export const SimpleItemLabel = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_900};
  line-height: 14px;
`;
export const SimpleItemSublabel = styled(Text)`
  padding-left: 9px;
  color: ${({ theme }) => theme.colors.grey_600};
  font-style: italic;
  font-size: 0.8rem;
  line-height: 14px;
`;
export const EmptyMessageContainer = styled.div`
  justify-content: center;
  display: flex;
  padding: 12px;
`;
export const EmptyMessageText = styled(Text)`
  font-style: italic;
`;
export const ShrinkingBorder = styled.span`
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.colors.error_500 : theme.colors.oldprimary_400)};
  width: ${({ show }) => (show ? '80%' : '100%')};
  transition: width 0.3s ease;
  bottom: -1px;
  position: absolute;
  height: 1px;
  display: block;
  opacity: ${({ show }) => (show ? '1' : '0')};
  z-index: 10;
`;
export const ChevronWrapper = styled.div`
  display: flex;
  height: 10px;
  align-items: center;
  transition: all 0.3s ease-out;
  transform: rotate(${({ turn }) => (turn ? '-180deg' : 0)});
`;
export const DropdownContainer = styled(Container)`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${(props) => ` ${getBorderColor(props)}`};
  box-shadow: ${({ menuIsOpen, theme }) => (menuIsOpen ? (theme.mode === THEME_TYPES.LIGHT ? '0 0 16px -6px rgba(0,0,0,0.2)' : 'none') : 'none')};
  border-bottom: 1px solid
    ${(props) => (props.menuIsOpen ? 'transparent' : getBorderColor(props))};
  border-bottom-right-radius: ${({ menuIsOpen }) => (menuIsOpen ? '0' : '4px')};
  border-bottom-left-radius: ${({ menuIsOpen }) => (menuIsOpen ? '0' : '4px')};
`;
export const ValueContainer = styled.div`
  padding: 3px 6px 7px 7px;
  display: flex;
  align-items: center;
`;
export const ChevronContainer = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;
export const MenuContainer = styled.div`
  border: 1px solid ${(props) => getBorderColor({ ...props, menuIsOpen: true })};
  border-top: 0;
  top: -1px;
  border-radius: 4px;
  border-top-right-radius: 0;
  box-shadow: ${({ theme }) => (theme.mode === THEME_TYPES.LIGHT ? '0 11px 16px -6px rgba(0,0,0,0.2)' : 'none')};
  border-top-left-radius: 0;
  padding-top: ${({ hasTopPadding }) => (hasTopPadding ? '8px' : '0')};
  padding-bottom: ${({ hasBottomPadding }) => (hasBottomPadding ? '8px' : '0')};
  position: absolute;
  width: 100%;
  z-index: 9;
  background-color: ${({ theme }) => theme.colors.mainbackground};
`;

export const BackButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 8px;
`;
export const BackButton = styled(Text)`
  color: ${({ theme }) => theme.colors.primary_500};
  position: relative;
  cursor: pointer;
  margin-right: 12px;
`;

export const LoaderWrapper = styled.div`
  padding: 14px 0 8px 0;
  display: flex;
  justify-content: center;
`;
export const Wrapper = styled.div`
  width: 100%;
`;
export const ControlInput = styled(StyledInput)`
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  position: ${({ hide }) => (hide ? 'absolute' : undefined)};
  height:${({ hide }) => (hide ? 0 : undefined)}; 
  width: ${({ hide }) => (hide ? 0 : 'auto')};
  z-index: ${({ hide }) => (hide ? -1 : 2)};
  transition: ${({ hide }) => (hide ? 'none' : undefined)};
  margin-left: ${({ size }) => (size === 'large' ? '0' : '4px')};
  padding-right: ${({ size }) => (size === 'large' ? '0' : undefined)};
  border: none;
`;
export const ValueAndControl = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ size }) => (size === 'large' ? '80%' : '100%')};
  box-sizing: border-box;
`;
export const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const MultiChosenCheck = styled.div`
  height: 1px;
`;
export const LabelContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;
export const MultiSelectContainer = styled.div`
  margin-top: 4px;
  margin-right: 5px;
  padding: 4px 7px 4px 4px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grey_200};
  border-radius: 4px;
`;
export const MultiSelectText = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_800};
  white-space: nowrap;
  margin-right: 6px;
`;
export const MultiValueContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const IconMarginContainer = styled.div`
  display: flex;
  margin-right: 8px;
`;
export const TooltipMargin = styled.div`
  margin-left: 8px;
`;
