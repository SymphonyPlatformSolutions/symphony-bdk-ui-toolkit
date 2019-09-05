import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import DataTable from 'react-data-table-component';
import Text from '../text';
import {
  getBorderColor,
  getHeaderFontColor,
  getEmptyTableColor,
} from './theme';
import Loader from '../loader';

const EmptyTable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 9.5rem;
  border-radius: 3px;
  background-color: ${({ theme }) => getEmptyTableColor(theme)};
`;

const CustomTable = styled(DataTable)`
  .rdt_TableHeadRow {
    background-color: ${({ theme }) => getBorderColor(theme)};
    font-family: 'Lato', sans-serif;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    min-height: 36px;
  }
  
  .rdt_TableHeader {
    display: none;
  }

  .rdt_TableCol .rdt_TableCol_Sortable {
    font-weight: bold;
    font-size: 14px;
    color: ${({ theme }) => getHeaderFontColor(theme)}
  }

  .rdt_TableRow {
    border: 2px solid ${({ theme }) => getBorderColor(theme)};
    border-top: none;
    min-height: 36px;
  }

  .rdt_TableCell div:first-child {
    overflow: inherit;
  }
`;

const EmptyText = styled(Text)`
  color: #676a70;
`;

const Table = (props) => {
  const {
    data, columns, theme, loading, emptyMessage,
  } = props;

  if (loading) {
    return (
      <EmptyTable>
        <Loader type="v2" />
      </EmptyTable>
    );
  }

  if (!data || !data.length) {
    return <EmptyTable><EmptyText>{emptyMessage}</EmptyText></EmptyTable>;
  }

  const textColumns = columns.map((el) => {
    if (el.cell) { return el; }
    return {
      ...el,
      cell: row => <Text px="0px" py="0px" type="primary" size="small">{row[el.selector]}</Text>,
    };
  });
  return (<CustomTable theme={theme} data={data} columns={textColumns} />);
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  theme: PropTypes.object.isRequired,
};

Table.defaultProps = {
  data: null,
  columns: null,
  loading: false,
  emptyMessage: 'You have no content to display!',
};

export default withTheme(Table);
