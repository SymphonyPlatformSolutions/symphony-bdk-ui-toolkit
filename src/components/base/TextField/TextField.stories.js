import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Box from '../Box';
import TextField from './TextField';

const [input, setInput] = useState('');

function handleInput(e) {
  setInput(e.target.value);
}

storiesOf('Base', module)
  .add('Input', () => (
    <Box>
      <TextField
        value={input}
        onChange={handleInput}
        placeholder="Enter a Text Here!"
      />
    </Box>
  ));
