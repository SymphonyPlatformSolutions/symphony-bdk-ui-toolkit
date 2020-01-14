import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import ProgressIndicator from './index';
import Box from '../../layout/box';
import Text from '../../misc/text';
import { StoryWrapper } from '../../misc/wrappers';
import Button from '../../misc/button';
import Info from './info.md';

const ProgressController = (props) => {
  const { steps, ...rest } = props;
  const [current, setCurrent] = useState(0);
  return (
    <Box justify="center" align="center">
      <Box horizontal>
        <ProgressIndicator
          numberOfSteps={steps}
          currentStep={current}
          {...rest}
        />
      </Box>
      <Box horizontal>
        <Button
          size="small"
          onClick={() => {
            if (current > 0) {
              setCurrent(current - 1);
            }
          }}
        >{'<'}
        </Button>
        <Button
          size="small"
          onClick={() => {
            if (current < steps - 1) {
              setCurrent(current + 1);
            }
          }}
        >{'>'}
        </Button>
      </Box>
    </Box>
  );
};

storiesOf('Inputs', module)
  .add('Progress Indicator', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text isTitle>Progress Indicator</Text>
        <Text isTitle size="small">Default Length</Text>
        <Box horizontal>
          <ProgressController steps={3} />
          <ProgressController steps={4} />
          <ProgressController steps={6} />
        </Box>
        <Text isTitle size="small">Custom Length</Text>
        <Box horizontal>
          <ProgressController steps={4} length={200} />
          <ProgressController steps={4} length={400} />
          <ProgressController steps={4} length={600} />
        </Box>
      </Box>
      <Box space={20}>
        <Text isTitle>Horizontal</Text>
        <Text isTitle size="small">Default Length</Text>
        <Box>
          <ProgressController steps={3} horizontal />
          <ProgressController steps={4} horizontal />
          <ProgressController steps={6} horizontal />
        </Box>
        <Text isTitle size="small">Custom Length</Text>
        <Box>
          <ProgressController steps={4} horizontal length={200} />
          <ProgressController steps={4} horizontal length={400} />
          <ProgressController steps={4} horizontal length={600} />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
