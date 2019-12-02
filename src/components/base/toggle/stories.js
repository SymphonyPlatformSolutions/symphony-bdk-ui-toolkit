import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Toggle from '.';
import Box from '../box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
// import Info from './info.md';

const ToggleComponent = (props) => {
  const { children, ...rest } = props;
  const [toggled, setToggle] = useState(true);

  return (
    <Toggle
      {...rest}
      toggled={toggled}
      onChange={setToggle}
    >{children}
    </Toggle>
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
            <Text isTitle size="small">Regular</Text>
            <ToggleComponent>Regular Toggle</ToggleComponent>
          </Box>
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      // markdown: Info,
    },
  });
