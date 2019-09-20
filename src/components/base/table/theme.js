import React from 'react';
import styled from 'styled-components';
import { MoreVert } from 'styled-icons/material';
import { Menu } from 'react-contexify';
import { MdPlayArrow } from 'react-icons/md';
import { THEME_TYPES } from '../../../styles/colors';
import Box from '../box';
import Text from '../text';

const getBorderColor = theme => (theme.mode === THEME_TYPES.DARK
  ? theme.colors.inputgrey
  : theme.colors.lightgrey);

const getEmptyTableColor = theme => (theme.mode === THEME_TYPES.DARK
  ? theme.colors.inputgrey
  : theme.colors.lightgrey);

export const getTheadStyle = theme => ({
  style: {
    backgroundColor: getBorderColor(theme),
    boxShadow: 'none',
    minHeight: '36px',
    padding: '5px 0px',
  },
});

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
  getTheadThProps: () => ({
    style: {
      borderRight: 'none',
      boxShadow: 'none',
      display: 'flex',
      alignItems: 'center',
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
    padding: '0px',
    borderRadius: '4px',
    backgroundColor:
      theme.mode === THEME_TYPES.DARK ? '#2F3237' : theme.colors.white,
    boxShadow:
      theme.mode === THEME_TYPES.DARK
        ? '0 10px 20px rgba(0,0,0,.3), 0 0 0 1px #292929'
        : null,
  },
});

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  transform: rotate(${({ desc }) => (desc ? '90' : '270')}deg);
`;
export const SortingIcon = ({ sorting, columnId, theme }) => {
  if (!sorting || !sorting.length) {
    return null;
  }
  if (sorting[0].id !== columnId) {
    return null;
  }
  return (
    <IconWrapper desc={sorting[0].desc}>
      <MdPlayArrow color={theme.colors.textcolor} />
    </IconWrapper>
  );
};

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

export const MenuWrapper = styled(Box)`
  padding: 0;
  margin: 0px 19px;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const MenuItem = styled(Box)`
  height: 35px;
  padding-left: 15px;
  border-left: 4px solid transparent;
  &:hover {
    background-color: ${({ theme }) => (theme.mode === THEME_TYPES.DARK ? '#464B53' : '#F1F2F4')};
    border-top-left-radius: ${props => (props.isFirst ? '4px' : null)};
    border-bottom-left-radius: ${props => (props.isLast ? '4px' : null)};
    border-left: ${({ theme, accent }) => `4px solid ${theme.colors[accent]}`};
  }
`;

export const generateContextMenu = (theme, id, item) => (
  <Menu animation="fade" id={id} {...getMenuBackgroundColor(theme)}>
    {item.actionsMenu.map((menuItem, index, arr) => (
      <MenuItem
        type="flat"
        align="start"
        justify="center"
        accent={menuItem.type}
        isFirst={index === 0}
        isLast={index === arr.length - 1}
        onClick={() => menuItem.callback(item)}
      >
        <Text type="primary" size="small">
          {menuItem.label}
        </Text>
      </MenuItem>
    ))}
  </Menu>
);
