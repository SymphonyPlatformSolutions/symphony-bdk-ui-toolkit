import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../box';
import Text from '../text';
import Info from './info.md';

import { StoryWrapper } from '../wrappers';


storiesOf('Base', module)
  .add('Themes', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text isTitle size="large">Look at the Notes tab in this page!</Text>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
