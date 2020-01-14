import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, select, text, withKnobs,
} from '@storybook/addon-knobs';
import Box from '../../layout/box';
import InputField from './index';
import Text from '../../misc/text';
import { StoryWrapper } from '../../misc/wrappers';
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

const InputFieldWithErrorStory = ({ isLarge }) => {
  const [input, setInput] = useState('');
  const inputState = 'error';

  function handleInput(e) {
    setInput(e.target.value);
  }

  return (
    <Box vertical space={20}>
      <div style={styles}>
        <InputField
          size={isLarge ? 'large' : 'regular'}
          label="Input Field with error"
          inputState={inputState}
          value={input}
          onChange={handleInput}
          placeholder="Input here..."
          errorMessage="Something's not right!"
        />
      </div>
    </Box>
  );
};

const InputFieldStory = ({ isLarge }) => {
  const [input, setInput] = useState('');
  const inputState = 'initial';

  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <Box vertical space={20}>
      <div style={styles}>
        <InputField
          size={isLarge ? 'large' : 'regular'}
          value={input}
          inputState={inputState}
          onChange={handleInput}
          label="Important field"
          tooltip="A very important field"
          placeholder="Input here..."
        />
      </div>
    </Box>
  );
};

const InputFieldCopyOptionStory = ({ isLarge }) => {
  const [input, setInput] = useState('');
  const inputState = 'initial';

  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <Box vertical space={20}>
      <div style={styles}>
        <InputField
          size={isLarge ? 'large' : 'regular'}
          inputState={inputState}
          value={input}
          onChange={handleInput}
          placeholder="Input here..."
          label="A nice field to copy"
          tooltip="Copy the value that's inside!"
          type="copy"
        />
      </div>
    </Box>
  );
};

const InputFieldPasswordStory = ({ isLarge }) => {
  const [input, setInput] = useState('This is a password');

  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <Box vertical space={20}>
      <div style={styles}>
        <InputField
          size={isLarge ? 'large' : 'regular'}
          label="Password Input Field"
          value={input}
          onChange={handleInput}
          type="password"
        />
      </div>
    </Box>
  );
};

const InputFieldLiveSample = ({ isLarge }) => {
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
      <div style={styles}>
        <InputField
          size={isLarge ? 'large' : 'regular'}
          label="Live Sample (Knobs)"
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

const TextAreaStory = ({ disabled, isLarge }) => {
  const [input, setInput] = useState('');

  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <Box vertical space={20}>
      <div style={styles}>
        <InputField
          size={isLarge ? 'large' : 'regular'}
          label={`${disabled ? 'Disabled ' : ''} Text Area`}
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

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('InputField', () => (
    <StoryWrapper p={15}>
      <Box horizontal>
        <Box>
          <Text isTitle>Regular Size</Text>
          <InputFieldLiveSample />
          <InputFieldStory />
          <InputFieldCopyOptionStory />
          <InputFieldPasswordStory />
          <Box vertical space={20}>
            <div style={styles}>
              <InputField disabled label="Disabled input field" />
            </div>
          </Box>
          <Box vertical space={20}>
            <div style={styles}>
              <InputField readOnly value="Some content" label="Read-Only Field" />
            </div>
          </Box>
          <Box vertical space={20}>
            <div style={styles}>
              <InputField type="copy" readOnly value="Some other content" label="Read-Only Copy Field" />
            </div>
          </Box>
          <Box vertical space={20}>
            <div style={styles}>
              <InputField disabled label="Disabled input field with value" value="Some stuff written to be read only!" />
            </div>
          </Box>
          <InputFieldWithErrorStory />
          <TextAreaStory />
          <TextAreaStory disabled />
        </Box>
        <Box>
          <Text isTitle>Large Size</Text>
          <InputFieldLiveSample isLarge />
          <InputFieldStory isLarge />
          <InputFieldCopyOptionStory isLarge />
          <InputFieldPasswordStory isLarge />
          <Box vertical space={20}>
            <div style={styles}>
              <InputField size="large" disabled label="Disabled input field" />
            </div>
          </Box>
          <Box vertical space={20}>
            <div style={styles}>
              <InputField size="large" readOnly value="Some content" label="Read-Only Field" />
            </div>
          </Box>
          <Box vertical space={20}>
            <div style={styles}>
              <InputField size="large" type="copy" readOnly value="Some other content" label="Read-Only Copy Field" />
            </div>
          </Box>
          <Box vertical space={20}>
            <div style={styles}>
              <InputField size="large" disabled label="Disabled input field with value" value="Some stuff written to be read only!" />
            </div>
          </Box>
          <InputFieldWithErrorStory isLarge />
          <TextAreaStory isLarge />
          <TextAreaStory isLarge disabled />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
