import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';
import { Container, StyledInput } from '../input-field/theme';
import Text from '../../misc/text';

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
export const InnerControlContainer = styled.div`
  width: 100%;
`;
export const TagBarContainer = styled(Container)`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
  position: relative;
  display: flex;
  border: 1px solid ${(props) => ` ${getBorderColor(props)}`};
  box-shadow: ${({ menuIsOpen, theme }) => (menuIsOpen ? (theme.mode === THEME_TYPES.LIGHT ? '0 0 16px -6px rgba(0,0,0,0.2)' : 'none') : 'none')};
  border-bottom: 1px solid
    ${(props) => (props.menuIsOpen ? 'transparent' : getBorderColor(props))};
  border-bottom-right-radius: ${({ menuIsOpen }) => (menuIsOpen ? '0' : '4px')};
  border-bottom-left-radius: ${({ menuIsOpen }) => (menuIsOpen ? '0' : '4px')};
`;
export const ValueContainer = styled.div`
  padding-left: 7px;
  display: flex;
  align-items: center;
  height: 100%;
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
  flex-direction: row;
  width: ${({ size }) => (size === 'large' ? '80%' : '100%')};
  height: 100%;
  box-sizing: border-box;
`;
export const LabelContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;
export const MultiSelectContainer = styled.div`
  margin: 2px 5px 2px 0;
  padding: ${({ ignorePadding }) => (ignorePadding ? undefined : '4px 7px 4px 4px')};
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
  margin-right: 8px;
`;
export const Binder = styled.div`
  width: 100%;
  min-height: 34px;
`;
export const MenuContainer = styled.div`
  border: 1px solid ${(props) => getBorderColor({ ...props, menuIsOpen: true })};
  border-top: 0;
  top: -1px;
  left: -1px;
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
export const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
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
export const IconsContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
`;
