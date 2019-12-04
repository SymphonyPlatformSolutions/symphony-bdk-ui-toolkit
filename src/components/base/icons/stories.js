import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import styled from 'styled-components';
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

const TestWrapper = styled.div`
  background-color: red;
`

const TestContainer = styled.div`
  background: linear-gradient(to top left,
             rgba(0,0,0,0) 0%,
             rgba(0,0,0,0) calc(50% - 0.8px),
             rgba(0,0,0,1) 50%,
             rgba(0,0,0,0) calc(50% + 0.8px),
             rgba(0,0,0,0) 100%),
         linear-gradient(to top right,
             rgba(0,0,0,0) 0%,
             rgba(0,0,0,0) calc(50% - 0.8px),
             rgba(0,0,0,1) 50%,
             rgba(0,0,0,0) calc(50% + 0.8px),
             rgba(0,0,0,0) 100%);
`

storiesOf('Base', module).add(
  'Icons',
  () => React.createElement(() => (
    <StoryWrapper>
      <Box>
        <Text isTitle>Icons</Text>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <SettingsIcon />
          </TestContainer>
          </TestWrapper>
            <Text>Settings</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <SecurityIcon />
          </TestContainer>
          </TestWrapper>
            <Text>Security</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <NotificationsIcon />
          </TestContainer>
          </TestWrapper>
            <Text>Notifications</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <InteractionsIcon />
          </TestContainer>
          </TestWrapper>
            <Text>Interactions</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <CloudIcon />

          </TestContainer>
          </TestWrapper><Text>Cloud</Text>
          </Box>
        </Box>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <ServerIcon />
          </TestContainer>
          </TestWrapper>
            <Text>Server</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <EyeIcon />

          </TestContainer>
          </TestWrapper><Text>Eye</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <ClosedEyeIcon />
          </TestContainer>
          </TestWrapper>
            <Text>Closed Eye</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <EditIcon />

          </TestContainer>
          </TestWrapper><Text>Edit</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <DeleteIcon />
          </TestContainer>
          </TestWrapper>
            <Text>Delete</Text>
          </Box>
        </Box>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <DownChevron />
          </TestContainer>
          </TestWrapper>
            <Text>Down Chevron</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <TickIcon />

          </TestContainer>
          </TestWrapper><Text>Tick</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <CrossIcon />

          </TestContainer>
          </TestWrapper><Text>Cross</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <PricingIcon />
          </TestContainer>
          </TestWrapper>
            <Text>Pricing</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <InfoIcon />

          </TestContainer>
          </TestWrapper><Text>Info</Text>
          </Box>
        </Box>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <EmptyStarIcon />
          </TestContainer>
          </TestWrapper>
            <Text>Empty Star</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <StarIcon />

          </TestContainer>
          </TestWrapper><Text>Star</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <CloseIcon />

          </TestContainer>
          </TestWrapper><Text>Close</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
          <TestWrapper>
            <TestContainer>
            <EllipsisIcon />
          </TestContainer>
          </TestWrapper>
            <Text>Ellipsis</Text>
          </Box>
        </Box>

      </Box>
    </StoryWrapper>
  )),
);
