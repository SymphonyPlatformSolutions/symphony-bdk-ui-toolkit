import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import InputField from './InputField';
import Box from '../Box';

storiesOf('Base', module)
  .add('Input', () => (
    <Box>
      <InputField />
    </Box>
  ));
