import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import {
  SecurityIcon,
  SettingsIcon,
  NotificationsIcon,
  InteractionsIcon,
  CloudIcon,
  ServerIcon,
  EyeIcon,
  ClosedEyeIcon,
  EditIcon,
  DeleteIcon,
  DownChevron,
  TickIcon,
  CrossIcon,
  PricingIcon,
  InfoIcon,
  EmptyStarIcon,
  StarIcon,
  EllipsisIcon,
  CloseIcon,
} from '.';

storiesOf('Base', module).add(
  'Icons',
  () => React.createElement(() => (
    <StoryWrapper>
      <Box>
        <Text isTitle>Icons</Text>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
            <SettingsIcon />
            <Text>Settings</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <SecurityIcon />
            <Text>Security</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <NotificationsIcon />
            <Text>Notifications</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <InteractionsIcon />
            <Text>Interactions</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <CloudIcon />
            <Text>Cloud</Text>
          </Box>
        </Box>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
            <ServerIcon />
            <Text>Server</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <EyeIcon />
            <Text>Eye</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <ClosedEyeIcon />
            <Text>Closed Eye</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <EditIcon />
            <Text>Edit</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <DeleteIcon />
            <Text>Delete</Text>
          </Box>
        </Box>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
            <DownChevron />
            <Text>Down Chevron</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TickIcon />
            <Text>Tick</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <CrossIcon />
            <Text>Cross</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <PricingIcon />
            <Text>Pricing</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <InfoIcon />
            <Text>Info</Text>
          </Box>
        </Box>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
            <EmptyStarIcon />
            <Text>Empty Star</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <StarIcon />
            <Text>Star</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <CloseIcon />
            <Text>Close</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <EllipsisIcon />
            <Text>Ellipsis</Text>
          </Box>
        </Box>

      </Box>
    </StoryWrapper>
  )),
);
