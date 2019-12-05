import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
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

const TestWrapper = styled.div`
  background-color: ${props => (props.blueprint ? 'red' : null)};
    &:hover {
    transform:  ${props => (props.blueprint ? 'rotate(180deg)' : null)};
  }
`;

const TestContainer = styled.div`
  background: ${props => (props.blueprint ? `linear-gradient(to top left,
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
             rgba(0,0,0,0) 100%)` : null)};
`;

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
                <SettingsIcon size={14} />
              </TestContainer>
            </TestWrapper>
            <Text>Settings</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <SecurityIcon size={14} />
              </TestContainer>
            </TestWrapper>
            <Text>Security</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <NotificationsIcon size={14} />
              </TestContainer>
            </TestWrapper>
            <Text>Notifications</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <InteractionsIcon size={14} />
              </TestContainer>
            </TestWrapper>
            <Text>Interactions</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <CloudIcon size={14} />

              </TestContainer>
            </TestWrapper><Text>Cloud</Text>
          </Box>
        </Box>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <ServerIcon size={14} />
              </TestContainer>
            </TestWrapper>
            <Text>Server</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <EyeIcon size={14} />

              </TestContainer>
            </TestWrapper><Text>Eye</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <ClosedEyeIcon size={14} />
              </TestContainer>
            </TestWrapper>
            <Text>Closed Eye</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <EditIcon size={14} />

              </TestContainer>
            </TestWrapper><Text>Edit</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <DeleteIcon size={14} />
              </TestContainer>
            </TestWrapper>
            <Text>Delete</Text>
          </Box>
        </Box>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <DownChevron size={14} />
              </TestContainer>
            </TestWrapper>
            <Text>Down Chevron</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <TickIcon size={14} />

              </TestContainer>
            </TestWrapper><Text>Tick</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <CrossIcon size={14} />

              </TestContainer>
            </TestWrapper><Text>Cross</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <PricingIcon size={14} />
              </TestContainer>
            </TestWrapper>
            <Text>Pricing</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <InfoIcon size={14} />

              </TestContainer>
            </TestWrapper><Text>Info</Text>
          </Box>
        </Box>
        <Box horizontal>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <EmptyStarIcon size={14} />
              </TestContainer>
            </TestWrapper>
            <Text>Empty Star</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <StarIcon size={14} />

              </TestContainer>
            </TestWrapper><Text>Star</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <CloseIcon size={14} />

              </TestContainer>
            </TestWrapper><Text>Close</Text>
          </Box>
          <Box type="flat" justify="center" align="center">
            <TestWrapper>
              <TestContainer>
                <EllipsisIcon size={14} />
              </TestContainer>
            </TestWrapper>
            <Text>Ellipsis</Text>
          </Box>
        </Box>

      </Box>
    </StoryWrapper>
  )),
);
