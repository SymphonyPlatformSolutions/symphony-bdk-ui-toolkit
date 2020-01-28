import React from 'react';
import styled from 'styled-components';
import Faker from 'faker';
import Table from '../index';
import Box from '../../../layout/box';
import TextLink from '../../../misc/text-link';

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

const CellWrapper = styled(Box)`
  margin: 0px 19px;
  align-items: start;
  justify-content: center;
  height: 100%;
`;

const HUGE_DATA_SET = [];

for (let i = 0; i < 100000; i++) {
  const data = {
    email: Faker.internet.email(),
    name: Faker.name.firstName(),
    link: Faker.internet.url(),
  };

  HUGE_DATA_SET.push(data);
}

export const HugeTableDemo = () => (
  <Box p={15}>
    <Box space={60} p="0 16px 0 0">
      <Table
        data={HUGE_DATA_SET}
        columns={COLUMNS}
        maxHeight={350}
      />
    </Box>
  </Box>
);
