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
          <Button size="large" type="primary" fill onClick={action('clicked')}>
            <span>Primary</span>
          </Button>
          <Button size="large" type="danger" fill onClick={action('clicked')}>
            <span>Danger</span>
          </Button>
          <Button size="large" type="warning" fill onClick={action('clicked')}>
            <span>Warning</span>
          </Button>
          <Button size="large" type="success" fill onClick={action('clicked')}>
            <span>Success</span>
          </Button>
        </Box>
      </Box>
      <Box>
        <Text title size="large">Outlined buttons</Text>
        <Box horizontal space={20}>
          <Button size="large" type="primary" onClick={action('clicked')}>
            <span>Primary</span>
          </Button>
          <Button size="large" type="danger" onClick={action('clicked')}>
            <span>Danger</span>
          </Button>
          <Button size="large" type="warning" onClick={action('clicked')}>
            <span>Warning</span>
          </Button>
          <Button size="large" type="success" onClick={action('clicked')}>
            <span>Success</span>
          </Button>
        </Box>
        <Box>
          <Text title size="large">Button size</Text>
          <Box horizontal space={20} align="center">
            <Button size="large" type="primary" fill onClick={action('clicked')}>
              <span>Large</span>
            </Button>
            <Button size="small" type="danger" onClick={action('clicked')}>
              <span>Small</span>
            </Button>
            <Button size="tiny" type="success" onClick={action('clicked')}>
              <span>Tiny</span>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text title size="large">Async loader</Text>
        <Box horizontal space={20} align="center">
          <Button size="large" type="primary" fill onClick={asyncAction}>
            <span>Next</span>
          </Button>
          <Button size="large" type="danger" onClick={asyncAction}>
            <span>Delete</span>
          </Button>
          <Button size="small" fill type="success" onClick={asyncAction}>
            <span>Submit</span>
          </Button>
        </Box>
      </Box>
      <Box>
        <Text title size="large">Disabled buttons</Text>
        <Box horizontal space={20} align="center">
          <Button size="large" type="primary" fill disabled onClick={asyncAction}>
            <span>Disabled</span>
          </Button>
          <Button size="large" type="danger" disabled onClick={asyncAction}>
            <span>Disabled</span>
          </Button>
          <Button size="small" type="warning" fill disabled onClick={asyncAction}>
            <span>Disabled</span>
          </Button>
          <Button size="tiny" type="success" disabled onClick={asyncAction}>
            <span>Disabled</span>
          </Button>
        </Box>
      </Box>
    </Box>
  ));
