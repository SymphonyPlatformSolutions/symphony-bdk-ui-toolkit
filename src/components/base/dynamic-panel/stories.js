import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, text,
} from '@storybook/addon-knobs';
import Tabs from '.';
import Box from '../box';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';
import Text from '../text';


storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Dynamic Panel', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text isTitle>Tabs Panel</Text>
        <Box horizontal space={60}>
          <Tabs />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
