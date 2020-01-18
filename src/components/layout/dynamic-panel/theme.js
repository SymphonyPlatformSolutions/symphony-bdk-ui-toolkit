import styled, { createGlobalStyle } from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';

export const StyledPanelContainer = styled.div`
  border-radius: 2px;
  border: none;
  width: 100%;
  box-shadow: ${({ theme }) => (theme.mode === THEME_TYPES.DARK ? '' : '0 1px 16px -6px rgba(0, 0, 0, 0.1)')};
`;

export const RRTStyleOverride = createGlobalStyle`
  .RRT__tabs {
    background-color: ${({ theme }) => theme.colors.grey_050} !important;
  }
  .RRT__removable {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .RRT__removable-icon {
    margin-left: 10px;
    font-size: larger;
    font-weight: 900;
    font-size: unset;
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .RRT__tab {
    border-color: transparent;
    background-color: ${({ theme }) => theme.colors.grey_300} !important;
    margin-right: 1px;
    margin-top: 1px;
    border: none !important;
    width: 150px;
    :hover {
      background-color: ${({ theme }) => theme.colors.grey_400} !important;
    }
  }
  .RRT__tab--selected {
    margin-right: inherit;
    background-color: ${({ theme }) => theme.colors.grey_050} !important;
    margin-top: inherit;
    margin-left: -1px;
    :hover {
      background-color: ${({ theme }) => theme.colors.grey_050} !important;
    }
  }
  .RRT__tab--selected .RRT__removable-icon {
    position: relative !important;
    font-size: 1rem !important;
    right: 0 !important;
    top: 0 !important;
    margin-left: 0px;
  }
  .RRT__showmore {
    background: #eee;
    border: none !important;
    margin-top: 1px !important;
    cursor: pointer;
    z-index: 1;
    white-space: nowrap;
    position: relative;
    margin-left: 0px !important;
  }
  :focus {
    outline: 0;
  }
  .RRT__panel {
    border: none !important;
    background-color: ${({ theme }) => theme.colors.grey_050} !important;
  }
`;

export const TabHeader = styled.div`
  width: 160px;
  display: flex;
  justify-content: center;
  align-content: center;
`;


export const CloseIconWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary_050};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  margin-left: 5px;
  :hover {
    background-color: ${({ theme }) => theme.colors.secondary_100}
  }
;
`;
