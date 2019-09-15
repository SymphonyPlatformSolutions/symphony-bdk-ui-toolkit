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


const TEXT_TYPES = {
  Primary: 'primary',
  Secondary: 'secondary',
  Danger: 'danger',
  Info: 'info',
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Text', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text isTitle>Live Example (Knobs)</Text>
        <Text
          underline={boolean('Has underline', false)}
          isTitle={boolean('Is Title', false)}
          type={select('Text Types', TEXT_TYPES, 'primary')}
          size={select('Text Sizes', TEXT_SIZES, 'large')}
          px={text('Padding vertical', '10px')}
          py={text('Padding horizontal', '3px')}
          mx={text('Margin Vertical', '10px')}
          my={text('Margin Horizontal', '0px')}
        >
          {text('Label', sampleText)}
        </Text>
      </Box>
      <Box space={20}>
        <Text isTitle>Title</Text>
        <Box>
          <Text type="secondary" isTitle size="large" underline>Large Title Underline</Text>
          <Text type="secondary" isTitle size="small">Small Title</Text>
          <Text type="secondary" isTitle size="tiny">Tiny Title</Text>
          <Text type="secondary" size="large">Large Text</Text>
          <Text type="secondary" size="small">Small Text</Text>
          <Text type="secondary" size="small" underline>Small Text Underline</Text>
          <Text type="secondary" size="tiny">Tiny Text</Text>
          <Text tooltip="Some additional info that's needed!">Text with tooltip</Text>
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
