import React from 'react';
import styled from 'styled-components';
import { MoreVert } from 'styled-icons/material';
import {
  Menu,
} from 'react-contexify';
import { THEME_TYPES } from '../../../styles/colors';
import Box from '../box';
import Text from '../text';

const getBorderColor = theme => (
  theme.mode === THEME_TYPES.DARK
    ? theme.colors.inputgrey
    : theme.colors.lightgrey
);

const getEmptyTableColor = theme => (
  theme.mode === THEME_TYPES.DARK
    ? theme.colors.inputgrey
    : theme.colors.lightgrey
);

export const getStyleProps = theme => ({
  getProps: () => ({
    style: {
      width: '100%',
      border: `2px solid ${getBorderColor(theme)}`,
      borderWidth: '2px 2px 0px 2px',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
    },
  }),
  getTheadProps: () => ({
    style: {
      backgroundColor: getBorderColor(theme),
      boxShadow: 'none',
      minHeight: '36px',
      padding: '5px 0px',
    },
  }),
  getTheadThProps: () => ({
    style: {
      borderRight: 'none',
    },
  }),
  getTrProps: () => ({
    style: {
      borderBottom: `2px solid ${getBorderColor(theme)}`,
      height: '40px',
    },
  }),
  getTdProps: () => ({
    style: {
      borderRight: 'none',
    },
  }),
});

export const getMenuBackgroundColor = theme => ({
  style: {
    backgroundColor: theme.mode === THEME_TYPES.DARK ? theme.colors.darkaccent : theme.colors.white,
    boxShadow: theme.mode === THEME_TYPES.DARK ? '0 10px 20px rgba(0,0,0,.3), 0 0 0 1px #292929' : null,
  },
});

export const EmptyTable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 9.5rem;
  border-radius: 3px;
  background-color: ${({ theme }) => getEmptyTableColor(theme)};
`;

export const MoreActionsIcon = styled(MoreVert)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => (theme.mode === THEME_TYPES.LIGHT ? '#006CAF' : 'white')};
  &:hover {
    cursor: pointer;
  }
`;

export const EmptyText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkgrey};
`;

export const CellWrapper = styled(Box)`
  margin: 0px 19px;
  align-items: start;
  justify-content: center;
  height: 100%;
`;

export const MenuItem = styled(Box)`
  height: 35px;
  padding-left: 15px;
  &:hover {
    & > div {
    color: ${({ theme }) => theme.colors.white} !important;
    }
   
    background-color: ${props => props.accent};
  }
`;

export const generateContextMenu = (theme, id, onEdit, onDelete, item) => (
  <Menu animation="zoom" id={id} {...getMenuBackgroundColor(theme)}>
    {onEdit && (
    <MenuItem type="flat" align="start" justify="center" accent={theme.colors.primary} onClick={() => onDelete(item)}>
      <Text type="primary" size="small">Edit</Text>
    </MenuItem>
    )}
    {onDelete && (
    <MenuItem type="flat" align="start" justify="center" accent={theme.colors.danger} onClick={() => onDelete(item)}>
      <Text type="primary" size="small">Delete</Text>
    </MenuItem>
    )}
  </Menu>
);
