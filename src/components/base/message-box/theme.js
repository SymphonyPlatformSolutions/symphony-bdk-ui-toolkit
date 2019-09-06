import React from 'react';
import styled from 'styled-components';
import {
  MdCheckCircle, MdError, MdInfo, MdWarning,
} from 'react-icons/md';

// const COLORS = {
//   success: '#56b68b',
//   error: '#ec4d5c',
//   info: '#767676',
//   warning: '#d36535',
// };

const COLORS = {
  success: '#d8e1d0',
  error: '#ffc2c2',
  info: '#cce0ef',
  warning: '#f1e7ca',
};

const ICON_BACKGROUND_COLORS = {
  success: '#83b05a',
  error: '#d4172d',
  info: '#46abf3',
  warning: '#fdcd3b',
};

const IconWrapper = styled.div`
  display: flex;
`;

export const getIcon = ({ type, theme }) => {
  switch (type) {
    case 'success':
      return (<IconWrapper><MdCheckCircle color={theme.colors.white} size="24px" /></IconWrapper>);
    case 'error':
      return (<IconWrapper><MdError color={theme.colors.white} size="24px" /></IconWrapper>);
    case 'info':
      return (<IconWrapper><MdInfo color={theme.colors.white} size="24px" /></IconWrapper>);
    case 'warning':
      return (<IconWrapper><MdWarning color={theme.colors.white} size="24px" /></IconWrapper>);
    default:
      return null;
  }
};

export const StyledMessageBox = styled.div`
  display: grid;
  grid-template-areas: 'logo text button';
  grid-template-columns: 2.2rem auto auto;
  grid-template-rows: auto;
  z-index: 10;
  max-width: 100%;
  min-width: 17rem;
  min-height: 2.2rem;
  border-radius: 0.3rem;
  list-style-type: none;
  background-color: ${props => COLORS[props.type]};
`;

export const MessageBoxLogo = styled.div`
  grid-area: logo;
  display: grid;
  font-weight: bold;
  border-top-left-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
  justify-content: center;
  align-content: center;
  background-color: ${props => ICON_BACKGROUND_COLORS[props.type]};
`;

export const MessageBoxIconContainer = styled.div`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  align-items: center;
  justify-content: center;
`;

export const MessageBoxText = styled.div`
  margin: 0.32rem 0.6rem 0.3rem 0.7rem;
  grid-area: text;
  align-self: center;
  justify-self: start;
  text-align: start;
  padding-top: 3px;
  color: #4d4d4d;
`;

export const MessageBoxIcon = styled.i`
  display: inline;
  font-weight: bold;
  color: ${props => COLORS[props.type]};
  ${props => props.type === 'success' && 'font-size: 1rem;'}
`;

export const MessageBoxButtonContainer = styled.div`
  grid-area: button;
  align-self: center;
  justify-self: end;
`;

export const MessageBoxButton = styled.button`
  margin: 2px 4px 0 0;
  border: none;
  background: none;
  color: #4d4d4d;
  cursor: pointer;
`;
