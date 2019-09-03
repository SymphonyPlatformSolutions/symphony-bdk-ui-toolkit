import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import Box from '../box';
import Dropdown from '.';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

const OPTIONS = [{
  value: 'option1',
  label: 'Option 1',
}, {
  value: 'option2',
  label: 'Option 2',
}, {
  value: 'option3',
  label: 'Option 3',
}];

const DropdownHandler = (props) => {
  const [chosen, changeChosen] = useState(null);

  return (
    <Box style={{ width: '300px' }}>
      <Dropdown {...props} value={chosen} onChange={changeChosen} />
    </Box>
  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Dropdown', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <div>
          <Text title size="large">Dropdown</Text>
          <Box style={{ width: '300px' }}>
            <DropdownHandler options={OPTIONS} />
          </Box>
        </div>
        <div>
          <Text title size="large">Disabled dropdown</Text>
          <Box style={{ width: '300px' }}>
            <Dropdown disabled options={OPTIONS} />
          </Box>
        </div>
        <div>
          <Text title size="large">Filled disabled dropdown</Text>
          <Box style={{ width: '300px' }}>
            <Dropdown disabled chosenValue="option2" options={OPTIONS} />
          </Box>
        </div>
        <div>
          <Text title size="large">Empty Dropdown</Text>
          <Box style={{ width: '300px' }}>
            <Dropdown options={[]} />
          </Box>
        </div>
      </Box>
    </StoryWrapper>
  ),
  {
    notes: {
      markdown: Info,
    },
  });
