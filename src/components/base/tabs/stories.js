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
  .add('Tabs', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text title size="large">Tabs</Text>
        <Box horizontal space={60}>
          <Tabs activeTab={0}>
            <div label={text('Tab 1 title', 'Set Up')}>
              <Text small>This is a content for Info</Text>
            </div>
            <div label={text('Tab 2 title', 'Manage Notification')}>
              <Text small>This is a content for Settings</Text>
            </div>
            <div label={text('Tab 3 title', 'Manage Messanges')}>
              <Text small>This is a content for Settings</Text>
            </div>
            <div label={text('Tab 4 title', 'Send Invites')}>
              <Text small>This is a content for Settings</Text>
            </div>
            <div label={text('Tab 5 title', 'Admin')} align="right">
              <Text small>This is a content for Admin</Text>
            </div>
          </Tabs>
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
