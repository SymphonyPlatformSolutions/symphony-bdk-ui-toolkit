import React from 'react';
import AutoFetchWrapper from '.';
import Box from '../../layout/box';
import { CellWrapper } from '../../data/table/theme';
import Table from '../../data/table';
import Text from '../../misc/text';
import Search from '../../inputs/search';
import Button from '../../misc/button';


const autoFetchConfig = {
  endpoint: 'https://reqres.in/api/users',
  params: { page: 2 },
  handleData: (results) => results.data,
};

const duckDuckGoFetchConfig = {
  endpoint: 'https://api.duckduckgo.com',
  params: { format: 'json', q: null },
  handleData: (results) => results.RelatedTopics,
};

const COLUMNS_WITH_AUTO_FETCH = [{
  header: 'Picture',
  tooltip: 'The person picture',
  accessor: 'avatar',
  Cell: ({ cell }) => (
    <CellWrapper>
      <img src={cell.value} width={32} />
    </CellWrapper>
  ),
  width: 100,
}, {
  header: 'Name',
  tooltip: 'The person Name',
  accessor: 'id',
  Cell: ({ row: { original } }) => (
    <CellWrapper>
      <Text>{original.first_name} {original.last_name}</Text>
    </CellWrapper>
  ),
  width: 150,
}, {
  header: 'Email address',
  tooltip: 'The person email address',
  accessor: 'email',
}];

const SearchExample = ({ data, refreshData }) => {
  const searchFunc = async (searchTerm) => {
    if (!searchTerm) {
      return;
    }

    refreshData({
      params: {
        format: 'json',
        q: encodeURIComponent(searchTerm),
      },
    });
  };
  return (
    <Box>
      <Box type="flat" vertical>
        <Search
          data={data}
          dataLabel="Text"
          placeholder="Search DuckDuckGo..."
          searchHandler={searchFunc}
        />
      </Box>
    </Box>
  );
};

const RefreshExample = ({ data, loading, refreshData }) => {
  const onRefresh = () => {
    refreshData({ params: { page: 1 + Math.round((Math.random() * 1)), delay: 1.5 } });
  };
  return (
    <Box>
      <Box>
        <Button onClick={onRefresh}>Refresh</Button>
      </Box>
      <Box type="flat" vertical>
        <Table
          loading={loading}
          data={data}
          columns={COLUMNS_WITH_AUTO_FETCH}
        />
      </Box>
    </Box>
  );
};

export const SearchCompExample = () => (
  <Box style={{ height: '300px', width: '90%' }}>
    <AutoFetchWrapper config={duckDuckGoFetchConfig}>
      <SearchExample />
    </AutoFetchWrapper>
  </Box>
);

export const TableExample = () => (
  <Box style={{ height: '300px', width: '90%' }}>
    <AutoFetchWrapper config={autoFetchConfig}>
      <Table
        columns={COLUMNS_WITH_AUTO_FETCH}
      />
    </AutoFetchWrapper>
  </Box>
);

export const ManualRefreshExample = () => (
  <Box style={{ height: '300px', width: '90%' }}>
    <AutoFetchWrapper config={autoFetchConfig}>
      <RefreshExample />
    </AutoFetchWrapper>
  </Box>
);
