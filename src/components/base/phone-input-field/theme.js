import { darken } from 'polished';
import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';


const getThemedBorderColor = ({ theme, inputState, disabled }) => {
  const border = {
    initial: darken(0.1, theme.theme.grey),
    modified: theme.theme.darkgrey,
    error: theme.theme.danger,
  };
  return disabled ? theme.theme.grey : border[inputState];
};


const getColor = ({ theme, inputState }) => (inputState === 'error'
  ? theme.theme.danger
  : (theme.mode === THEME_TYPES.DARK
    ? theme.theme.basegrey
    : theme.theme.darkaccent)
);

const getDropdownColor = ({ theme }) => (theme.mode === THEME_TYPES.DARK
  ? theme.theme.basegrey
  : theme.theme.darkaccent);

const getPlaceholderColor = ({ theme, inputState }) => (
  inputState === 'error'
    ? theme.theme.danger
    : theme.theme.darkgrey
);

const getBackgroundColor = ({ theme }) => (
  theme.mode === THEME_TYPES.DARK
    ? '#2F3237'
    : 'transparent'
);

const getInputFocusBorderColor = ({ theme, inputState }) => (inputState === 'error'
  ? theme.theme.danger
  : theme.theme.primary
);

const overrides = {
  container: 'react-tel-input',
  formControl: 'form-control',
  flagDropdownButton: 'flag-dropdown',
  searchHover: 'selected-flag',
  flag: 'flag',
  selectedFlag: 'selected-flag',
  flagDropdownMenu: 'country-list',
};

const getDropdownBackgroundColor = ({ theme, disabled }) => (disabled ? theme.theme.lightgrey : theme.mode === THEME_TYPES.DARK ? '#2F3237' : theme.theme.white);

const getDropdownWidth = ({ hasRef }) => (hasRef ? `${hasRef.clientWidth}px` : 'auto');

export const PhoneInputWrapper = styled.div.attrs(overrides)`
  .${overrides.container} {
     width: 100%;
     borderRadius: 0;
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
  
  .${overrides.flag} {
    transform: scale(1.1);
  }

  .${overrides.selectedFlag} {
    margin-left: 7px;
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
    .dial-code {
      color: ${({ theme }) => darken(0.5, theme.theme.lightgrey)} !important;
    }
    .country {
      height: 40px !important;
    }
    .country:hover {
      color: ${({ theme }) => theme.theme.lightgrey} !important;
      background-color: ${({ theme }) => theme.theme.secondary} !important;
     .dial-code {
        color: ${({ theme }) => theme.theme.lightgrey} !important;
      }
    }

    .highlight {
      color: ${({ theme }) => theme.theme.lightgrey} !important;
      .dial-code {
        color: ${({ theme }) => theme.theme.lightgrey} !important;
      }
      background-color: ${({ theme }) => theme.theme.primary} !important;
    }
  }
 }
`;
