import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, text,
} from '@storybook/addon-knobs';
import Table from '.';
import Box from '../box';
import { StoryWrapper } from '../wrappers';
// import Info from './info.md';
import Text from '../text';

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
  name: 'Name',
  selector: 'name',
  sortable: true,
}, {
  name: 'Email',
  selector: 'email',
  sortable: true,
}, {
  name: 'Link',
  cell: row => (
    <a href={row.link} target="_blank" rel="noopener noreferrer">
      {row.link}
    </a>
  ),
}];

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Table', () => (
    <StoryWrapper p={15}>
      <Box p={15}>
        <Box>
          <Text title size="large">Filled Table</Text>
          <Box horizontal space={60}>
            <Table
              data={DATA}
              columns={COLUMNS}
            />
          </Box>
        </Box>
        <Box>
          <Text title size="large">Empty Table</Text>
          <Box horizontal space={60}>
            <Table
              data={[]}
            />
          </Box>
        </Box>
        <Box>
          <Text title size="large">Loading Table</Text>
          <Box horizontal space={60}>
            <Table
              loading
            />
          </Box>
        </Box>
      </Box>
    </StoryWrapper>
  ));
// {
//   notes: {
//     markdown: Info,
//   },
// }
// );
