import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../box';
import Text from '../text';
import Info from './info.md';

import { StoryWrapper } from '../wrappers';

const PAGE_DATA = {
  title: 'Help page',
  description: 'this is a help Page',
  topics: [
    {
      title: '',
      description: '',
      icon: 'icon',
      topics: [
        {
          title: 'Topic one',
          description: 'this is a topic',
          icon: 'icon',
          content: [
            {
              title: 'Step 1',
              description: 'this is the step 1',
              imgUrl: 'https://via.placeholder.com/300.png/09f/fff',
            },
            {
              title: 'Step 2',
              description: 'this is the step 1',
              imgUrl: 'https://via.placeholder.com/300.png/09f/fff',
            },
            {
              title: 'Step 3',
              description: 'this is the step 1',
              imgUrl: 'https://via.placeholder.com/300.png/09f/fff',
            },
          ],
        },
        {
          title: 'Topic Two',
          description: 'this is yet another topic',
          icon: 'icon',
          content: [
            {
              title: 'Step 1',
              description: 'this is the step 1',
              imgUrl: 'https://via.placeholder.com/300.png/09f/fff',
            },
            {
              title: 'Step 2',
              description: 'this is the step 1',
              imgUrl: 'https://via.placeholder.com/300.png/09f/fff',
            },
            {
              title: 'Step 3',
              description: 'this is the step 1',
              imgUrl: 'https://via.placeholder.com/300.png/09f/fff',
            },
          ],
        },
        {
          title: 'Topic Three',
          description: 'this yet anther a topic',
          icon: 'icon',
          content: [
            {
              title: 'Step 1',
              description: 'this is the step 1',
              imgUrl: 'https://via.placeholder.com/300.png/09f/fff',
            },
            {
              title: 'Step 2',
              description: 'this is the step 1',
              imgUrl: 'https://via.placeholder.com/300.png/09f/fff',
            },
            {
              title: 'Step 3',
              description: 'this is the step 1',
              imgUrl: 'https://via.placeholder.com/300.png/09f/fff',
            },
          ],
        },
      ],
    },
  ],
};

storiesOf('Base', module)
  .add('Help Page Builder', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text isTitle size="large">Help Page Builder</Text>
        <Text isTitle size="small">2 Level helper</Text>
        <Box horizontal space={20}>
            Aweo
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
