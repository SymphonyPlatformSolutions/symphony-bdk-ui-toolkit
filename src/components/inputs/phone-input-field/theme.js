import { darken, transparentize } from 'polished';
import styled from 'styled-components';
import Text from '../../misc/text';
import { THEME_TYPES } from '../../../styles/colors';


const getThemedBorderColor = ({ theme, inputState }) => {
  if (inputState === 'error') {
    return theme.colors.error_400;
  }

  return theme.colors.grey_400;
};

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

const getDropdownWidth = ({ hasRef }) => (hasRef ? `${hasRef.clientWidth}px` : 'auto');

export const PhoneInputWrapper = styled.div.attrs(overrides)`
  .${overrides.container} {
    width: 100%;
    border-radius: 0;
    border: 0;
  }

  .${overrides.formControl} {
    font-size: 1rem;
    transition: border 1s cubic-bezier(.25,.8,.25,1);
    height: 33px !important;
    padding-left: 57px !important;
    width: 100% !important;
    border: none !important;
    border-radius: 0px !important;
    color: ${({ theme }) => theme.colors.grey_700};
    background-color: transparent !important;
    cursor: ${props => (props.disabled ? 'inherit' : 'text')};

    &:disabled {
      opacity: .8;
      cursor: not-allowed;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.grey_300};
    }

    &:focus {
     outline: none;
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
      border-top: ${({ theme }) => `3px solid ${theme.colors.grey_500} !important`};

      &.up {
        border-top: none !important;
        border-bottom: ${({ theme }) => `3px solid ${theme.colors.grey_500} !important`};
      }
    }
  }

  .${overrides.flagDropdownMenu} {
    border-radius: 0px !important;
    color: ${({ theme }) => theme.colors.grey_700} !important;
    background-color: ${({ theme }) => theme.colors.mainbackground} !important;
    border: 1px solid ${props => getThemedBorderColor(props)} !important;
    width: ${props => getDropdownWidth(props)} !important;
    margin: 0 0 10px -1px !important;
    .search {
      position: relative !important;
      padding: 5px 4px !important;
    }
    .search-box {
      font-family: "SymphonyLato", "Lato", "Segoe UI", "Helvetica Neue", "Verdana",
    "Arial", sans-serif !important;
      font-size: 1rem !important;
      margin-left: 6px !important;
      padding: 4px 4px !important;
      width: -webkit-fill-available !important;
      border-radius: 0px !important;
    }
    .dial-code {
      color: ${({ theme }) => darken(0.5, theme.colors.grey_500)} !important;
    }
    .country {
      height: 34px !important;
    }
    .country:hover {
      color: ${({ theme }) => theme.colors.grey_700} !important;
      background-color: ${({ theme }) => theme.colors.grey_200} !important;
     .dial-code {
        color: ${({ theme }) => theme.colors.grey_900} !important;
      }
    }

    .highlight {
      color: ${({ theme }) => theme.colors.grey_700} !important;
      .dial-code {
        color: ${({ theme }) => theme.colors.grey_900} !important;
      }
      background-color: ${({ theme }) => theme.colors.primary_500} !important;
    }
  }
 
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  background-color: transparent;
  transition: all 0.3s;
`;

export const InputLabel = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_600};
  font-weight: bold;
`;

export const Container = styled.div`
  margin-top: 3px;
  background: ${({ theme, disabled }) => (disabled ? theme.colors.grey_050 : 'transparent')};
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.error_500 : theme.colors.grey_300)};
  border-radius: 4px;
  transition: all 0.3s ease;
  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.oldprimary_400};
  }
`;
