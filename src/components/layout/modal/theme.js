import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';

export const Overlay = styled.div`
  background-color: #000C;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const getBackgroundColor = ({ theme }) => (theme.colors.mainbackground);

export const Modal = styled.div`
  width: ${({ modalWidth }) => modalWidth || '420px'};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  overflow: visible;
  background: ${props => getBackgroundColor(props)};
  z-index: 9000;
  position: absolute;
  top: 30%;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.grey_100}`};
  box-shadow: ${({ theme }) => (theme.mode === THEME_TYPES.DARK
    ? 'none'
    : '0px 2px 10px rgba(0, 0, 0, 0.05)')};
  left: 50%;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: translate(-50%, -30%);
  transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
`;
