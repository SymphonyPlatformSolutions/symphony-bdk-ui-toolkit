import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import QuoteCard from '.';
import Box from '../box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

const productData = {
  name: 'IRS',
  currency: 'USD',
  rateIndex: '3M-LIBOR',
  clearingHouse: 'EUREX',
  startDate: 'spot',
  tenor: { data: '1y', type: 'single' },
  roll: 'IMM',
  size: {
    type: 'DV01', currency: 'USD', value: '3', multiplier: 'k',
  },
  payDirection: 'pay',
};

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
          productData={null}
          onEdit={action('Edit button clicked')}
          onCancel={action('Cancel button clicked')}
        />
        <QuoteCard
          quoteIdName="D5"
          panelData={null}
          productData={productData}
          onEdit={action('Edit button clicked')}
          onCancel={action('Cancel button clicked')}
        />
        <QuoteCard
          quoteIdName="H1"
          panelData={panelData}
          productData={productData}
          onEdit={action('Edit button clicked')}
          onCancel={action('Cancel button clicked')}
        />
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
