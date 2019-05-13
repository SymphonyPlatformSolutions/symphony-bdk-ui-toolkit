import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './CheckBox';
import Box from '../Box';

const CheckBoxComponent = () => {
  const [isChecked, setCheckMark] = useState(false);

  function handleCheckMark(e) {
    setCheckMark(e.target.checked);
  }

  return (
    <Box>
      <Checkbox
        isChecked={isChecked}
        onChange={handleCheckMark}
        disabled={false}
      >
        <span>Awesome Label</span>
      </Checkbox>
    </Box>
  );
};

storiesOf('Base', module)
  .add('Checkbox', () => (
    <CheckBoxComponent />
  ));
