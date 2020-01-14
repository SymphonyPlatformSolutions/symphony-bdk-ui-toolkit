import React from 'react';

import { storiesOf } from '@storybook/react';

import Card from './index';
import Box from '../box';
import Text from '../../misc/text';
import { StoryWrapper } from '../../misc/wrappers';
import Info from './info.md';

storiesOf('Layout', module)
  .add('Card', () => (
    <StoryWrapper p={15}>
      <Box type="primary" style={{ margin: '0px 100px' }}>
        <Text isTitle size="large">Cards</Text>
        <Card titleText="Card with title">
          <Box type="flat" p="10px">
            <Text size="small">Lorem ipsum dolor</Text>
          </Box>
        </Card>
        <Card>
          <Box type="flat" p="10px">
            <Text size="small">Card without title</Text>
          </Box>
        </Card>
        <Card hoverEffect>
          <Box type="flat" p="10px">
            <Text size="small">Card with Hover</Text>
          </Box>
        </Card>
      </Box>

    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
