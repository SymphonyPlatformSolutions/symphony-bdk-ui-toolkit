import React from 'react';
import { storiesOf } from '@storybook/react';
import { colors } from '../../../styles/colors';
import Tabs from '.';
import Box from '../Box';
import Card from '../Card';
import Text from '../Text';
import Separator from '../Separator';

storiesOf('Base', module)
  .add('Tabs', () => (
    <Box p={15}>
      <Box space={20}>
        <Text title size="large">Tabs</Text>
        <Box horizontal space={60}>
          <Tabs activeTab={2}>
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
    </Box>
  ));
