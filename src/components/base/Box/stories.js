import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Box from '.';
import Text from '../Text';
import { colors } from '../../../styles/colors';

const boxStyle = {
  width: '100px',
  height: '40px',
  lineHeight: '40px',
  border: '2px solid black',
  textAlign: 'center',
  fontFamily: 'Lato'
};
const boxCTA = {
  background: colors.cta,
  color: colors.white,
};
const boxCaution = {
  background: colors.caution,
  color: colors.white,
};
const boxSystem = {
  background: colors.system,
  color: colors.white,
};

storiesOf('Base', module)
  .add('Box', () => (
    <Box p={15}>
      <Box>
        <Text title size="large">Box Horizontal</Text>
        <Box horizontal space={20}>
          <Box style={Object.assign({},boxStyle, boxCTA)}>
            <span>Child</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxCaution)}>
            <span>Child</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxSystem)}>
            <span>Child</span>
          </Box>
        </Box>
        <Text title size="large">Box Vertical</Text>
        <Box vertical space={20}>
          <Box style={Object.assign({},boxStyle, boxCTA)}>
            <span>Child</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxCaution)}>
            <span>Child</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxSystem)}>
            <span>Child</span>
          </Box>
        </Box>
        <Text title size="large">Box Justify</Text>
        <Box horizontal justify={'flex-start'} space={20}>
          <Box style={Object.assign({},boxStyle, boxCTA)}>
            <span>flex-start</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxCaution)}>
            <span>flex-start</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxSystem)}>
            <span>flex-start</span>
          </Box>
        </Box>
        <Box horizontal justify={'center'} space={20}>
          <Box style={Object.assign({},boxStyle, boxCTA)}>
            <span>center</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxCaution)}>
            <span>center</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxSystem)}>
            <span>center</span>
          </Box>
        </Box>
        <Box horizontal justify={'flex-end'} space={20}>
          <Box style={Object.assign({},boxStyle, boxCTA)}>
            <span>flex-end</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxCaution)}>
            <span>flex-end</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxSystem)}>
            <span>flex-end</span>
          </Box>
        </Box>
      </Box>
    </Box>
  ));