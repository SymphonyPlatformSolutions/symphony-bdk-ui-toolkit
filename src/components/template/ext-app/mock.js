import React from 'react';
import Faker from 'faker';
import { Box } from '../../index';
import Button from '../../base/button';

const getFullName = () => `${Faker.name.firstName()} ${Faker.name.lastName()}`;
const mockData = [];
for (let i = 0; i < 20; i++) {
  const data = {
    email: Faker.internet.email(),
    name: getFullName(),
    connected: Faker.random.boolean(),
  };
  mockData.push(data);
}

export const PageOneMock = {
  columns: [
    {
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
      Cell: ({ original }) => (
        <Box style={{ width: '100%' }} horizontal justify="center">
          <Button style={{ width: '116px' }} size="small" type={original.connected ? 'danger' : 'primary'}>
            <span>{ original.connected ? 'Disconnect' : 'Connect' }</span>
          </Button>
        </Box>
      ),
      sortable: false,
      width: undefined,
    },
  ],
  data: mockData,
};

const mockData2 = [];
for (let i = 0; i < 7; i++) {
  const data = {
    product: Faker.commerce.productName(),
    company: Faker.company.companyName(),
    operation: Faker.random.boolean() ? 'Buy' : 'Put',
  };
  if (Faker.random.boolean()) {
    data.actionsMenu = [
      {
        label: 'Edit Notification',
        callback: NoOp,
        type: 'primary',
      },
      {
        label: 'Delete Notification',
        callback: NoOp,
        type: 'danger',
      },
    ];
  }
  mockData2.push(data);
}

export const PageTwoMock = {
  columns: [
    {
      Header: 'Product Name',
      tooltip: 'These products are awesome',
      accessor: 'product',
      width: undefined,
      sortable: false,
    }, {
      Header: 'Company',
      accessor: 'company',
      width: undefined,
    },
    {
      Header: 'Operation',
      accessor: 'operation',
      width: 100,
    },
    {
      sortable: false,
      acessor: null,
      width: 50,
      hasActions: true,
    },
  ],
  data: mockData2,
};
