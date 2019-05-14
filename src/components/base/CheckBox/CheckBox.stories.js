import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './CheckBox';
import Box from '../Box';
import Text from '../Text';

const CheckBoxComponent = () => {
  const [isChecked, setCheckMark] = useState(false);

  function handleCheckMark(e) {
    setCheckMark(e.target.checked);
  }

  return (
    <Checkbox
      isChecked={isChecked}
      onChange={handleCheckMark}
      disabled={false}
    >
      <span>Awesome Label</span>
    </Checkbox>
  );
};

storiesOf('Base', module)
  .add('Checkbox', () => (
    <Box p={15}>
      <Box vertical space={20}>
        <Text title size="large">Default CheckBox</Text>
        <CheckBoxComponent />
      </Box>
      <Box vertical space={20}>
        <Text title size="large">Default CheckBox</Text>
        <Checkbox disabled>
          Disabled CheckBox
        </Checkbox>
      </Box>
    </Box>
  ));
