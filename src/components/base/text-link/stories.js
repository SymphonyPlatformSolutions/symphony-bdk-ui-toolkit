import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, select, text, withKnobs,
} from '@storybook/addon-knobs';
import Box from '../box';
import TextLink from '.';
import Text from '../text';
import Info from './info.md';
import { StoryWrapper } from '../wrappers';

const TEXT_SIZES = {
  Tiny: 'tiny',
  Small: 'small',
  Regular: 'regular',
  Large: 'large',
};


const TEXT_TYPES = {
  Primary: 'primary',
  Secondary: 'secondary',
  Danger: 'danger',
  Info: 'info',
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Text Link', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text isTitle>Title</Text>
        <Box>
          <TextLink href="https://google.com">Some link</TextLink>
          <TextLink isTitle href="https://google.com">Some link</TextLink>
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
