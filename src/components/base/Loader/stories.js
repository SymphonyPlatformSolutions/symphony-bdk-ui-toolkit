import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, color, number,
} from '@storybook/addon-knobs';
import styled from 'styled-components';
import { colors, THEME_TYPES } from '../../../styles/colors';
import Loader from '.';
import Box from '../Box';
import Text from '../Text';


const StoryWrapper = styled(Box)`
  background-color: ${props => (props.theme.mode === THEME_TYPES.LIGHT ? 'white' : '#17191C')};
`;

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Loader', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text title size="large">Live Example (Knobs)</Text>
        <Box horizontal space={60} align="center">
          <Loader
            size={number('Size: ', 15)}
            color={color('Loader Color: ', colors.caution)}
          />
        </Box>
      </Box>
      <Box space={20}>
        <Text title size="large">Loader sizes</Text>
        <Box horizontal space={60} align="center">
          <Loader
            size={15}
            color={colors.caution}
          />
          <Loader
            size={35}
            color={colors.caution}
          />
        </Box>
      </Box>
      <Box space={20}>
        <Text title size="large">Loader colors</Text>
        <Box horizontal space={60} align="center">
          <Loader
            size={25}
            color={colors.cta}
          />
          <Loader
            size={25}
            color={colors.caution}
          />
        </Box>
      </Box>
    </StoryWrapper>
  ));
