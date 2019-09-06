import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';

export const Radio = styled.input`
  visibility: hidden;
  position: absolute;
  left: -1px;
  top: -2px;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  &:disabled {
    cursor: default; 
  }

  &:checked:before {
    visibility: visible;
    content: '';
    position: absolute;
    left: -4px;
    top: -4px;
    width: 14px;
    height: 14px;
    border: 2px solid ${({ theme }) => theme.theme.primary};
    border-radius: 100%;
  } 

  &:disabled:checked:before {
    border: 2px solid ${({ theme }) => theme.theme.grey};
  }

  &:not(:checked):before {
    visibility: visible;
    content: '';
    position: absolute;
    left: -4px;
    top: -4px;
    width: 0.9rem;
    height: 0.9rem;
    border: 2px solid ${({ theme }) => (theme.mode === THEME_TYPES.LIGHT
    ? darken(0.1, theme.theme.grey)
    : lighten(0.1, theme.theme.grey))};
    border-radius: 100%;
  }

  &:disabled:not(:checked):before {
    border: 2px solid ${({ theme }) => theme.theme.grey};
  }

  &:checked:after,
  &:not(:checked):after {
    visibility: visible;
    content: '';
    left: 1px;
    top: 1px;
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.theme.primary};
    position: absolute;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  &:disabled:checked:after,
  &:disabled:not(:checked):after {
    background: ${({ theme }) => theme.theme.grey};
  }

  &:not(:checked):after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  &:checked:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

export const RadioLabel = styled.label`
  position: relative;
  padding-left: 1.4rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  line-height: 0.9rem;
  display: inline-block;
`;

export const RadioContainer = styled.div`
  margin: 5px 0;
`;
