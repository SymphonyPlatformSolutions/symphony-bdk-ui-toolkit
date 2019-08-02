import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Box from '../Box';
import InputField from '.';
import Text from '../Text';


import { THEME_TYPES } from '../../../styles/colors';

const styles = {
  width: '24rem',
};

const InputFieldWithErrorStory = () => {
  const [input, setInput] = useState('');
  const inputState = 'error';

  function handleInput(e) {
    setInput(e.target.value);
  }

  return (
    <Box vertical space={20}>
      <Text title size="large">Input Field with error</Text>
      <div style={styles}>

        <InputField
          inputState={inputState}
          value={input}
          onChange={handleInput}
          placeholder="Input here..."
        />

      </div>
      {
        inputState === 'error' && <Text size="tiny">Error message here.</Text>
      }
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
      <Text title size="large">Input Field</Text>
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
      <Text title size="large">Input Field with copy option</Text>
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

const StoryWrapper = styled(Box)`
  background-color: ${props => (props.theme.mode === THEME_TYPES.LIGHT ? 'white' : '#17191C')};
`;

storiesOf('Base', module)
  .add('InputField', () => (
    <StoryWrapper p={15}>
      <InputFieldStory />
      <InputFieldCopyOptionStory />
      <Box vertical space={20}>
        <Text title size="large">Disabled input field</Text>
        <div style={styles}>
          <InputField disabled />
        </div>
      </Box>
      <InputFieldWithErrorStory />
    </StoryWrapper>
  ));
