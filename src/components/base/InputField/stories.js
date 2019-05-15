import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../Box';
import InputField from '.';
import Text from '../Text';

const styles = {
  display: 'flex',
  width: '24rem',
};

const InputFieldWithError = () => {
  const [input, setInput] = useState('');
  const error = true;

  function handleInput(e) {
    setInput(e.target.value);
  }

  return (
    <Box vertical space={2}>
      <Text title size="large">Input Field With Error</Text>
      <div style={styles}>

        <InputField
          inputState={error}
          value={input}
          onChange={handleInput}
          placeholder="Input here..."
        />

      </div>
      {
        error && <Text size="tiny">Error message here.</Text>
      }
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
      <Text title size="large">Input Field</Text>
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
      <InputFieldWithError />
    </Box>
  ));
