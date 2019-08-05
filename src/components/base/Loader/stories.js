import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, color, number,
} from '@storybook/addon-knobs';
import Loader from '.';
import Box from '../Box';
import Text from '../Text';
import Info from './info.md';

import { StoryWrapper } from '../Wrappers';


storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Loader', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text title size="large">Live Example (Knobs)</Text>
        <Box horizontal space={60} align="center">
          <Loader
            size={number('Size: ', 15)}
            color={color('Loader Color: ', '#D50935')}
          />
        </Box>
      </Box>
      <Box space={20}>
        <Text title size="large">Loader sizes</Text>
        <Box horizontal space={60} align="center">
          <Loader
            size={15}
            color={'#D50935'}
          />
          <Loader
            size={35}
            color={'#D50935'}
          />
        </Box>
      </Box>
      <Box space={20}>
        <Text title size="large">Loader colors</Text>
        <Box horizontal space={60} align="center">
          <Loader
            size={25}
            color={'#006CAF'}
          />
          <Loader
            size={25}
            color={'#006CAF'}
          />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    }
  });
