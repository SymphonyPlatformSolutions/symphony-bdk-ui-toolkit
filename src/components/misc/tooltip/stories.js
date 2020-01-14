import React from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip from './index';
import Text from '../text';
import Box from '../../layout/box';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';


storiesOf('Misc', module)
  .add('Tooltip', () => (
    <StoryWrapper p={15}>
      <Box>
        <div>
          <Text isTitle>Tooltip</Text>
          <Box my="60px" horizontal width="100%" mx="100px">
            <Tooltip>Some short text</Tooltip>
            <Tooltip>A medium text that's just as meaningul</Tooltip>
            <Tooltip>A pretty large text that details relevant information about a certain topic or on-screen component</Tooltip>
          </Box>
        </div>
        <div>
          <Text isTitle>Bottom tooltip</Text>
          <Box my="20px" horizontal width="100%" mx="100px">
            <Tooltip bottom>Some short text</Tooltip>
            <Tooltip bottom>A medium text that's just as meaningul</Tooltip>
            <Tooltip bottom>A pretty large text that details relevant information about a certain topic or on-screen component</Tooltip>
          </Box>
        </div>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
