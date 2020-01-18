import React from 'react';
import {
  text,
} from '@storybook/addon-knobs';
import Tabs from './index';
import Box from '../box';
import Text from '../../misc/text';

export const NavTabDemo = () => (
  <Box space={20}>
    <Text isTitle>Nav Tabs</Text>
    <Box horizontal space={60}>
      <Tabs activeTab={0}>
        <div label={text('Tab 1 title', 'Set Up')}>
          <Text small>This is a content for Info</Text>
        </div>
        <div label={text('Tab 2 title', 'Manage Notification')}>
          <Text small>This is a content for Notifications</Text>
        </div>
        <div label={text('Tab 3 title', 'Manage Messages')}>
          <Text small>This is a content for Messages</Text>
        </div>
        <div label={text('Tab 4 title', 'Send Invites')}>
          <Text small>This is a content for Invites</Text>
        </div>
        <div label={text('Tab 5 title', 'Admin')} align="right">
          <Text small>This is a content for Admin</Text>
        </div>
      </Tabs>
    </Box>
  </Box>
);
