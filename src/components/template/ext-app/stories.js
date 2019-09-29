import React, { useState } from 'react';
import {
  withKnobs, text,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Faker from 'faker';
import { linkTo } from '@storybook/addon-links';
import Tabs from '../../base/tabs';
import Box from '../../base/box';
import { StoryWrapper } from '../../base/wrappers';
import Text from '../../base/text';
import Button from '../../base/button';
import Table from '../../base/table';
import { NoOp } from '../../../utils/helpers';
import HelpPageBuilder from '../../base/help-page-builder';
import { PAGE_DATA_TWO_LEVELS } from '../../base/help-page-builder/stories';

const getFullName = () => `${Faker.name.firstName()} ${Faker.name.lastName()}`;
const mockData = [];

for (let i = 0; i < 20; i++) {
  const data = {
    name: getFullName(),
    email: Faker.internet.email(),
    connected: Faker.random.boolean(),
    loading: false,
  };
  mockData.push(data);
}

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
      {
        label: data.operation === 'Buy' ? 'Place Put' : 'Place Buy',
        callback: NoOp,
        type: 'danger',
      },
    ];
  }
  mockData2.push(data);
}

const PageOne = () => {
  const [data, setData] = useState(mockData);

  const handleButtonClick = item => new Promise((resolve) => {
    setTimeout(() => {
      item.connected = !item.connected;
      setData(Array.from(data));
      resolve();
    }, 1000);
  });
  const columns = [
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
          <Button
            style={{ width: '116px', color:'white' }}
            size="small"
            type={original.connected ? 'danger' : 'secondary'}
            onClick={() => handleButtonClick(original)}
          >
            <span>{ original.connected ? 'Disconnect' : 'Connect' }</span>
          </Button>
        </Box>
      ),
      sortable: false,
      width: undefined,
    },
  ];


  return (
    <Box vertical space={10}>
      <Text type="primary" size="large" isTitle>
        Setup Page
      </Text>
      <Text type="primary">
        Your bones don't break, mine do. That's clear.
        Your cells react to bacteria and viruses differently than mine.
        You don't get sick, I do. That's also clear.
        But for some reason, you and I react the exact same way to water.
        We swallow it too fast, we choke. We get some in our lungs, we drown.
        However unreal it may seem, we are connected, you and I. We're on the same curve,
        just on opposite ends.
      </Text>
      <Box horizontal>
        <Button onClick={linkTo('templates', 'form')}>
          Setup Form
        </Button>
      </Box>
      <Box vertical style={{ marginTop: 20 }}>
        <Table columns={columns} data={data} maxHeight={400} />
      </Box>
    </Box>
  );
};

const PageTwo = () => {
  const [data, setData] = useState(mockData2);

  const columns = [
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
  ];

  return (
    <Box vertical space={10}>
      <Text type="primary" size="large" isTitle>
        Manage Notifications
      </Text>
      <Text type="primary">
        Well, the way they make shows is,
        they make one show. That show's called a pilot.
        Then they show that show to the people who make shows,
        and on the strength of that one show they decide if they're going to make more shows.
        Some pilots get picked and become television programs.
        Some don't, become nothing. She starred in one of the ones that
        became nothing.
      </Text>
      <Box horizontal>
        <Button>
          Add notification
        </Button>
      </Box>
      <Box vertical style={{ marginTop: 20 }}>
        <Table columns={columns} data={data} maxHeight={400} />
      </Box>
    </Box>
  );
};

const ExtApp = () => (
  <Box space={20}>
    <Box horizontal space={60} style={{ maxWidth: '50rem' }}>
      <Tabs activeTab={0}>
        <div label={text('Tab 1 title', 'Set Up')}>
          <PageOne />
        </div>
        <div label={text('Tab 2 title', 'Manage Notification')}>
          <PageTwo />
        </div>
        <div label={text('Tab 5 title', 'Help')} align="right">
          <HelpPageBuilder config={PAGE_DATA_TWO_LEVELS} />
        </div>
      </Tabs>
    </Box>
  </Box>
);

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Extension App', () => (
    <StoryWrapper p={15}>
      <ExtApp />
    </StoryWrapper>
  ));
