import React from 'react';
import styled from 'styled-components';
import {
  MdCheckCircle, MdError, MdInfo, MdWarning,
} from 'react-icons/md';

const COLORS = {
  success: '#56b68b',
  error: '#ec4d5c',
  info: '#767676',
  warning: '#d36535',
};

const IconWrapper = styled.div`
  display: flex;
`;

export const getIcon = (type) => {
  switch (type) {
    case 'success':
      return (<IconWrapper><MdCheckCircle color="#fff" size="24px" /></IconWrapper>);
    case 'error':
      return (<IconWrapper><MdError color="#fff" size="24px" /></IconWrapper>);
    case 'info':
      return (<IconWrapper><MdInfo color="#fff" size="24px" /></IconWrapper>);
    case 'warning':
      return (<IconWrapper><MdWarning color="#fff" size="24px" /></IconWrapper>);
    default:
      return null;
  }
};

export const StyledMessageBox = styled.div`
  display: grid;
  grid-template-areas: 'logo text button';
  grid-template-columns: 2.6rem auto auto;
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
`;

export const MessageBoxIconContainer = styled.div`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  align-items: center;
  justify-content: center;
`;

export const MessageBoxText = styled.div`
  margin: 0.32rem 0.24rem 0.3rem 0;
  grid-area: text;
  align-self: center;
  justify-self: start;
  text-align: start;
  padding-top: 3px;
  color: #ffffff;
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
  color: #ffffff;
  cursor: pointer;
`;
