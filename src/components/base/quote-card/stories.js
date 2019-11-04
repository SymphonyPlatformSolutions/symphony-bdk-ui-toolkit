import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import QuoteCard from '.';
import Box from '../box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

const badges = [
  {
    productId: '1',
    mainInfo: 'H0',
    sideInfo: null,
  },
  {
    productId: '2',
    mainInfo: 'USD 1B',
    sideInfo: 'DV01',
  },
];

const panelData = {
  dealerName: 'Dealer two',
  dealerPayedValue: 1.75,
  clientName: 'Client one',
  clientPayedValue: 3,
};

storiesOf('Base', module)
  .add('QuoteCard', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <Text isTitle size="large">Quote Card</Text>
        <QuoteCard
          quoteIdName="A5"
          panelData={panelData}
          badges={null}
        />
        <QuoteCard
          quoteIdName="D5"
          panelData={null}
          badges={badges}
          onRemove={action('Badge to be removed')}
        />
        <QuoteCard
          quoteIdName="H1"
          panelData={panelData}
          badges={badges}
          onRemove={action('Badge to be removed')}
        />
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
