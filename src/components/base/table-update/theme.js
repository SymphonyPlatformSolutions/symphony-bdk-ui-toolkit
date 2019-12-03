import styled from 'styled-components';
import { darken, transparentize } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';

export const THead = styled.thead`
  background-color: ${({ theme }) => theme.colors.grey_100};
  box-shadow: none;
  min-height: 48px;
  padding: 5px 0;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

export const THeadTh = styled.th`
  border-right: none;
  align-items: center;
`;

export const TBodyTr = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.grey_100};
`;

export const TBody = styled.tbody`
  border: 2px solid ${({ theme }) => theme.colors.grey_100};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const getHeaderColumnTextStyle = theme => ({
  lineHeight: '1.2rem',
  userSelect: 'none',
  color: theme.mode === THEME_TYPES.DARK ? theme.colors.white : darken(0.2, theme.colors.grey_400),
});
