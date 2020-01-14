import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import RadioButton from './index';
import Box from '../../layout/box';
import Text from '../../misc/text';
import { StoryWrapper } from '../../misc/wrappers';
import Info from './info.md';

const RadioGroup = ({ disabled, groupNumber }) => {
  const [checkedId, setChecked] = useState(1);

  return (
    <Box type="flat">
      <RadioButton
        checked={checkedId === 1}
        id={`radio1${groupNumber}`}
        groupName={`radiogroup${groupNumber}`}
        onChange={() => setChecked(1)}
        disabled={disabled}
      >Option 1
      </RadioButton>
      <RadioButton
        checked={checkedId === 2}
        id={`radio2${groupNumber}`}
        groupName={`radiogroup${groupNumber}`}
        onChange={() => setChecked(2)}
        disabled={disabled}
      >Option 2
      </RadioButton>
      <RadioButton
        checked={checkedId === 3}
        id={`radio3${groupNumber}`}
        groupName={`radiogroup${groupNumber}`}
        onChange={() => setChecked(3)}
        disabled={disabled}
      >Option 3
      </RadioButton>
    </Box>
  );
};

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('Radio Button', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <Box>
          <Text isTitle>Radio Button</Text>
          <RadioGroup groupNumber={1} />
        </Box>
        <Box>
          <Text isTitle>Disabled Radio Button</Text>
          <RadioGroup groupNumber={2} disabled />
        </Box>
      </Box>
    </StoryWrapper>
  ),
  {
    notes: {
      markdown: Info,
    },
  });
