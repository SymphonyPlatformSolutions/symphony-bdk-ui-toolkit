import React from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { Menu } from 'react-contexify';
import uuid from 'uuid';
import Box from '../../../layout/box';
import {
  MenuItem,
  getMenuBackgroundColor,
  ContextText,
} from '../theme';

const TableContextMenu = ({ theme, id, item }) => (
  <Menu animation="fade" id={id} {...getMenuBackgroundColor(theme)}>
    <Box type="flat" my="8px">
      {item.value.map((menuItem, index, arr) => (
        <MenuItem
          key={uuid.v4()}
          type="flat"
          align="start"
          justify="center"
          isFirst={index === 0}
          isLast={index === arr.length - 1}
          onClick={() => menuItem.callback(item)}
        >
          <ContextText theme={theme} contextType={menuItem.type}>
            {menuItem.label}
          </ContextText>
        </MenuItem>
      ))}
    </Box>
  </Menu>
);

TableContextMenu.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};

export default withTheme(TableContextMenu);
