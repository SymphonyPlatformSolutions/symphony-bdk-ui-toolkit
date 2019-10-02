import styled from 'styled-components';
import { transparentize, darken } from 'polished';
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
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
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
  cursor: ${p => (p.disabled ? 'not-allowed' : (p.readOnly ? 'default' : 'pointer'))};

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
    width: ${({ readOnly }) => (readOnly ? '0' : '100%')};
    bottom: 0;
    position: absolute;
    border-bottom: 1px solid ${props => getLineColor(props)};
  }

  &:after {
    content: "";
    height: 1px;
    width: ${({ error }) => (error ? '100%' : 0)};
    bottom: 0;
    position: absolute;
    background: ${({ error, theme }) => (error ? theme.colors.danger : theme.colors.primary)};
    transition: all 0.4s;
  }

  ${StyledInput}:focus ~ &:after,
  ${TextArea}:focus ~ &:after {
    width: ${({ readOnly }) => (readOnly ? undefined : '100%')};
  }
`;

function getLabelColor({
  theme, error, disabled, readOnly,
}) {
  if (disabled) {
    return theme.colors.darkgrey;
  }
  if (error) {
    return theme.colors.danger;
  }
  if (readOnly) {
    return theme.colors.textcolor;
  }

  return theme.colors.primary;
}

export const InputLabel = styled.label`
  position: absolute;
  left: 7px;
  font-size: 1rem;
  transition: all 0.2s;
  top: 10px;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.darkgrey : theme.colors.textcolor)};
  font-style: ${({ disabled }) => (disabled ? 'italic' : 'normal')};
  ${StyledInput}:focus + &,
  ${TextArea}:focus + &,
  &.override-label {
    color: ${props => getLabelColor(props)};
    top: -14px;
    left: 2px;
    font-size: 12px;
  }

  ${StyledInput}:valid + &,
  ${TextArea}:valid + & {
    color: ${({ theme, error }) => (error ? theme.colors.danger : undefined)};
    top: -14px;
    font-size: 12px;
    left: 2px;
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
