import React from 'react';
import { storiesOf } from '@storybook/react';
import QuotePanel from './index';
import Box from '../../layout/box';
import Text from '../../misc/text';
import { StoryWrapper } from '../../misc/wrappers';
import Info from './info.md';

storiesOf('Financial', module)
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
