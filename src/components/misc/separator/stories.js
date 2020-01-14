import React from 'react';
import { storiesOf } from '@storybook/react';
import Separator from './index';
import Box from '../../layout/box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';


storiesOf('Misc', module)
  .add('Separator', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text isTitle>Separator</Text>
        <Box horizontal space={60} align="center">
          <Separator />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
