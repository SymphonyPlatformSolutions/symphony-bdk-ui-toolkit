import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';

export const Overlay = styled.div`
  background-color: #808080c7;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const getBorderColor = ({ theme }) => (theme.mode === THEME_TYPES.DARK
  ? null
  : `1px solid ${theme.colors.lightgrey}`);

const getBackgroundColor = ({ theme }) => (theme.mode === THEME_TYPES.DARK
  ? theme.colors.darkaccent
  : theme.colors.white);

export const Modal = styled.div`
  min-width: 420px;
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  overflow: visible;
  border-radius: 4px;
  background: ${props => getBackgroundColor(props)};
  z-index: 9000;
  border: ${props => getBorderColor(props)};
  position: absolute;
  top: 30%;
  left: 50%;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: translate(-50%, -30%);
  transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
`;
