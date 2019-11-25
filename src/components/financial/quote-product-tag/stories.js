import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import QuoteProductTag from './index';
import Box from '../../base/box';
import Text from '../../base/text';
import { StoryWrapper } from '../../base/wrappers';
import Info from './info.md';

storiesOf('Financial', module)
  .add('QuoteProductTag', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <Text isTitle size="large">Quote Product Tag</Text>
        <QuoteProductTag
          sideInfo="start"
          mainInfo="H0"
        />
        <QuoteProductTag
          mainInfo="IRS"
          tagState="active"
          onClose={action('close button clicked')}
        />
        <QuoteProductTag
          mainInfo="IRS"
          tagState="disabled"
        />
        <QuoteProductTag
          mainInfo="IRS"
          tagState="loading"
        />
        <QuoteProductTag
          mainInfo="IRS"
          tagState="error"
        />
        <QuoteProductTag
          mainInfo="IRS"
          tagState="success"
        />
        <QuoteProductTag
          mainInfo="IRS"
          tagState="removed"
        />
        <QuoteProductTag
          mainInfo="IRS"
          tagState="added"
        />
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
