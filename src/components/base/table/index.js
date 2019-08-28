import React from 'react';
import { PropTypes } from 'prop-types';
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
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 9.5rem;
  background-color: ${({ theme }) => getEmptyTableColor(theme)};
`;

const CustomTable = styled(DataTable)`
  .rdt_TableHeadRow {
    background-color: ${({ theme }) => getBorderColor(theme)};
    font-family: "Lato", sans-serif;
    border-radius: 2px;
  }

  .rdt_TableHeader {
    display: none;
  }

  .rdt_TableCol .rdt_TableCol_Sortable {
    font-weight: bold;
    font-size: 14px;
    color: ${({ theme }) => getHeaderFontColor(theme)};
  }

  .rdt_TableRow {
    border-bottom: 2px solid ${({ theme }) => getBorderColor(theme)};
    border-top: none;
    min-height: 36px;
  }
`;

const NoPaddingText = styled(Text)`
  padding: 0;
`;
const EmptyText = styled(Text)`
  color: #676a70;
`;
const LoaderContainer = styled.div`
  height: 30px;
`;

const Table = ({
  data, columns, theme, loading, emptyMessage,
}, ...rest) => {
  if (loading) {
    return (
      <EmptyTable>
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      </EmptyTable>
    );
  }

  if (!data || !data.length) {
    return (
      <EmptyTable>
        <EmptyText>{emptyMessage}</EmptyText>
      </EmptyTable>
    );
  }

  const textColumns = columns.map((el) => {
    if (el.cell) {
      return el;
    }
    return {
      ...el,
      cell: row => (
        <NoPaddingText size="small">{row[el.selector]}</NoPaddingText>
      ),
    };
  });
  return <CustomTable theme={theme} data={data} columns={textColumns} {...rest} />;
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
