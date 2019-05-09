import React from 'react';

import { storiesOf } from '@storybook/react';

import { colors } from '../../../styles/colors';
import Loader from '.';
import Box from '../Box';
import Text from '../Text';

storiesOf('Base', module)
  .add('Loader', () => (
    <Box p={15}>
      <Box space={20}>
        <Text title size="large">Loader sizes</Text>
        <Box horizontal space={60} align="center">
          <Loader
            size={15}
            color={colors.danger}
          />
          <Loader
            size={35}
            color={colors.danger}
          />
        </Box>
      </Box>
      <Box space={20}>
        <Text title size="large">Loader colors</Text>
        <Box horizontal space={60} align="center">
          <Loader
            size={25}
            color={colors.success}
          />
          <Loader
            size={25}
            color={colors.primary}
          />
        </Box>
      </Box>
    </Box>
  ));
