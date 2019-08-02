import React from 'react';

import { storiesOf } from '@storybook/react';

import Box from '.';
import Text from '../Text';
import { StoryWrapper } from '../Wrappers';


const boxStyle = {
  width: '100px',
  height: '40px',
  lineHeight: '40px',
  textAlign: 'center',
  fontFamily: '"Lato", sans-serif',
};
const boxCTA = {
  background: '#006CAF',
  color: '#fff',
};
const boxCaution = {
  background: '#D50935',
  color: '#fff',
};
const boxSystem = {
  background: '#006CAF',
  color: '#fff',
};

storiesOf('Base', module)
  .add('Box', () => (
    <StoryWrapper p={15}>
      <Box>
        <Text title size="large">Box Horizontal</Text>
        <Box horizontal space={20}>
          <Box style={Object.assign({}, boxStyle, boxCTA)}>
            <span>Child</span>
          </Box>
          <Box style={Object.assign({}, boxStyle, boxCaution)}>
            <span>Child</span>
          </Box>
          <Box style={Object.assign({}, boxStyle, boxSystem)}>
            <span>Child</span>
          </Box>
        </Box>
        <Text title size="large">Box Vertical</Text>
        <Box vertical space={20}>
          <Box style={Object.assign({}, boxStyle, boxCTA)}>
            <span>Child</span>
          </Box>
          <Box style={Object.assign({}, boxStyle, boxCaution)}>
            <span>Child</span>
          </Box>
          <Box style={Object.assign({}, boxStyle, boxSystem)}>
            <span>Child</span>
          </Box>
        </Box>
        <Text title size="large">Box Justify</Text>
        <Box space={10}>
          <Box horizontal justify="flex-start" space={20}>
            <Box style={Object.assign({}, boxStyle, boxCTA)}>
              <span>flex-start</span>
            </Box>
            <Box style={Object.assign({}, boxStyle, boxCaution)}>
              <span>flex-start</span>
            </Box>
            <Box style={Object.assign({}, boxStyle, boxSystem)}>
              <span>flex-start</span>
            </Box>
          </Box>
          <Box horizontal justify="center" space={20}>
            <Box style={Object.assign({}, boxStyle, boxCTA)}>
              <span>center</span>
            </Box>
            <Box style={Object.assign({}, boxStyle, boxCaution)}>
              <span>center</span>
            </Box>
            <Box style={Object.assign({}, boxStyle, boxSystem)}>
              <span>center</span>
            </Box>
          </Box>
          <Box horizontal justify="flex-end" space={20}>
            <Box style={Object.assign({}, boxStyle, boxCTA)}>
              <span>flex-end</span>
            </Box>
            <Box style={Object.assign({}, boxStyle, boxCaution)}>
              <span>flex-end</span>
            </Box>
            <Box style={Object.assign({}, boxStyle, boxSystem)}>
              <span>flex-end</span>
            </Box>
          </Box>
        </Box>
      </Box>
    </StoryWrapper>
  ));
