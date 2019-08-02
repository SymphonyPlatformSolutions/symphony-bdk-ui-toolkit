import React from 'react';
import { storiesOf } from '@storybook/react';
import { colors } from '../../../styles/colors';
import Separator from '.';
import Box from '../Box';
import Text from '../Text';

import styled from 'styled-components';

import { THEME_TYPES } from '../../../styles/colors';
const StoryWrapper = styled(Box)`
  background-color: ${props => (props.theme.mode === THEME_TYPES.LIGHT ? 'white' : '#17191C')};
`;

storiesOf('Base', module)
  .add('Separator', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text title size="large">Separator</Text>
        <Box horizontal space={60} align="center">
          <Separator />
        </Box>
      </Box>
    </StoryWrapper>
  ));
