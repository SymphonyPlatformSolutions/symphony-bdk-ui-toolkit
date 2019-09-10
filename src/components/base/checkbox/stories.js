import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
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
      checked={isChecked}
      onChange={handleCheckMark}
      disabled={false}
    >Checkbox Label
    </Checkbox>
  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Checkbox', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <Text isTitle size="large">Default CheckBox</Text>
        <div>
          <CheckBoxComponent />
        </div>
      </Box>
      <Box vertical space={20}>
        <Text isTitle size="large">Disabled CheckBox</Text>
        <Box type="secondary">
          <Checkbox onChange={NoOp} disabled>Disabled Unchecked</Checkbox>
          <Checkbox onChange={NoOp} checked disabled>Disabled Checked</Checkbox>
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
