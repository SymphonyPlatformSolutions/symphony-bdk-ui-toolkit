import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import Faker from 'faker';
import Table from '.';
import Box from '../box';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';
import Text from '../text';
import TextLink from '../text-link';

const handleTestEdit = (item) => {
  console.log(item);
};

const handleTestDelete = (item) => {
  console.log(item);
};
const DATA = [{
  email: Faker.internet.email(),
  name: Faker.name.firstName(),
  link: 'http://a.com',
}, {
  email: Faker.internet.email(),
  name: Faker.name.firstName(),
  link: 'http://b.com',
}, {
  email: Faker.internet.email(),
  name: Faker.name.firstName(),
  link: 'http://c.com',
}, {
  email: Faker.internet.email(),
  name: Faker.name.firstName(),
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
    <TextLink href={row.value} target="_blank" rel="noopener noreferrer">
      {row.value}
    </TextLink>
  ),
  width: undefined,
},
];

const DATA_WITH_ACTIONS = [{
  email: Faker.internet.email(),
  name: Faker.name.firstName(),
  link: 'http://a.com',
}, {
  email: Faker.internet.email(),
  name: Faker.name.firstName(),
  link: 'http://b.com',
  actionsMenu: [
    {
      label: 'Edit',
      callback: handleTestEdit,
      type: 'info',
    },
    {
      label: 'Delete',
      callback: handleTestDelete,
      type: 'error',
    },
  ],
}, {
  email: Faker.internet.email(),
  name: Faker.name.firstName(),
  link: 'http://c.com',
}, {
  email: Faker.internet.email(),
  name: Faker.name.firstName(),
  link: 'http://d.com',
  actionsMenu: [
    {
      label: 'Edit',
      callback: handleTestEdit,
      type: 'info',
    },
    {
      label: 'Delete',
      callback: handleTestDelete,
      type: 'error',
    },
  ],
}];

const COLUMNS_WITH_ACTIONS = [{
  Header: 'Name',
  tooltip: 'The name',
  accessor: 'name',
}, {
  Header: 'Email',
  accessor: 'email',
  tooltip: 'Or some other non-obvious descriptor for your table',
}, {
  Header: 'Link',
  accessor: 'link',
  Cell: row => (
    <TextLink href={row.value} target="_blank" rel="noopener noreferrer">
      {row.value}
    </TextLink>
  ),
},
{
  sortable: false,
  acessor: null,
  width: 50,
  hasActions: true,
},
];

const LARGE_DATA_SET = [];

for (let i = 0; i < 5; i++) {
  const data = {
    email: Faker.internet.email(),
    name: Faker.name.firstName(),
    link: 'https://www.example.com',
  };

  if (Faker.random.boolean()) {
    data.actionsMenu = [
      {
        label: 'Edit',
        callback: handleTestEdit,
        type: 'info',
      },
      {
        label: 'Delete',
        callback: handleTestDelete,
        type: 'error',
      },
    ];
  }

  LARGE_DATA_SET.push(data);
}

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Table', () => (
    <StoryWrapper p={15}>
      <Box p={15}>
        <Box>
          <Text isTitle>Filled Table</Text>
          <Box space={60} p="0 16px 0 0">
            <Table
              data={DATA}
              columns={COLUMNS}
            />
          </Box>
        </Box>
        <Box>
          <Text isTitle>Actions</Text>
          <Box space={60} p="0 16px 0 0">
            <Table
              data={DATA_WITH_ACTIONS}
              columns={COLUMNS_WITH_ACTIONS}
            />
          </Box>
        </Box>
        <Box>
          <Text isTitle>Searchable Table, and max Height</Text>
          <Box space={60} p="0 16px 0 0">
            <Table
              searchable
              data={LARGE_DATA_SET}
              columns={COLUMNS_WITH_ACTIONS}
              maxHeight={350}
            />
          </Box>
        </Box>
        <Box>
          <Text isTitle>Tooltips</Text>
          <Box space={60} p="0 16px 0 0">
            <Table
              data={DATA}
              columns={COLUMNS}
            />
          </Box>
        </Box>
        <Box>
          <Text isTitle>Empty Table</Text>
          <Box space={60} p="0 16px 0 0">
            <Table
              data={[]}
              columns={[]}
            />
          </Box>
        </Box>
        <Box>
          <Text isTitle>Loading Table</Text>
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
