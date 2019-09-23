import { darken } from 'polished';
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

const getBackgroundColor = ({ theme }) => (
  theme.mode === THEME_TYPES.DARK
    ? theme.colors.inputgrey
    : 'transparent'
);

const getInputFocusBorderColor = ({ theme, inputState }) => (inputState === 'error'
  ? theme.colors.danger
  : theme.colors.primary
);

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
  }
  
  .${overrides.formControl} {
    font-size: 1rem;
    transition: border 1s cubic-bezier(.25,.8,.25,1);
    height: 40px !important;
    padding-left: 57px !important;
    width: 100% !important;
    border: 1px solid ${props => getThemedBorderColor(props)} !important;
    border-radius: 3px !important;
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
     border-color: ${props => getInputFocusBorderColor(props)} !important;
    }
  }
  
  .${overrides.flagDropdownButton} {
    background-color: transparent !important;
    border-radius: 0 !important;
    border: none !important;
    .selected-flag {
      background-color: transparent !important;
    }
    
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
    border-radius: 3px !important;
    color: ${props => getDropdownColor(props)} !important;
    background-color: ${props => getDropdownBackgroundColor(props)} !important;
    border: 1px solid ${props => getThemedBorderColor(props)} !important;
    width: ${props => getDropdownWidth(props)} !important;
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
      border-radius: 4px !important;
    }
    .dial-code {
      color: ${({ theme }) => darken(0.5, theme.colors.lightgrey)} !important;
    }
    .country {
      height: 40px !important;
    }
    .country:hover {
      color: ${({ theme }) => theme.colors.lightgrey} !important;
      background-color: ${({ theme }) => theme.colors.secondary} !important;
     .dial-code {
        color: ${({ theme }) => theme.colors.lightgrey} !important;
      }
    }

    .highlight {
      color: ${({ theme }) => theme.colors.lightgrey} !important;
      .dial-code {
        color: ${({ theme }) => theme.colors.lightgrey} !important;
      }
      background-color: ${({ theme }) => theme.colors.primary} !important;
    }
  }
 }
`;
