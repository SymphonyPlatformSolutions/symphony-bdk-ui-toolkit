import React from 'react';
import { storiesOf } from '@storybook/react';
import Tabs from '.';
import Box from '../Box';
import { StoryWrapper } from '../Wrappers';


import Text from '../Text';

storiesOf('Base', module)
  .add('Tabs', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text title size="large">Tabs</Text>
        <Box horizontal space={60}>
          <Tabs activeTab={1}>
            <div label="Info">
              <Text small>This is a content for Info</Text>
            </div>
            <div label="Settings">
              <Text small>This is a content for Settings</Text>
            </div>
            <div label="Admin" align="right">
              <Text small>This is a content for Admin</Text>
            </div>
          </Tabs>
        </Box>
      </Box>
    </StoryWrapper>
  ));
