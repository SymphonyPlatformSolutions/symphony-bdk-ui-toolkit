import React from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
} from 'react-table';
import styled, { withTheme } from 'styled-components';
import { darken, transparentize } from 'polished';
import Tooltip from '../tooltip';
import Text from '../text';
import Box from '../box';
import { SearchIcon, DownChevron } from '../icons';
import {
  THead,
  THeadTh,
  TBodyTr,
  TBody,
  getHeaderColumnTextStyle,
} from './theme';

const IconWrapper = styled.div`
  margin-left: 8px;
`;
const IconSpinner = styled.div`
  transform-origin: 50% 50%;
  transition: all 0.2s;
  transform: ${({ desc }) => (desc ? 'rotate(0) translateY(-2px)' : 'rotate(180deg) translateY(-2px)')};
`;
const CellWrapper = styled(Box)`
  margin: 0px 19px;
  align-items: start;
  justify-content: center;
  height: 100%;
`;
const ToolTipContainer = styled.span`
  transform: translateY(-1px);
`;

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

const Cell = (props) => {
  const { column: { CustomCell }, value } = props;

  if (CustomCell) {
    return (<CustomCell {...props} />);
  }

  return (
    <CellWrapper type="flat">
      <Text type="primary" size="small">{value}</Text>
    </CellWrapper>
  );
};
const HeaderCell = (props) => {
  const {
    Header,
    tooltip,
    theme,
    sortable,
    isSorted,
    isSortedDesc,
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
          {Header}
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

const Table = (props) => {
  const { data, columns, theme } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  const renderThing = col => <HeaderCell theme={theme} {...col} />;

  const prepareHeaderProps = (col) => {
    if (col.sortable === false) {
      return col.getHeaderProps();
    }
    return col.getHeaderProps(col.getSortByToggleProps());
  };

  return (
    <table {...getTableProps()}>
      <THead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <THeadTh {...prepareHeaderProps(column)}>
                {renderThing(column)}
              </THeadTh>
            ))}
          </tr>
        ))}
      </THead>
      <TBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TBodyTr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}><Cell {...cell} row={row} /></td>
              ))}
            </TBodyTr>
          );
        })}
      </TBody>
    </table>
  );
};

export default withTheme(Table);
