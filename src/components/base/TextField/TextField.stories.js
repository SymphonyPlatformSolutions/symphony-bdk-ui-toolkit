import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../Box';
import TextField from './TextField';

const TextFieldComponent = () => {
  const [input, setInput] = useState('');

  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <TextField
      value={input}
      onChange={handleInput}
      placeholder="Enter a Text Here!"
    />
  );
};

storiesOf('Base', module)
  .add('TextField', () => (
    <Box>
      <TextFieldComponent />
    </Box>
  ));
