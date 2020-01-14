import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../../layout/box';
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
} from './index';

storiesOf('Misc', module).add(
  'Icons',
  () => React.createElement(() => (
    <StoryWrapper>
      <Box>
        <Text isTitle>Icons</Text>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
            <SettingsIcon size={20} />
            <Text>Settings</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <SecurityIcon size={20} />
            <Text>Security</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <NotificationsIcon size={20} />
            <Text>Notifications</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <InteractionsIcon size={20} />
            <Text>Interactions</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <CloudIcon size={20} />
          </Box>
        </Box>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
            <ServerIcon size={20} />
            <Text>Server</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <EyeIcon size={20} />
          </Box>
          <Box type="flat" justify="center" align="center">
            <ClosedEyeIcon size={20} />
            <Text>Closed Eye</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <EditIcon size={20} />
          </Box>
          <Box type="flat" justify="center" align="center">
            <DeleteIcon size={20} />
            <Text>Delete</Text>
          </Box>
        </Box>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
            <DownChevron size={20} />
            <Text>Down Chevron</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TickIcon size={20} />
          </Box>
          <Box type="flat" justify="center" align="center">
            <CrossIcon size={20} />
          </Box>
          <Box type="flat" justify="center" align="center">
            <PricingIcon size={20} />
            <Text>Pricing</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <InfoIcon size={20} />
            <Text>Info</Text>
          </Box>
        </Box>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
            <EmptyStarIcon size={20} />
            <Text>Empty Star</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <StarIcon size={20} />
          </Box>
          <Box type="flat" justify="center" align="center">
            <CloseIcon size={20} />
          </Box>
          <Box type="flat" justify="center" align="center">
            <EllipsisIcon size={20} />
            <Text>Ellipsis</Text>
          </Box>
        </Box>
      </Box>
    </StoryWrapper>
  )),
);
