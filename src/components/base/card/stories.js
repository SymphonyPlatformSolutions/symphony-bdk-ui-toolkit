import React from 'react';

import { storiesOf } from '@storybook/react';

import Card from '.';
import Box from '../box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';


storiesOf('Base', module)
  .add('Card', () => (
    <StoryWrapper p={15}>
      <Box>
        <Text title size="large">Cards</Text>
        <Card title="Card with title">
          <Text size="small">Lorem ipsum dolor</Text>
        </Card>
        <Card>
          <Text size="small">Card without title</Text>
        </Card>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    }
  });
