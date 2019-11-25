import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import QuoteCard from './index';
import Box from '../../base/box';
import Text from '../../base/text';
import { StoryWrapper } from '../../base/wrappers';
import Info from './info.md';

const productData = {
  name: 'IRS',
  currency: 'USD',
  rateIndex: '3M-LIBOR',
  clearingHouse: 'EUREX',
  startDate: 'spot',
  tenorDate: '1y',
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

storiesOf('Financial', module)
  .add('QuoteCard', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <Text isTitle size="large">Quote Card</Text>
        <QuoteCard
          quoteShortCode="A5"
          colorIndex={1}
          panelData={panelData}
          productData={null}
          onEdit={action('Edit button clicked')}
          onCancel={action('Cancel button clicked')}
        />
        <QuoteCard
          quoteShortCode="D5"
          colorIndex={3}
          panelData={null}
          productData={productData}
          onEdit={action('Edit button clicked')}
          onCancel={action('Cancel button clicked')}
        />
        <QuoteCard
          quoteShortCode="H1"
          colorIndex={5}
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
