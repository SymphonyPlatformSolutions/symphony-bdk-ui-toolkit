import React from 'react';
import styled, { keyframes } from 'styled-components';
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
import { TBodyTr } from './theme';

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
  header: 'Name',
  tooltip: 'This column is not sortable',
  accessor: 'name',
  sortable: false,
}, {
  header: 'Email',
  accessor: 'email',
  tooltip: 'This column is sortable!',
}, {
  header: 'Link',
  accessor: 'link',
  Cell: ({ cell }) => (
    <CellWrapper>
      <TextLink href={cell.value} target="_blank" rel="noopener noreferrer">
        {cell.value}
      </TextLink>
    </CellWrapper>
  ),
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
const CellWrapper = styled(Box)`
  margin: 0px 19px;
  align-items: start;
  justify-content: center;
  height: 100%;
`;

const COLUMNS_WITH_ACTIONS = [{
  header: 'Name',
  tooltip: 'The name',
  accessor: 'name',
  id: 'name',
}, {
  header: 'Email',
  accessor: 'email',
  tooltip: 'Or some other non-obvious descriptor for your table',
  id: 'email',
}, {
  header: 'Link',
  accessor: 'link',
  id: 'link',
  Cell: ({ cell }) => (
    <CellWrapper>
      <TextLink href={cell.value} target="_blank" rel="noopener noreferrer">
        {cell.value}
      </TextLink>
    </CellWrapper>
  ),
},
{
  id: 'actions',
  sortable: false,
  width: 50,
  hasActions: true,
},
];

const LARGE_DATA_SET = [];

for (let i = 0; i < 40; i++) {
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

const pastelRainbow = keyframes`
  100%,0%{
    background-color: #FF9AA2;
  }
  16%{
    background-color: #FFB7B2;
  }
  33%{
    background-color: #FFDAC1;
  }
  50%{
    background-color: #e2f0cb;
  }
  67%{
    background-color: #b5ead7;
  }
  79%{
    background-color: #C7CEEA;
  }
`;

const CustomRowStyle = styled(TBodyTr)`
  &:hover {
    animation: ${pastelRainbow} 0.85s linear;
    animation-iteration-count: infinite;
  }
`;

const CustomRow = (props) => {
  const { children, ...rest } = props;
  return (
    <CustomRowStyle {...rest}>
      {children}
    </CustomRowStyle>
  );
};

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
          <Text isTitle>Custom Row component</Text>
          <Box space={60} p="0 16px 0 0">
            <Table
              data={DATA}
              columns={COLUMNS}
              Row={CustomRow}
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
