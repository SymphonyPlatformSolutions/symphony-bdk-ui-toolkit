import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Card from '.';
import Box from '../Box';
import Text from '../Text';

storiesOf('Base', module)
  .add('Card', () => (
    <Box p={15}>
      <Box>
        <Text title size="large">Cards</Text>
        <Card title="Card with title">
          <Text size="small">Lorem ipsum dolor</Text>
        </Card>
        <Card>
          <Text size="small">Card without title</Text>
        </Card>
      </Box>
    </Box>
  ));
