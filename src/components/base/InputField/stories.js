import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../Box';
import InputField from '.';
import Text from '../Text';

const styles = {
  width: '24rem',
};

const InputFieldWithErrorStory = () => {
  const [input, setInput] = useState('');
  const error = true;

  function handleInput(e) {
    setInput(e.target.value);
  }

  return (
    <Box vertical space={2}>
      <Text title size="large">Input Field with error</Text>
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

const InputFieldStory = () => {
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

const InputFieldCopyOptionStory = () => {
  const [input, setInput] = useState('');

  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <Box vertical space={20}>
      <Text title size="large">Input Field with copy option</Text>
      <div style={styles}>

        <InputField
          value={input}
          onChange={handleInput}
          placeholder="Input here..."
          copyInput
        />
      </div>
    </Box>
  );
};

storiesOf('Base', module)
  .add('InputField', () => (
    <Box p={15}>
      <InputFieldStory />
      <InputFieldCopyOptionStory />
      <Box vertical space={20}>
        <Text title size="large">Disabled input field</Text>
        <div style={styles}>
          <InputField disabled />
        </div>
      </Box>
      <InputFieldWithErrorStory />
    </Box>
  ));
