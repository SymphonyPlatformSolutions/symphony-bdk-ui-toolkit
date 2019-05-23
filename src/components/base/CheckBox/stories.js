import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from '.';
import Box from '../Box';
import Text from '../Text';

const CheckBoxComponent = () => {
  const [isChecked, setCheckMark] = useState(true);

  function handleCheckMark(e) {
    setCheckMark(e.target.checked);
  }

  return (
    <Checkbox
      isChecked={isChecked}
      onChange={handleCheckMark}
      disabled={false}
      label="Checkbox Label"
    />
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
        <Text title size="large">Disabled CheckBox</Text>
        <Checkbox disabled label="Disabled Unchecked" />
        <Checkbox isChecked disabled label="Disabled Checked" />
      </Box>
    </Box>
  ));
