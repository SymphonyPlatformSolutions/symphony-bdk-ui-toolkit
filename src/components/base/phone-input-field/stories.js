import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, select, withKnobs,
} from '@storybook/addon-knobs';
import Box from '../box';
import PhoneInputField from '.';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

const styles = {
  width: '24rem',
};

const INPUT_STATES = {
  Initial: 'initial',
  Error: 'error',
};

const PhoneInputFieldLiveSample = () => {
  const [input, setInput] = useState('');
  const inputStates = select('States', INPUT_STATES, 'initial');
  const isDisabled = boolean('Disabled', false);

  useEffect(() => {
    setInput(`${input}`);
  }, [inputStates, isDisabled]);

  function handleInput(value) {
    setInput(value);
  }

  return (
    <Box vertical space={20}>
      <Text title size="large">Live Sample (Knobs)</Text>
      <div style={styles}>
        <PhoneInputField
          id="test"
          inputState={inputStates}
          disabled={isDisabled}
          value={input}
          onChange={handleInput}
        />
      </div>
    </Box>
  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('PhoneInputField', () => (
    <StoryWrapper p={15}>
      <PhoneInputFieldLiveSample />
      <Box vertical space={20}>
        <Text title size="small">Default Phone Input field</Text>
        <div style={styles}>
          <PhoneInputField value="+1" />
        </div>
      </Box>
      <Box vertical space={20}>
        <Text title size="small">Disabled InputField</Text>
        <div style={styles}>
          <PhoneInputField value="+1" disabled />
        </div>
      </Box>
      <Box vertical space={20}>
        <Text title size="small">Error Phone Input Field</Text>
        <div style={styles}>
          <PhoneInputField value="+1" inputState="error" />
        </div>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
