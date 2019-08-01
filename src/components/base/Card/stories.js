import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import styled from 'styled-components';
import Card from '.';
import Box from '../Box';
import Text from '../Text';


import { THEME_TYPES } from '../../../styles/colors';

const StoryWrapper = styled(Box)`
  background-color: ${props => (props.theme.mode === THEME_TYPES.LIGHT ? 'white' : '#17191C')};
`;


storiesOf('Base', module)
  .add('Card', () => (
    <StoryWrapper p={15}>
      <Box>
        <Text title size="large">Cards</Text>
        <Card title="Card with title">
          <Text size="small">Lorem ipsum dolor</Text>
        </Card>
        <Card>
          <Text size="small">Card without title</Text>
        </Card>
      </Box>
    </StoryWrapper>
  ));
