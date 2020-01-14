import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, select, number,
} from '@storybook/addon-knobs';
import Loader from './index';
import Box from '../../layout/box';
import Text from '../text';
import Info from './info.md';

import { StoryWrapper } from '../wrappers';

const SPINNER_SIZES = {
  SMALL: 'small',
  REGULAR: 'regular',
  LARGE: 'large',
};

storiesOf('Misc', module)
  .addDecorator(withKnobs)
  .add('Loader', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text isTitle>Live Example (Knobs)</Text>
        <Box horizontal space={60} align="center">
          <Loader
            size={select('Size: ', SPINNER_SIZES, 'regular')}
          />
        </Box>
      </Box>
      <Box space={20}>
        <Text isTitle>Loader sizes</Text>
        <Box horizontal space={60} align="center">
          <Loader size="small" />
          <Loader />
          <Loader size="large" />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
