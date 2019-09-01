import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Checkbox from '.';
import Box from '../box';
import Text from '../text';
import { NoOp } from '../../../utils/helpers';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

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

const CheckBoxWithKnobs = () => {
  const [isChecked, setCheckMark] = useState(true);

  function handleCheckMark(e) {
    setCheckMark(e.target.checked);
  }

  return (
    <Checkbox
      isChecked={isChecked}
      onChange={handleCheckMark}
      disabled={false}
      label={text('Insert Text:')}
    />
  );
};


storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Checkbox', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <Text title size="large">Default CheckBox</Text>
        <CheckBoxComponent />
      </Box>
      <Box vertical space={20}>
        <Text title size="large">Disabled CheckBox</Text>
        <Checkbox onChange={NoOp} disabled label="Disabled Unchecked" />
        <Checkbox onChange={NoOp} isChecked disabled label="Disabled Checked" />
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
