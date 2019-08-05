import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../Box';
import Text from '../Text';
import Info from './info.md';

import { StoryWrapper } from '../Wrappers';


storiesOf('Base', module)
  .add('Themes', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text title size="large">Look at the Notes tab in this page!</Text>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
