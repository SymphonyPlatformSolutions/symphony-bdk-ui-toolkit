import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';

export const InvisibleInput = styled.input`
  opacity: 0;
  z-index: -1;
  position: absolute;
  width: 0;
`;
export const Wrapper = styled.div`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin: 5px 0;
  width: 44px;
`;
export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 32px;
  height: 11px;
  transition: all 0.3s;
  justify-content: center;
  background-color: ${({ theme, disabled }) => (disabled ? theme.colors.grey_200 : theme.colors.grey_300)};
  border-radius: 45px;
  transform: translateX(10px);
  ${Wrapper}:hover & {
    background-color: ${({ theme, disabled }) => (disabled ? theme.colors.grey_200 : theme.colors.grey_400)};
  }
  ${Wrapper}:focus-within   & {
    background-color: ${({ theme }) => theme.colors.grey_400};
  }
`;

const getColor = ({
  theme, toggled, color, disabled,
}, isBorder) => {
  if (disabled) {
    if (isBorder || toggled) {
      return theme.colors.grey_400;
    }
    return theme.colors.grey_300;
  }
  if (!isBorder && !toggled) {
    return theme.colors.grey_100;
  }

  if (color) {
    return color;
  }
  return theme.colors.primary_500;
};

export const SwitchCircle = styled.div`
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: ${props => getColor(props, false)};
  border: ${props => `2px solid ${getColor(props, true)}`};
  transition: all 0.2s ease-out;
  transform: translateX(${({ toggled }) => (toggled ? '16px' : '-16px')});
  box-shadow: ${({ theme }) => (theme.mode === THEME_TYPES.DARK ? '' : '1px 2px 4px 0px rgba(0,0,0,0.15)')};
`;
