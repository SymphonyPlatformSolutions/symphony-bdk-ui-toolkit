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

const OPTIONS = [
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
  },
  {
    value: 'option5',
    label: 'Option 5',
  },
];

const DropdownHandler = (props) => {
  const [chosen, changeChosen] = useState(null);

  return (
    <Box style={{ width: '300px' }}>
      <Dropdown {...props} value={chosen} onChange={changeChosen} />
    </Box>
  );
};

const AsyncDropdownHandler = (props) => {
  const { options, ...rest } = props;
  const [chosen, changeChosen] = useState(null);
  const [isLoading, toggleIsLoading] = useState(false);
  const [loadedOptions, changeLoadedOptions] = useState([]);

  return (
    <Box style={{ width: '300px' }}>
      <Dropdown
        {...rest}
        value={chosen}
        onChange={changeChosen}
        isLoading={isLoading}
        clickHandler={() => {
          toggleIsLoading(true);
          changeLoadedOptions([]);
          setTimeout(() => {
            changeLoadedOptions(options.slice(Math.floor(Math.random() * 3) + 2));
            toggleIsLoading(false);
          }, 1000);
        }}
        options={loadedOptions}
      />
    </Box>
  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Dropdown', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <Box>
          <Text isTitle size="large">Dropdown</Text>
          <Box style={{ width: '300px' }}>
            <DropdownHandler options={OPTIONS} />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Dropdown with Error</Text>
          <Box style={{ width: '300px' }}>
            <DropdownHandler options={OPTIONS} error errorMessage="Something ain't right!" />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Disabled Dropdown</Text>
          <Box style={{ width: '300px' }}>
            <Dropdown disabled options={OPTIONS} />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Filled disabled Dropdown</Text>
          <Box style={{ width: '300px' }}>
            <Dropdown disabled chosenValue="option2" options={OPTIONS} />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Empty Dropdown</Text>
          <Box style={{ width: '300px' }}>
            <Dropdown options={[]} />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Dropdown with Loading</Text>
          <Box style={{ width: '300px' }}>
            <AsyncDropdownHandler options={OPTIONS} />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Empty Dropdown with Loading</Text>
          <Box style={{ width: '300px' }}>
            <AsyncDropdownHandler options={[]} />
          </Box>
        </Box>
      </Box>
    </StoryWrapper>
  ),
  {
    notes: {
      markdown: Info,
    },
  });
