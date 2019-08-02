import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Box from '.';
import Text from '.';

import { THEME_TYPES } from '../../../styles/colors';

const StoryWrapper = styled(Box)`
  background-color: ${props => (props.theme.mode === THEME_TYPES.LIGHT ? 'white' : '#17191C')};
`;

storiesOf('Base', module)
  .add('Text', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text title size="large">Title</Text>
        <Box>
          <Text title size="large" underline>Large Title Underline</Text>
          <Text title size="small">Small Title</Text>
          <Text title size="tiny">Tiny Title</Text>
          <Text size="large">Large Text</Text>
          <Text size="small">Small Text</Text>
          <Text size="small" underline>Small Text Underline</Text>
          <Text size="tiny">Tiny Text</Text>
        </Box>
      </Box>
    </StoryWrapper>
  ));
