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
    <Box p={15} bg={colors.basegrey}>
      <Box space={20}>
        <Text title size="large">Tabs</Text>
        <Box horizontal space={60}>
          <Tabs activeTab={2}>
            <div label="Info">
              <Card title="App Information">
                <Text>Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum.</Text>
                <Separator />
                <Text>Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum.</Text>
              </Card>
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
