import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../Box';
import TextField from './TextField';
import Text from '../Text';

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
    <Box p={15}>
      <Box vertical space={20}>
        <Text title size="large">Default text field</Text>
        <TextFieldComponent />
      </Box>
      <Box vertical space={20}>
        <Text title size="large">Disabled text field</Text>
        <TextField disabled />
      </Box>
    </Box>
  ));
