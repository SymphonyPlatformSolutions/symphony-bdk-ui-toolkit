import React from 'react';
import { storiesOf } from '@storybook/react';
import QuotePanel from '.';
import Box from '../box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

storiesOf('Base', module)
  .add('QuotePanel', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <Text isTitle size="large">Quote Panel</Text>
        <QuotePanel
          dealerName="Dealer two"
          dealerPayedValue={1.75}
          clientName="Client one"
          clientPayedValue={3}
        />
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
