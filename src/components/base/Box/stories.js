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
const boxPrimary = {
  background: colors.primary,
  color: colors.white,
};
const boxDanger = {
  background: colors.danger,
  color: colors.white,
};
const boxSuccess = {
  background: colors.success,
  color: colors.white,
};

storiesOf('Base', module)
  .add('Box', () => (
    <Box p={15}>
      <Box>
        <Text title size="large">Box Horizontal</Text>
        <Box horizontal space={20}>
          <Box style={Object.assign({},boxStyle, boxPrimary)}>
            <span>Child</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxDanger)}>
            <span>Child</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxSuccess)}>
            <span>Child</span>
          </Box>
        </Box>
        <Text title size="large">Box Vertical</Text>
        <Box vertical space={20}>
          <Box style={Object.assign({},boxStyle, boxPrimary)}>
            <span>Child</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxDanger)}>
            <span>Child</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxSuccess)}>
            <span>Child</span>
          </Box>
        </Box>
        <Text title size="large">Box Justify</Text>
        <Box horizontal justify={'flex-start'} space={20}>
          <Box style={Object.assign({},boxStyle, boxPrimary)}>
            <span>flex-start</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxDanger)}>
            <span>flex-start</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxSuccess)}>
            <span>flex-start</span>
          </Box>
        </Box>
        <Box horizontal justify={'center'} space={20}>
          <Box style={Object.assign({},boxStyle, boxPrimary)}>
            <span>center</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxDanger)}>
            <span>center</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxSuccess)}>
            <span>center</span>
          </Box>
        </Box>
        <Box horizontal justify={'flex-end'} space={20}>
          <Box style={Object.assign({},boxStyle, boxPrimary)}>
            <span>flex-end</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxDanger)}>
            <span>flex-end</span>
          </Box>
          <Box style={Object.assign({},boxStyle, boxSuccess)}>
            <span>flex-end</span>
          </Box>
        </Box>
      </Box>
    </Box>
  ));
