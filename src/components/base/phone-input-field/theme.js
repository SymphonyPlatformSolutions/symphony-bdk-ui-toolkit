import { darken, transparentize } from 'polished';
import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';


const getThemedBorderColor = ({ theme, inputState }) => {
  if (inputState === 'error') {
    return theme.colors.danger;
  }

  return theme.colors.bordergrey;
};

const getColor = ({ theme, inputState }) => (inputState === 'error'
  ? theme.colors.danger
  : (theme.mode === THEME_TYPES.DARK
    ? theme.colors.basegrey
    : theme.colors.darkaccent)
);

const getDropdownColor = ({ theme }) => (theme.mode === THEME_TYPES.DARK
  ? theme.colors.basegrey
  : theme.colors.darkaccent);

const getPlaceholderColor = ({ theme, inputState }) => (
  inputState === 'error'
    ? theme.colors.danger
    : theme.colors.darkgrey
);

const getBackgroundColor = ({ theme, disabled }) => (theme.mode === THEME_TYPES.DARK ? (disabled ? transparentize(0.86, darken(0.7, theme.colors.white)) : transparentize(0.86, darken(0.4, theme.colors.white))) : 'transparent');

const overrides = {
  container: 'react-tel-input',
  formControl: 'form-control',
  flagDropdownButton: 'flag-dropdown',
  searchHover: 'selected-flag',
  flag: 'flag',
  selectedFlag: 'selected-flag',
  flagDropdownMenu: 'country-list',
  search: 'search',
};

const getDropdownBackgroundColor = ({ theme, disabled }) => (disabled ? theme.colors.lightgrey : theme.mode === THEME_TYPES.DARK ? theme.colors.inputgrey : theme.colors.white);

const getDropdownWidth = ({ hasRef }) => (hasRef ? `${hasRef.clientWidth}px` : 'auto');

export const PhoneInputWrapper = styled.div.attrs(overrides)`
  .${overrides.container} {
     width: 100%;
     border-radius: 0;
     border: none;
     & > input {
       font-style: ${({ disabled }) => (disabled ? 'italic !important' : 'normal')};
     }
  }

  .${overrides.formControl} {
    font-size: 1rem;
    transition: border 1s cubic-bezier(.25,.8,.25,1);
    height: 40px !important;
    padding-left: 57px !important;
    width: 100% !important;
    border: none !important;
    border-radius: 0px !important;
    color: ${props => getColor(props)};
    background-color: ${props => getBackgroundColor(props)} !important;
    cursor: ${props => (props.disabled ? 'inherit' : 'text')};

    &:disabled {
      opacity: .8;
      cursor: not-allowed;
    }

    &::placeholder {
      color: ${props => getPlaceholderColor(props)};
    }

    &:focus {
     outline: none;
    }

    &:hover {
      background-color: ${({ theme, disabled }) => (theme.mode === THEME_TYPES.DARK
    ? disabled
      ? undefined
      : `${transparentize(0.82, darken(0.15, theme.colors.white))} !important`
    : 'transparent !important')};
    }
  }

  .${overrides.flagDropdownButton} {
    background-color: transparent !important;
    border-radius: 0 !important;
    border: none !important;
    .selected-flag {
      background-color: transparent !important;
    }
  filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : undefined)};
  }

  .${overrides.searchHover} {
    &:hover {
      background-color: transparent;
      border: none;
      border-radius: 0;
    }
  }

  .${overrides.selectedFlag} {
    border-radius: none;
    background-color: none;
    .arrow {
      margin-left: 5px !important;
      transform: scale(1.5) !important;
      border-top: ${props => `3px solid ${getDropdownColor(props)} !important`};

      &.up {
        border-top: none !important;
        border-bottom: ${props => `3px solid ${getDropdownColor(props)} !important`};
      }
    }
  }

  .${overrides.flagDropdownMenu} {
    border-radius: 0px !important;
    color: ${props => getDropdownColor(props)} !important;
    background-color: ${props => getDropdownBackgroundColor(props)} !important;
    border: 1px solid ${props => getThemedBorderColor(props)} !important;
    width: ${props => getDropdownWidth(props)} !important;
    margin: 0 0 10px -1px !important;
    .search {
      position: relative !important;
      padding: 5px 4px !important;
    }
    .search-box {
      font-family: "SymphonyLato", "Lato", "Segoe UI", "Helvetica Neue", "Verdana", "Arial", sans-serif !important;
      font-size: 16px !important;
      line-height: 16px !important;
      margin-left: 6px !important;
      padding: 4px 4px !important;
      width: -webkit-fill-available !important;
      border-radius: 0px !important;
    }
    .dial-code {
      color: ${({ theme }) => darken(0.5, theme.colors.textcolor)} !important;
    }
    .country {
      height: 34px !important;
    }
    .country:hover {
      color: ${({ theme }) => theme.colors.textcolor} !important;
      background-color: ${({ theme }) => theme.colors.secondary} !important;
     .dial-code {
        color: ${({ theme }) => theme.colors.textcolor} !important;
      }
    }

    .highlight {
      color: ${({ theme }) => theme.colors.textcolor} !important;
      .dial-code {
        color: ${({ theme }) => theme.colors.textcolor} !important;
      }
      background-color: ${({ theme }) => theme.colors.primary} !important;
    }
  }
 
 position: relative;
`;

function getLineColor(props) {
  const { theme } = props;

  return theme.colors.textcolor;
}

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

  div:hover:not(:disabled) ~ &:before {
    border-bottom: ${props => (props.disabled ? undefined : `2px solid ${getLineColor(props)}`)};
  }

  &:after {
    content: "";
    height: 2px;
    width: ${({ error, focused }) => (error || focused ? '100%' : 0)};
    bottom: 0;
    position: absolute;
    background: ${({ error, theme }) => (error ? theme.colors.danger : theme.colors.primary)};
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  left: 7px;
  font-size: 1rem;
  transition: all 0.2s;
  font-style: ${({ disabled }) => (disabled ? 'italic' : 'normal')};
  color: ${({ theme, error, disabled }) => (disabled ? theme.colors.darkgrey : (error ? theme.colors.danger : theme.colors.primary))};
  top: -14px;
  font-size: 12px;
  z-index: 1;
`;

export const Container = styled.div`
  margin-top: 7px;
`;
