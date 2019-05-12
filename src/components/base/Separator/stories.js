import React from 'react';
import { storiesOf } from '@storybook/react';
import { colors } from '../../../styles/colors';
import Separator from '.';
import Box from '../Box';
import Text from '../Text';

storiesOf('Base', module)
  .add('Separator', () => (
    <Box p={15}>
      <Box space={20}>
        <Text title size="large">Separator</Text>
        <Box horizontal space={60} align="center">
          <Separator />
        </Box>
      </Box>
    </Box>
  ));
