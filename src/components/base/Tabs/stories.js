import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';
import Tabs from '.';
import Box from '../Box';

import Text from '../Text';


const StoryWrapper = styled(Box)`
  background-color: ${props => (props.theme.mode === THEME_TYPES.LIGHT ? 'white' : '#17191C')};
`;

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
