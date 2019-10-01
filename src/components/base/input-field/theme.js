import styled from 'styled-components';
import { lighten, transparentize, darken } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';

const getPlaceholderColor = ({ theme, inputState }) => (inputState === 'error' ? theme.colors.danger : theme.colors.darkgrey);
const getInputColor = ({ theme, disabled }) => (disabled ? theme.colors.grey : theme.colors.primary);
const getLineColor = ({ theme, disabled }) => (disabled ? theme.colors.darkgrey : theme.colors.textcolor);

export const FloatInput = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleButtonText = styled.div`
  font-size: 0.875rem;
  padding-right: 7px;
  color: ${props => getInputColor(props)};
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
  pointer-events: ${p => (p.disabled ? 'none' : '')};
  z-index: 3;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

export const StyledInput = styled.input`
  padding: 9px 5px 9px 7px;
  border: 0;
  outline: none;
  font-size: 1rem;
  transition: all 0.3s;
  width: 100%;
  font-style: ${({ disabled }) => (disabled ? 'italic' : 'normal')};
  background-color: transparent;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.darkgrey : theme.colors.textcolor)};
  resize: vertical;
  font-family: "SymphonyLato", "Lato", "Segoe UI", "Helvetica Neue", "Verdana",
    "Arial", sans-serif !important;
  z-index: 2;
  position: relative;

  ::placeholder {
    transition: all 0.3s;
  }

  &:not(:focus)::placeholder {
    color: transparent;
  }
`;

export const TextArea = StyledInput.withComponent('textarea');

export const InputLine = styled.span`
  width: 100%;
  display: block;
  position: absolute;
  bottom: 0;

  &:before {
    content: "";
    height: 1px;
    width: 100%;
    bottom: 0;
    position: absolute;
    border-bottom: 1px ${({ disabled }) => (disabled ? 'dotted' : 'solid')}
      ${props => getLineColor(props)};
  }

  ${StyledInput}:hover:not(:disabled) ~ &:before {
    border-bottom: 2px solid ${props => getLineColor(props)};
  }

  &:after {
    content: "";
    height: 2px;
    width: ${({ error }) => (error ? '100%' : 0)};
    bottom: 0;
    position: absolute;
    background: ${({ error, theme }) => (error ? theme.colors.danger : theme.colors.primary)};
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
  }

  ${StyledInput}:focus ~ &:after,
  ${TextArea}:focus ~ &:after {
    width: 100%;
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  left: 7px;
  font-size: 1rem;
  transition: all 0.2s;
  top: 10px;
  color: ${props => getPlaceholderColor(props)};
  font-style: ${({ disabled }) => (disabled ? 'italic' : 'normal')};
  ${StyledInput}:focus + &,
  ${StyledInput}:valid + &,
  ${TextArea}:focus + &,
  ${TextArea}:valid + &,
  &.override-label {
    color: ${({ theme, error, disabled }) => (disabled ? theme.colors.darkgrey : (error ? theme.colors.danger : theme.colors.primary))};
    top: -14px;
    font-size: 12px;
  }
  z-index: 1;
`;

export const Container = styled.div`
  margin-top: 16px;
  background: ${({ theme, disabled }) => (theme.mode === THEME_TYPES.DARK ? (disabled ? transparentize(0.86, darken(0.7, theme.colors.white)) : transparentize(0.86, darken(0.4, theme.colors.white))) : 'transparent')};
  transition: background 0.3s;

  :hover {
    background: ${({ theme, disabled }) => (theme.mode === THEME_TYPES.DARK
    ? disabled
      ? undefined
      : transparentize(0.82, darken(0.15, theme.colors.white))
    : 'transparent')};
  }
`;
