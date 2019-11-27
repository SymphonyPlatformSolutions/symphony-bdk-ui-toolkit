import styled from 'styled-components';
import { transparentize } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';

export const getBackgroundColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? theme.colors.white
    : transparentize(0.9, theme.colors.white));

export const getBoxShadowColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? transparentize(0.86, theme.colors.white)
    : theme.colors.grey
);

export const getBorderColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT ? `1px solid ${theme.colors.grey}` : '1px solid #494b4e7a'
);


export const BaseCard = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border: ${getBorderColor};
  padding: ${props => `${props.p}px`};
  box-shadow: ${({ theme }) => (theme.mode === THEME_TYPES.DARK ? '' : '0 1px 16px -6px rgba(0, 0, 0, 0.1)')};
  transition: all 0.5s cubic-bezier(.25,.8,.25,1);
  background-color: ${({ theme }) => (theme.mode === THEME_TYPES.DARK ? theme.colors.inputgrey : null)};
  overflow: hidden;
  &:hover {
    transform: ${props => (props.hoverEffect ? 'scale(1.02)' : null)}
  }
  width: 100%;
`;

export const CardTitle = styled.span`;
  display: ${p => (p.title === '' ? 'none' : 'inline-block')};
`;
