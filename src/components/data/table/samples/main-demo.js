import React from 'react';
import styled from 'styled-components';
import Faker from 'faker';
import Table from '../index';
import Box from '../../../layout/box';
import TextLink from '../../../misc/text-link';

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

const CellWrapper = styled(Box)`
  margin: 0px 19px;
  align-items: start;
  justify-content: center;
  height: 100%;
`;

export const TableDemo = () => (
  <Box p={15}>
    <Box space={60} p="0 16px 0 0">
      <Table
        data={DATA}
        columns={COLUMNS}
      />
    </Box>
  </Box>
);
