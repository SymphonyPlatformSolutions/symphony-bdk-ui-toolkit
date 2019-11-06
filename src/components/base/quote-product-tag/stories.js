import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import QuoteProductTag from '.';
import Box from '../box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

storiesOf('Base', module)
  .add('QuoteProductTag', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <Text isTitle size="large">Quote Product Tag</Text>
        <QuoteProductTag
          mainInfo="H0"
        />
        <QuoteProductTag
          mainInfo="H0"
          sideInfo="start"
          hasCloseButton={false}
          onClose={action('close button clicked')}
        />
        <QuoteProductTag
          mainInfo="H0"
          sideInfo="start"
          hasCloseButton
          onClose={action('close button clicked')}
        />
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
