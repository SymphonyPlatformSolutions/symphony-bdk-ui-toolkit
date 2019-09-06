import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, select, text, withKnobs,
} from '@storybook/addon-knobs';
import Box from '../box';
import InputField from '.';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

const styles = {
  width: '24rem',
};

const INPUT_STATES = {
  Initial: 'INITIAL',
  Modified: 'modified',
  Error: 'error',
};

const INPUT_TYPES = {
  Text: 'text',
  TextArea: 'textarea',
  Password: 'password',
};

const InputFieldWithErrorStory = () => {
  const [input, setInput] = useState('');
  const inputState = 'error';

  function handleInput(e) {
    setInput(e.target.value);
  }

  return (
    <Box vertical space={20}>
      <Text isisTitle size="large">Input Field with error</Text>
      <div style={styles}>
        <InputField
          inputState={inputState}
          value={input}
          onChange={handleInput}
          placeholder="Input here..."
          errorMessage="Something's not right!"
        />
        {/* {inputState === 'error' && <Text size="tiny">Error message here.</Text>} */}
      </div>
    </Box>
  );
};

const InputFieldStory = () => {
  const [input, setInput] = useState('');
  const inputState = 'initial';

  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <Box vertical space={20}>
      <Text isisTitle size="large">Input Field</Text>
      <div style={styles}>

        <InputField
          value={input}
          inputState={inputState}
          onChange={handleInput}
          placeholder="Input here..."
        />
      </div>
    </Box>
  );
};

const InputFieldCopyOptionStory = () => {
  const [input, setInput] = useState('');
  const inputState = 'initial';

  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <Box vertical space={20}>
      <Text isisTitle size="large">Input Field with copy option</Text>
      <div style={styles}>

        <InputField
          inputState={inputState}
          value={input}
          onChange={handleInput}
          placeholder="Input here..."
          copyInput
        />
      </div>
    </Box>
  );
};

const InputFieldPasswordStory = () => {
  const [input, setInput] = useState('This is a password');

  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <Box vertical space={20}>
      <Text isTitle size="large">Password Input Field</Text>
      <div style={styles}>
        <InputField
          value={input}
          onChange={handleInput}
          type="password"
        />
      </div>
    </Box>
  );
};

const InputFieldLiveSample = () => {
  const [input, setInput] = useState('');

  function handleInput(e) {
    setInput(e.target.value);
  }
  const placeHolder = text('Placeholder', 'placeholder');
  const inputStates = select('States', INPUT_STATES, 'initial');
  const inputTypes = select('Type', INPUT_TYPES, 'text');
  const isDisabled = boolean('Disabled', false);
  const hasCopy = boolean('Has copy input', false);
  const showPassword = boolean('Has show password', true);

  return (
    <Box vertical space={20}>
      <Text isTitle size="large">Live Sample (Knobs)</Text>
      <div style={styles}>
        <InputField
          placeholder={placeHolder}
          inputState={inputStates}
          type={inputTypes}
          disabled={isDisabled}
          copyInput={hasCopy}
          value={input}
          hasPasswordShow={showPassword}
          onChange={handleInput}
        />
      </div>
    </Box>
  );
};

const TextAreaStory = ({ disabled }) => {
  const [input, setInput] = useState('');

  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <Box vertical space={20}>
      <Text isTitle size="large">{disabled && 'Disabled '} Text Area</Text>
      <div style={styles}>
        <InputField
          value={input}
          onChange={handleInput}
          placeholder="Input here..."
          type="textarea"
          disabled={disabled}
        />
      </div>
    </Box>
  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('InputField', () => (
    <StoryWrapper p={15}>
      <InputFieldLiveSample />
      <InputFieldStory />
      <InputFieldCopyOptionStory />
      <InputFieldPasswordStory />
      <Box vertical space={20}>
        <Text isTitle size="large">Disabled input field</Text>
        <div style={styles}>
          <InputField disabled />
        </div>
      </Box>
      <InputFieldWithErrorStory />
      <TextAreaStory />
      <TextAreaStory disabled />
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
