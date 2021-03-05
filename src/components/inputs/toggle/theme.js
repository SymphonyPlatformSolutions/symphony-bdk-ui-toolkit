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
  width: 32px;
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  height: 8px;
  transition: all 0.3s;
  justify-content: center;
  background-color: ${({ toggled }) => (toggled ? 'rgba(0,142,255,0.4)' : '#525760')};
  border-radius: 45px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)}
  transform: translateX(10px);
  ${Wrapper}:focus-within   & {
    background-color: ${({ theme }) => theme.colors.grey_400};
  }
`;

const getCircleColor = ({ theme, toggled, color }) => {
  return toggled ? color || theme.colors.primary_500 : theme.colors.white;
};

export const SwitchCircle = styled.div`
  border-radius: 50%;
  width: 16px;
  height: 16px;
  background-color: ${getCircleColor};
  transition: all 0.2s ease-out;
  transform: translateX(${({ toggled }) => (toggled ? '8px' : '-8px')});
  box-shadow: ${({ theme }) => (theme.mode === THEME_TYPES.DARK ? '' : '0px 1px 4px rgba(0, 0, 0, 0.32), 0px 0px 2px rgba(63, 63, 68, 0.64)')};
`;
