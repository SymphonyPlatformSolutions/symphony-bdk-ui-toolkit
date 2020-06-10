import React, { useState } from 'react';
import Box from '../../../layout/box';
import Dropdown from '../index';

export const OPTIONS = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
  {
    value: 'option3',
    label: 'Option 3',
  },
  {
    value: 'option4',
    label: 'Option 4',
    isDisabled: true,
  },
  {
    value: 'option5',
    label: 'Option 5',
  },
];

export const DropdownHandler = (props) => {
  const [chosen, changeChosen] = useState(null);

  return (
    <Box style={{ width: '300px' }}>
      <Dropdown {...props} value={chosen} onChange={changeChosen} />
    </Box>
  );
};
