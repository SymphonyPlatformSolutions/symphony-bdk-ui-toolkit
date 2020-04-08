import React, { useState } from 'react';
import Box from '../../../layout/box';
import InputField from '../index';

export const InputFieldController = (props) => {
  const [input, setInput] = useState(null);

  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <Box vertical space={20}>
      <div style={{ width: '24rem' }}>
        <InputField
          {...props}
          value={input || props.value}
          onChange={handleInput}
        />
      </div>
    </Box>
  );
};
