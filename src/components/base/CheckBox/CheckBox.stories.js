import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './CheckBox';
import Box from '../Box';

storiesOf('Base', module)
  .add('Checkbox', () => (
    <Box>
      <span>TEst</span>
      <Checkbox isChecked>
        my-label
      </Checkbox>
      <Checkbox>
        random-label
      </Checkbox>
    </Box>
  ));
