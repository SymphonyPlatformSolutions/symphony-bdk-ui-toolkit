import React, { useState } from 'react';
import ProgressIndicator from '../index';
import Box from '../../../layout/box';
import Button from '../../../misc/button';

export const ProgressController = (props) => {
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
