import React from 'react';
import styled, { withTheme } from 'styled-components';
import { MoreVert } from 'styled-icons/material';
import { Menu } from 'react-contexify';
import { darken, transparentize } from 'polished';
import uuid from 'uuid';
import InputField from '../input-field';
import { THEME_TYPES } from '../../../styles/colors';
import Box from '../box';
import Text from '../text';
import { SearchIcon, DownChevron } from '../icons';

export const getTheadStyle = (theme, searchable) => ({
  style: {
    backgroundColor: theme.colors.grey_100,
    boxShadow: 'none',
    minHeight: '48px',
    padding: '5px 0px',
    borderTopRightRadius: !searchable && '4px',
    borderTopLeftRadius: !searchable && '4px',
  },
});

export const getHeaderColumnTextStyle = theme => ({
  lineHeight: '1.2rem',
  color: theme.mode === THEME_TYPES.DARK ? theme.colors.white : darken(0.2, theme.colors.grey_400),
});

export const getPropsStyle = maxHeight => ({
  style: {
    width: '100%',
    border: 'none',
    maxHeight,
  },
});

export const getStyleProps = theme => ({
  getTheadThProps: () => ({
    style: {
      borderRight: 'none',
      boxShadow: 'none',
      display: 'flex',
      alignItems: 'center',
    },
  }),
  getTrGroupProps: () => ({
    style: {
      borderBottom: 0,
    },
  }),
  getTrProps: () => ({
    style: {
      borderTop: `1px solid ${theme.colors.lightgrey}`,
      height: '40px',
    },
  }),
  getNoDataProps: () => ({
    style: {
      background: 'none',
      top: '75%',
      padding: '4px 25px',
      color: theme.colors.grey_700,
    },
  }),
  getTdProps: () => ({
    style: {
      borderRight: 'none',
    },
  }),
  getTbodyProps: () => ({
    style: {
      border: `2px solid ${theme.colors.grey_100}`,
      borderBottomRightRadius: '4px',
      borderBottomLeftRadius: '4px',
    },
  }),
});

const overrides = {
  trGroup: 'rt-tr-group',
};

function getHover(props) {
  const { children: { props: { data } }, theme } = props;
  if (!data || !data.length) {
    return 'none';
  }
  return theme.colors.grey_200;
}

export const TableWrapper = styled.div.attrs(overrides)`
  .ReactTable .${overrides.trGroup} {
    transition: background-color 0.2s;
    :hover {
      background-color: ${props => getHover(props)};
    }
  }
`;

export const getMenuBackgroundColor = theme => ({
  style: {
    padding: '0px',
    borderRadius: '4px',
    border: `1px solid ${theme.colors.grey_200}`,
    backgroundColor: theme.colors.mainbackground,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  },
});

const IconWrapper = styled.div`
  position: absolute;
  left: 3px;
  top: 8px;
`;
const IconSpinner = styled.div`
  transform: ${({ desc }) => (desc
    ? 'rotate(0)'
    : 'rotate(180deg) translateY(-4px)')};
`;

const SearchWrapper = styled.div`
  width: calc(100%);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.grey_100};
`;
const InputWrapper = styled.div`
  position: relative;
  padding: 8px;
  width: 280px;
`;
const SearchIconWrapper = styled.div`
  position: absolute;
  z-index: 4;
  left: 14px;
  top: 17px;
`;
const InputFieldBackground = styled.div`
  background-color: ${({ theme }) => theme.colors.mainbackground};
`;

export const SearchBar = withTheme((props) => {
  const { theme, value, onChange } = props;
  return (
    <SearchWrapper theme={theme}>
      <InputWrapper>
        <SearchIconWrapper>
          <SearchIcon color={theme.colors.grey_400} size={12} />
        </SearchIconWrapper>
        <InputFieldBackground>
          <InputField
            placeholder="Search value"
            value={value}
            onChange={e => onChange(e.target.value)}
            type="text"
            style={{ padding: '4px 4px 4px 20px', minHeight: 0 }}
          />
        </InputFieldBackground>
      </InputWrapper>
    </SearchWrapper>
  );
});

export const SortingIcon = ({ sorting, columnId, theme }) => {
  if (!sorting || !sorting.length || sorting[0].id !== columnId) {
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
      <IconSpinner desc={sorting[0].desc}>
        <DownChevron color={theme.colors.primary_500} />
      </IconSpinner>
    </IconWrapper>
  );
};

export const EmptyTable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 9.5rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.grey_100};
`;

export const MoreActionsIcon = styled(MoreVert)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.primary_500};
  &:hover {
    cursor: pointer;
  }
`;

export const EmptyText = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_400};
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
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey_100};
    border-top-left-radius: ${props => (props.isFirst ? '4px' : null)};
    border-bottom-left-radius: ${props => (props.isLast ? '4px' : null)};
    border-left: ${({ theme, accent }) => `4px solid ${theme.colors[accent]}`};
  }
`;

const CONTEXT_COLORS = {
  neutral: 'grey_700',
  info: 'primary_500',
  error: 'error_500',
  warning: 'warning_500',
  success: 'success_50',
};

const getContextItemColor = ({ theme, contextType }) => {
  if (!contextType || !CONTEXT_COLORS[contextType]) {
    return CONTEXT_COLORS.neutral;
  }
  return theme.colors[CONTEXT_COLORS[contextType]];
};

const ContextText = styled(Text)`
  font-weight: bold;
  color: ${props => getContextItemColor(props)};
`;

export const generateContextMenu = (theme, id, item) => (
  <Menu animation="fade" id={id} {...getMenuBackgroundColor(theme)}>
    <Box type="flat" my="8px">
      {item.actionsMenu.map((menuItem, index, arr) => (
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
