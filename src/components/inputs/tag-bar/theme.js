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

export const TagBarContainer = styled(Container)`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => ` ${getBorderColor(props)}`};
  box-shadow: ${({ menuIsOpen, theme }) => (menuIsOpen ? (theme.mode === THEME_TYPES.LIGHT ? '0 0 16px -6px rgba(0,0,0,0.2)' : 'none') : 'none')};
`;
export const ValueContainer = styled.div`
  padding: 3px 6px 7px 7px;
  display: flex;
  align-items: center;
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
  height: 32px;
  box-sizing: border-box;
`;
export const LabelContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;
export const MultiSelectContainer = styled.div`
  margin-top: ${({ ignorePadding }) => (ignorePadding ? undefined : '4px')};
  margin-right: ${({ ignorePadding }) => (ignorePadding ? undefined : '5px')};
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
