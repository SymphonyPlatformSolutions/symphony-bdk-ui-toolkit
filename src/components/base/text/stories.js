import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, select, text, withKnobs,
} from '@storybook/addon-knobs';
import Box from '../box';
import Text from '.';
import Info from './info.md';
import { StoryWrapper } from '../wrappers';


const sampleText = `Now that we know who you are, I know who I am.
I am not a mistake! It all makes sense! In a comic,
you know how you can tell who the arch-villain is going to be?
He is the exact opposite of the hero. And most times they are friends,
like you and me! I should have known way back when... You know why, David?
Because of the kids. They called me Mr Glass.`;

const TEXT_SIZES = {
  Tiny: 'tiny',
  Small: 'small',
  Large: 'large',
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Text', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text title>Live Example (Knobs)</Text>
        <Text
          underline={boolean('Has underline', false)}
          title={boolean('Is Title', false)}
          size={select('Text Sizes', TEXT_SIZES, 'large')}
        >
          {text('Label', sampleText)}
        </Text>
      </Box>
      <Box space={20}>
        <Text title>Title</Text>
        <Box>
          <Text title size="large" underline>Large Title Underline</Text>
          <Text title size="small">Small Title</Text>
          <Text title size="tiny">Tiny Title</Text>
          <Text size="large">Large Text</Text>
          <Text size="small">Small Text</Text>
          <Text size="small" underline>Small Text Underline</Text>
          <Text size="tiny">Tiny Text</Text>
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
