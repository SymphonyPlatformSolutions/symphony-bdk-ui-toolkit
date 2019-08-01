import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import styled from 'styled-components';
import Checkbox from '.';
import Box from '../Box';
import Text from '../Text';
import { THEME_TYPES } from '../../../styles/colors';

const CheckBoxComponent = () => {
  const [isChecked, setCheckMark] = useState(true);

  function handleCheckMark(e) {
    setCheckMark(e.target.checked);
  }

  return (
    <Checkbox
      isChecked={isChecked}
      onChange={handleCheckMark}
      disabled={false}
      label="Checkbox Label"
    />
  );
};

const CheckBoxWithKnobs = () => {
  const [isChecked, setCheckMark] = useState(true);

  function handleCheckMark(e) {
    setCheckMark(e.target.checked);
  }

  return (
    <Checkbox
      isChecked={isChecked}
      onChange={handleCheckMark}
      disabled={false}
      label={text('Insert Text:')}
    />
  );
};

const StoryWrapper = styled(Box)`
  background-color: ${props => (props.theme.mode === THEME_TYPES.LIGHT ? 'white' : '#17191C')};
`;


storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Checkbox', () => (
    <StoryWrapper p={15}>
      <Box vertical space={20}>
        <Text title size="large">Default CheckBox</Text>
        <CheckBoxComponent />
      </Box>
      <Box vertical space={20}>
        <Text title size="large">Disabled CheckBox</Text>
        <Checkbox disabled label="Disabled Unchecked" />
        <Checkbox isChecked disabled label="Disabled Checked" />
      </Box>
    </StoryWrapper>
  ));
