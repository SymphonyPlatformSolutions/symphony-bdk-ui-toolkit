import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Toggle from '.';
import Box from '../box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

const ToggleComponent = (props) => {
  const [toggled, setToggle] = useState(true);

  return (
    <Toggle
      {...props}
      toggled={toggled}
      onChange={setToggle}
    />
  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Toggle', () => (
    <StoryWrapper p={15}>
      <Box>
        <Text isTitle>Default Toggle</Text>
        <Box horizontal>
          <Box type="secondary">
            <ToggleComponent /><Text>Default</Text>
            <ToggleComponent color="red" /><Text>Custom color</Text>
            <ToggleComponent disabled /><Text>Disabled, toggled</Text>
            <Toggle disabled /><Text>Disabled, untoggled</Text>
          </Box>
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
