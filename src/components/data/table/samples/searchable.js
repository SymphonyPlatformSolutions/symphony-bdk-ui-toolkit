import React from 'react';
import styled from 'styled-components';
import Faker from 'faker';
import Table from '../index';
import Box from '../../../layout/box';
import TextLink from '../../../misc/text-link';

const handleTestEdit = (item) => {
  console.log(item);
};

const handleTestDelete = (item) => {
  console.log(item);
};

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

for (let i = 0; i < 100; i++) {
  const data = {
    email: Faker.internet.email(),
    name: Faker.name.firstName(),
    link: Faker.internet.url(),
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

export const SearchableTableDemo = () => (
  <Box p={15}>
    <Box space={60} p="0 16px 0 0">
      <Table
        searchable
        data={LARGE_DATA_SET}
        columns={COLUMNS_WITH_ACTIONS}
        maxHeight={350}
      />
    </Box>
  </Box>
);
