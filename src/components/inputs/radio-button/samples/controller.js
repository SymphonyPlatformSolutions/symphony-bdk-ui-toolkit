import React, { useState } from 'react';
import RadioButton from '../index';
import Box from '../../../layout/box';

export const RadioGroup = ({ disabled, groupNumber }) => {
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
