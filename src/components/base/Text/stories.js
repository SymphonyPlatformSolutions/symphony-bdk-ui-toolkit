import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '.';
import Text from '.';

storiesOf('Base', module)
  .add('Text', () => (
    <Box p={15}>
      <Box>
        <Text title size="large">Large Title</Text>
        <Text title size="large" underline>Large Title Underline</Text>
        <Text title size="small">Small Title</Text>
        <Text title size="tiny">Tiny Title</Text>
        <Text size="large">Large Text</Text>
        <Text size="small">Small Text</Text>
        <Text size="small" underline>Small Text Underline</Text>
        <Text size="tiny">Tiny Text</Text>
      </Box>
    </Box>
  ));
