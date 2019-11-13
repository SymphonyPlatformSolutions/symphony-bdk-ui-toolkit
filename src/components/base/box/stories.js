import React from 'react';

import { storiesOf } from '@storybook/react';

import Box from '.';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

const boxStyle = {
  width: '100px',
  height: '40px',
  lineHeight: '40px',
  textAlign: 'center',
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
      <Box type="primary">
        <Text isTitle>Box Justify</Text>
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
        <Box space={10}>
          <Text isTitle>Box Primary Horizontal</Text>
          <Box horizontal>
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
        </Box>
        <Box space={10}>
          <Text isTitle>Box Secondary Horizontal</Text>
          <Box horizontal type="secondary">
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
        </Box>
        <Box space={10}>
          <Text isTitle>Box Flat Horizontal</Text>
          <Box horizontal type="flat">
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
        </Box>
        <Box space={10}>
          <Text isTitle>Box Primary Vertical</Text>
          <Box vertical>
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
        </Box>
        <Box space={10}>
          <Text isTitle>Box Secondary Vertical</Text>
          <Box vertical type="secondary">
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
        </Box>
        <Box space={10}>
          <Text isTitle>Box Flat Horizontal</Text>
          <Box horizontal type="flat">
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
        </Box>
        <Box space={10}>
          <Text isTitle>Box Flat Vertical</Text>
          <Box vertical type="flat">
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
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: { markdown: Info },
  });
