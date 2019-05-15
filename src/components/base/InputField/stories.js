import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../Box';
import InputField from '.';
import Text from '../Text';

const InputFieldComponent = () => {
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
        <Text title size="large">Default input field</Text>
        <div style={styles}>

          <InputField
            value={input}
            onChange={handleInput}
            placeholder="Input here..."
          />
        </div>
      </Box>
      <Box vertical space={20}>
        <Text title size="large">Disabled input field</Text>
        <div style={styles}>
          <InputField disabled />
        </div>
      </Box>
    </Box>

  );
};

storiesOf('Base', module)
  .add('InputField', () => (
    <InputFieldComponent />
  ));
