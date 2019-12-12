import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import AutoFetchWrapper from '.';
import Box from '../../base/box';
import { StoryWrapper } from '../../base/wrappers';
import Info from './info.md';
import { CellWrapper } from '../../base/table/theme';
import Table from '../../base/table';
import Text from '../../base/text';
import DataGrid from '../../base/data-grid';
import Search from '../../base/search';
import Button from '../../base/button';


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
    <img src={cell.value} width={32} />
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

const DATA_GRID_COLUMNS_WITH_AUTO_FETCH = [{
  name: 'First Name',
  key: 'first_name',
  editable: true,
}, {
  name: 'Last Name',
  key: 'last_name',
  editable: true,
}, {
  name: 'Email Address',
  key: 'email',
  editable: true,
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

storiesOf('Helpers', module)
  .addDecorator(withKnobs)
  .add('Auto fetch Wrapper', () => (
    <StoryWrapper p={15}>
      <Box p={15}>
        <Box horizontal>
          <Box style={{ width: '50%' }}>
            <Text isTitle>Search with Auto fetch</Text>
            <Box space={60} p="0 16px 0 0">
              <AutoFetchWrapper config={duckDuckGoFetchConfig}>
                <SearchExample />
              </AutoFetchWrapper>
            </Box>
          </Box>
          <Box style={{ width: '50%' }}>
            <Text isTitle>Table with Auto Fetch</Text>
            <Box space={60} p="0 16px 0 0">
              <AutoFetchWrapper config={autoFetchConfig}>
                <Table
                  columns={COLUMNS_WITH_AUTO_FETCH}
                />
              </AutoFetchWrapper>
            </Box>
          </Box>
        </Box>
        <Box horizontal>
          <Box style={{ width: '50%' }}>
            <Text isTitle>Table with Auto fetch and manual refresh</Text>
            <Box space={60} p="0 16px 0 0">
              <AutoFetchWrapper config={autoFetchConfig}>
                <RefreshExample />
              </AutoFetchWrapper>
            </Box>
          </Box>
          <Box style={{ width: '50%' }}>
            <Text isTitle>Data Grid with Auto Fetch</Text>
            <Box space={60} p="0 16px 0 0">
              <AutoFetchWrapper config={autoFetchConfig}>
                <DataGrid
                  enableCellSelect
                  columns={DATA_GRID_COLUMNS_WITH_AUTO_FETCH}
                />
              </AutoFetchWrapper>
            </Box>
          </Box>
        </Box>
      </Box>
    </StoryWrapper>
  ),
  {
    notes: {
      markdown: Info,
    },
  });
