import React from 'react';
import { storiesOf } from '@storybook/react';
import Separator from '.';
import Box from '../Box';
import Text from '../Text';
import { StoryWrapper } from '../Wrappers';
import Info from './info.md';


storiesOf('Base', module)
  .add('Separator', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text title size="large">Separator</Text>
        <Box horizontal space={60} align="center">
          <Separator />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    }
  });
