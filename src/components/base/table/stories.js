import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import Table from '.';
import Box from '../box';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';
import Text from '../text';

const handleTestEdit = (item) => {
  console.log(item);
};

const handleTestDelete = (item) => {
  console.log(item);
};
const DATA = [{
  email: '4@domain.com',
  name: 'A',
  link: 'http://a.com',
}, {
  email: '3@domain.com',
  name: 'B',
  link: 'http://b.com',
}, {
  email: '2@domain.com',
  name: 'C',
  link: 'http://c.com',
}, {
  email: '1@domain.com',
  name: 'D',
  link: 'http://d.com',
}];

const COLUMNS = [{
  Header: 'Name',
  tooltip: 'This column is not sortable',
  accessor: 'name',
  width: undefined,
  sortable: false,
}, {
  Header: 'Email',
  accessor: 'email',
  width: undefined,
  tooltip: 'This column is sortable!',
}, {
  Header: 'Link',
  accessor: 'link',
  Cell: row => (
    <a href={row.value} target="_blank" rel="noopener noreferrer">
      {row.value}
    </a>
  ),
  width: undefined,
},
];

const DATA_WITH_ACTIONS = [{
  email: '4@domain.com',
  name: 'A',
  link: 'http://a.com',
}, {
  email: '3@domain.com',
  name: 'B',
  link: 'http://b.com',
  actionsMenu: [
    {
      label: 'Edit',
      callback: handleTestEdit,
      type: 'primary',
    },
    {
      label: 'Delete',
      callback: handleTestDelete,
      type: 'danger',
    },
  ],
}, {
  email: '2@domain.com',
  name: 'C',
  link: 'http://c.com',
}, {
  email: '1@domain.com',
  name: 'D',
  link: 'http://d.com',
  actionsMenu: [
    {
      label: 'Edit',
      callback: handleTestEdit,
      type: 'primary',
    },
    {
      label: 'Delete',
      callback: handleTestDelete,
      type: 'danger',
    },
  ],
}];

const COLUMNS_WITH_ACTIONS = [{
  Header: 'Name',
  tooltip: 'The name',
  accessor: 'name',
  width: undefined,
}, {
  Header: 'Email',
  accessor: 'email',
  width: undefined,
  tooltip: 'Or some other non-obvious descriptor for your table',
}, {
  Header: 'Link',
  accessor: 'link',
  Cell: row => (
    <a href={row.value} target="_blank" rel="noopener noreferrer">
      {row.value}
    </a>
  ),
  width: undefined,
},
{
  sortable: false,
  acessor: null,
  width: 50,
  hasActions: true,
},
];


storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Table', () => (
    <StoryWrapper p={15}>
      <Box p={15}>
        <Box>
          <Text isTitle size="large">Filled Table</Text>
          <Box space={60} p="0 16px 0 0">
            <Table
              data={DATA}
              columns={COLUMNS}
            />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Searchable Table</Text>
          <Box space={60} p="0 16px 0 0">
            <Table
              searchable
              data={DATA}
              columns={COLUMNS}
            />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Actions</Text>
          <Box space={60} p="0 16px 0 0">
            <Table
              data={DATA_WITH_ACTIONS}
              columns={COLUMNS_WITH_ACTIONS}
            />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Tooltips</Text>
          <Box space={60} p="0 16px 0 0">
            <Table
              data={DATA}
              columns={COLUMNS}
            />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Empty Table</Text>
          <Box space={60} p="0 16px 0 0">
            <Table
              data={[]}
              columns={[]}
            />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Loading Table</Text>
          <Box space={60} p="0 16px 0 0">
            <Table
              data={[]}
              columns={[]}
              loading
            />
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
