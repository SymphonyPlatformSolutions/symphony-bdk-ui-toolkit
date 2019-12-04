import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import { transparentize } from 'polished';
import uuid from 'uuid';
import { Menu, contextMenu } from 'react-contexify';
import InputField from '../input-field';
import Tooltip from '../tooltip';
import Box from '../box';
import Text from '../text';
import { SearchIcon, DownChevron, EllipsisIcon } from '../icons';
import {
  MenuItem,
  getMenuBackgroundColor,
  ContextText,
  IconWrapper,
  IconSpinner,
  SearchWrapper,
  InputWrapper,
  SearchIconWrapper,
  InputFieldBackground,
  MenuWrapper,
  ToolTipContainer,
  CellWrapper,
  getHeaderColumnTextStyle,
} from './theme';

export const ContextMenu = withTheme(({ theme, id, item }) => (
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
));

const SortingIcon = ({ sorting, isSortedDesc, theme }) => {
  if (!sorting) {
    return (
      <IconWrapper>
        <IconSpinner>
          <DownChevron color={transparentize(0.6, theme.colors.grey_700)} />
        </IconSpinner>
      </IconWrapper>
    );
  }

  return (
    <IconWrapper>
      <IconSpinner desc={isSortedDesc}>
        <DownChevron color={theme.colors.primary_500} />
      </IconSpinner>
    </IconWrapper>
  );
};

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

export const Cell = ({ cell }) => {
  const {
    column: { hasActions },
    value,
  } = cell;
  const [contextId] = useState(hasActions && value ? uuid.v4() : null);

  const openContextMenu = (e, menuId) => {
    const rtlEvent = Object.assign(
      {},
      {
        x: e.x - 180,
        y: e.y,
        clientX: e.clientX - 180,
        clientY: e.clientY,
        stopPropagation: () => {
          e.stopPropagation();
        },
      },
    );
    contextMenu.show({ id: menuId, event: rtlEvent });
  };

  if (hasActions) {
    if (!value || !value.length) {
      return null;
    }

    return (
      <MenuWrapper type="flat">
        <MoreActionsIcon onClick={e => openContextMenu(e, contextId)} />
        <ContextMenu id={contextId} item={cell} />
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

export const HeaderCell = (props) => {
  const {
    Header, tooltip, theme, sortable, isSorted, isSortedDesc,
  } = props;

  return (
    <CellWrapper type="flat">
      <Box horizontal space={5}>
        <Text
          type="primary"
          isTitle
          size="tiny"
          style={getHeaderColumnTextStyle(theme)}
        >
          {typeof Header === 'string' ? Header : null}
        </Text>
        {tooltip && (
          <ToolTipContainer>
            <Tooltip color={theme.colors.grey_600} size={12}>
              {tooltip}
            </Tooltip>
          </ToolTipContainer>
        )}
        {sortable !== false && (
          <SortingIcon
            sorting={isSorted}
            isSortedDesc={isSortedDesc}
            theme={theme}
          />
        )}
      </Box>
    </CellWrapper>
  );
};

export const SearchBar = (props) => {
  const { executeFilter, theme } = props;
  const [typedValue, setTypedValue] = useState('');

  // Search debouncing
  useEffect(() => {
    if (!typedValue) {
      executeFilter('');
      return () => {};
    }
    const handler = setTimeout(() => {
      executeFilter(typedValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [typedValue]);

  return (
    <SearchWrapper>
      <InputWrapper>
        <SearchIconWrapper>
          <SearchIcon color={theme.colors.grey_400} size={12} />
        </SearchIconWrapper>
        <InputFieldBackground>
          <InputField
            placeholder="Search value..."
            value={typedValue}
            onChange={({ target: { value } }) => setTypedValue(value)}
            type="text"
            style={{ padding: '4px 4px 4px 20px', minHeight: 0 }}
          />
        </InputFieldBackground>
      </InputWrapper>
    </SearchWrapper>
  );
};
