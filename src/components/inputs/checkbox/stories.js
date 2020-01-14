import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Checkbox from './index';
import Box from '../../layout/box';
import Text from '../../misc/text';
import { NoOp } from '../../../utils/helpers';
import { StoryWrapper } from '../../misc/wrappers';
import Info from './info.md';

const CheckBoxComponent = (props) => {
  const { children, ...rest } = props;
  const [isChecked, setCheckMark] = useState(true);

  return (
    <Checkbox
      {...rest}
      checked={isChecked}
      onChange={({ target: { checked } }) => setCheckMark(checked)}
    >{children}
    </Checkbox>
  );
};

const IndeterminateCheckbox = (props) => {
  const { children, ...rest } = props;
  const [isChecked, setCheckMark] = useState(true);
  const [isIndeterminate, setIndeterminate] = useState(false);
  return (
    <Checkbox
      {...rest}
      indeterminate={isIndeterminate}
      checked={isChecked}
      onChange={() => {
        if (isChecked && isIndeterminate) {
          setIndeterminate(false);
        } else if (!isChecked) {
          setCheckMark(true);
          setIndeterminate(true);
        } else {
          setCheckMark(false);
        }
      }}
    >{children}
    </Checkbox>
  );
};

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('Checkbox', () => (
    <StoryWrapper p={15}>
      <Box>
        <Text isTitle>Default CheckBox</Text>
        <Box horizontal>
          <Box type="secondary">
            <Text isTitle size="small">Regular</Text>
            <CheckBoxComponent>Regular Checkbox</CheckBoxComponent>
            <IndeterminateCheckbox>Indeterminate Checkbox</IndeterminateCheckbox>
          </Box>
          <Box type="secondary">
            <Text isTitle size="small">Large</Text>
            <CheckBoxComponent size="large">Large Checkbox</CheckBoxComponent>
            <IndeterminateCheckbox size="large">Large Indeterminate Checkbox</IndeterminateCheckbox>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text isTitle>Disabled CheckBox</Text>
        <Box horizontal>
          <Box type="secondary">
            <Text isTitle size="small">Regular</Text>
            <Checkbox onChange={NoOp} disabled>Disabled Unchecked</Checkbox>
            <Checkbox onChange={NoOp} checked disabled>Disabled Checked</Checkbox>
            <Checkbox onChange={NoOp} indeterminate checked disabled>Disabled Checked</Checkbox>
          </Box>
          <Box type="secondary">
            <Text isTitle size="small">Large</Text>
            <Checkbox onChange={NoOp} size="large" disabled>Disabled Unchecked</Checkbox>
            <Checkbox onChange={NoOp} size="large" checked disabled>Disabled Checked</Checkbox>
            <Checkbox onChange={NoOp} size="large" indeterminate checked disabled>Disabled Checked</Checkbox>
          </Box>
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
