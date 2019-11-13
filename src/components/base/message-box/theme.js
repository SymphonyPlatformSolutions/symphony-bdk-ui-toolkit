import { darken } from 'polished';
import styled from 'styled-components';

const getColor = ({ theme, type }) => {
  const COLORS = {
    success: theme.colors.success_100,
    error: theme.colors.error_100,
    info: theme.colors.oldprimary_100,
    warning: theme.colors.warning_100,
  };

  return COLORS[type];
};

export const StyledMessageBox = styled.div`
  display: grid;
  grid-template-areas: 'text button';
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  z-index: 10;
  max-width: 100%;
  min-width: 17rem;
  min-height: 2.2rem;
  list-style-type: none;
  background-color: ${props => getColor(props)};
  border-radius: 3px;
`;

export const MessageBoxIconContainer = styled.div`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  align-items: center;
  justify-content: center;
`;

export const MessageBoxText = styled.div`
  margin: 9px 12px;
  grid-area: text;
  align-self: center;
  justify-self: start;
  text-align: start;
  padding-top: 3px;
  color: ${props => darken(0.7, getColor(props))};
`;

export const MessageBoxButtonContainer = styled.div`
  grid-area: button;
  align-self: center;
  justify-self: end;
  border: none;
`;

export const MessageBoxButton = styled.button`
  margin: 5px 4px 0 0;
  border: none;
  outline: none;
  background: none;
  color: #4d4d4d;
  cursor: pointer;
`;
