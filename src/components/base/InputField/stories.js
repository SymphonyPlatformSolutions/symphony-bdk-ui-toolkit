import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../Box';
import InputField from '.';
import Text from '../Text';

const styles = {
  display: 'flex',
  width: '14rem',
};

const ErrorInputFieldComponent = () => {
  const [input, setInput] = useState('');

  function handleInput(e) {
    setInput(e.target.value);
  }

  return (
    <Box vertical space={20}>
      <Text title size="large">Error input field</Text>
      <div style={styles}>

        <InputField
          inputState
          value={input}
          onChange={handleInput}
          placeholder="Error input field"
        />
      </div>
    </Box>
  );
};

const InputFieldComponent = () => {
  const [input, setInput] = useState('');

  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
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
  );
};

storiesOf('Base', module)
  .add('InputField', () => (
    <Box p={15}>
      <InputFieldComponent />
      <Box vertical space={20}>
        <Text title size="large">Disabled input field</Text>
        <div style={styles}>
          <InputField disabled />
        </div>
      </Box>
      <ErrorInputFieldComponent />
    </Box>
  ));
