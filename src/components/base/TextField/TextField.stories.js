import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../Box';
import TextField from './TextField';
import Text from '../Text';

const TextFieldComponent = () => {
  const styles = {
    display: 'flex',
    width: '14rem',
  };
  const [input, setInput] = useState('');

  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <Box p={15}>
      <Box vertical space={20}>
        <Text title size="large">Default text field</Text>
        <div style={styles}>

          <TextField
            value={input}
            onChange={handleInput}
            placeholder="Enter a Text Here!"
          />
        </div>
      </Box>
      <Box vertical space={20}>
        <Text title size="large">Disabled text field</Text>
        <div style={styles}>
          <TextField disabled />
        </div>
      </Box>
    </Box>

  );
};

storiesOf('Base', module)
  .add('TextField', () => (
    <TextFieldComponent />
  ));
