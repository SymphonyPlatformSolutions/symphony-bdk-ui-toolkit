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
          tagState="active"
          onClose={action('close button clicked')}
        />
        <QuoteProductTag
          mainInfo="H0"
          sideInfo="start"
          tagState="disabled"
        />
        <QuoteProductTag
          mainInfo="H0"
          sideInfo="start"
          tagState="loading"
        />
        <QuoteProductTag
          mainInfo="IRS"
          sideInfo="start"
          tagState="error"
        />
        <QuoteProductTag
          mainInfo="H0"
          sideInfo="start"
          tagState="success"
        />
        <QuoteProductTag
          mainInfo="H0"
          sideInfo="start"
          tagState="removed"
        />
        <QuoteProductTag
          mainInfo="H0"
          sideInfo="start"
          tagState="added"
        />
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
