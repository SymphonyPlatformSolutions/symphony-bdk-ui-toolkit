import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '.';
import Box from '../Box';
import Text from '../Text';

const asyncAction = async () => new Promise(success => setTimeout(success, 2000));

storiesOf('Base', module)
  .add('Button', () => (
    <Box p={15}>
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
    </Box>
  ));
