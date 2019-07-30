import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs, text, boolean, select,
} from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx/lib';
import styled from 'styled-components';

import Button from '.';
import Box from '../Box';
import Text from '../Text';
import { THEME_TYPES, colors } from '../../../styles/colors';

const asyncAction = async () => new Promise(success => setTimeout(success, 2000));

const EditableComponent = () => {
  const BUTTON_TYPES = {
    Caution: 'caution',
    CTA: 'cta',
    System: 'system',
    Darkgrey: 'darkgrey',
  };

  const FILL_TYPES = {
    FILLED: 'filled',
    GHOST: 'ghost',
    NONE: 'none',
  };

  const BUTTON_SIZES = {
    TINY: 'tiny',
    SMALL: 'small',
    LARGE: 'large',
  };

  return (
    <Box horizontal space={20} align="center">
      <Button
        size={select('Button Size', BUTTON_SIZES, 'large')}
        type={select('Button Type', BUTTON_TYPES, 'cta')}
        fill={select('Button Fill Type', FILL_TYPES)}
        disabled={boolean('Disabled', false)}
      >
        <span>{text('Button Label', 'Sample')}</span>
      </Button>
    </Box>
  );
};

const StoryWrapper = styled(Box)`
  background-color: ${props => (props.theme.mode === THEME_TYPES.LIGHT ? 'white' : colors.darkgrey)};
`;

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .add('Button', () => (
    <StoryWrapper p={15}>
      <Box>
        <Text title size="large">Live Example (Knobs)</Text>
        { EditableComponent() }
      </Box>
      <Box>
        <Text title size="large">Button types</Text>
        <Box horizontal space={20}>
          <Button size="large" type="cta" fill="filled" onClick={action('clicked')}>
            <span>CTA</span>
          </Button>
          <Button size="large" type="caution" fill="filled" onClick={action('clicked')}>
            <span>Caution</span>
          </Button>
          <Button size="large" type="system" fill="filled" onClick={action('clicked')}>
            <span>System</span>
          </Button>
          <Button size="large" type="darkgrey" fill="ghost" onClick={action('clicked')}>
            <span>GHOST</span>
          </Button>
          <Button size="large" type="caution" fill="ghost" onClick={action('clicked')}>
            <span>GHOST</span>
          </Button>
        </Box>
      </Box>
      <Box>
        <Text title size="large">Outlined buttons</Text>
        <Box horizontal space={20}>
          <Button size="large" type="cta" onClick={action('clicked')}>
            <span>CTA</span>
          </Button>
          <Button size="large" type="caution" onClick={action('clicked')}>
            <span>Caution</span>
          </Button>
          <Button size="large" type="system" onClick={action('clicked')}>
            <span>System</span>
          </Button>
        </Box>
        <Box>
          <Text title size="large">Button size</Text>
          <Box horizontal space={20} align="center">
            <Button size="large" type="cta" fill="filled" onClick={action('clicked')}>
              <span>Large</span>
            </Button>
            <Button size="small" type="caution" onClick={action('clicked')}>
              <span>Small</span>
            </Button>
            <Button size="tiny" type="system" onClick={action('clicked')}>
              <span>Tiny</span>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text title size="large">Async loader</Text>
        <Box horizontal space={20} align="center">
          <Button size="large" type="cta" fill="filled" onClick={asyncAction}>
            <span>Next</span>
          </Button>
          <Button size="large" type="caution" onClick={asyncAction}>
            <span>Delete</span>
          </Button>
          <Button size="small" fill="filled" type="system" onClick={asyncAction}>
            <span>Submit</span>
          </Button>
        </Box>
      </Box>
      <Box>
        <Text title size="large">Disabled buttons</Text>
        <Box horizontal space={20} align="center">
          <Button size="large" type="cta" fill="filled" disabled onClick={asyncAction}>
            <span>Disabled</span>
          </Button>
          <Button size="large" type="caution" disabled onClick={asyncAction}>
            <span>Disabled</span>
          </Button>
          <Button size="small" type="system" fill="filled" disabled onClick={asyncAction}>
            <span>Disabled</span>
          </Button>
          <Button size="large" type="darkgrey" disabled fill="ghost" onClick={action('clicked')}>
            <span>DISABLED</span>
          </Button>
        </Box>
      </Box>
    </StoryWrapper>
  ));
