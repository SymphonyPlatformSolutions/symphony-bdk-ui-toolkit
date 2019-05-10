import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Box from '../Box';
import InputField from './InputField';

storiesOf('Base', module)
  .add('Input', () => (
    <Box>
      <InputField />
    </Box>
  ));
