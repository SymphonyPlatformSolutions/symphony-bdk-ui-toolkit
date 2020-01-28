import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { contextMenu } from 'react-contexify';
import uuid from 'uuid';
import Text from '../../../misc/text';
import { EllipsisIcon } from '../../../misc/icons';
import TableContextMenu from './context-menu';
import {
  MenuWrapper,
  CellWrapper,
} from '../theme';

const MenuIconWrapper = styled(EllipsisIcon)`
width: 24px;
height: 24px;
transform: rotate(90deg);
&:hover {
  cursor: pointer;
}
`;

const MoreActionsIcon = withTheme((props) => {
  const { onClick, theme } = props;
  return (
    <MenuIconWrapper
      onClick={onClick}
      color={theme.colors.primary_500}
    />
  );
});

const TableCell = ({ cell }) => {
  const {
    column: { hasActions },
    value,
  } = cell;

  const [contextId] = useState(hasActions && value ? uuid.v4() : null);

  const openContextMenu = (e, menuId) => {
    const rtlEvent = {

      x: e.x - 180,
      y: e.y,
      clientX: e.clientX - 180,
      clientY: e.clientY,
      stopPropagation: () => {
        e.stopPropagation();
      },
    };
    contextMenu.show({ id: menuId, event: rtlEvent });
  };

  if (hasActions) {
    if (!value || !value.length) {
      return null;
    }

    return (
      <MenuWrapper type="flat">
        <MoreActionsIcon onClick={e => openContextMenu(e, contextId)} />
        <TableContextMenu id={contextId} item={cell} />
      </MenuWrapper>
    );
  }

  return (
    <CellWrapper type="flat">
      <Text type="primary" size="small">
        {value}
      </Text>
    </CellWrapper>
  );
};

TableCell.propTypes = {
  cell: PropTypes.object.isRequired,
};

export default TableCell;
