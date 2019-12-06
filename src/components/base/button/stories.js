import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs, text, boolean, select,
} from '@storybook/addon-knobs';

import Info from './info.md';
import Button from '.';
import Box from '../box';
import Text from '../text';
import { FavoriteButton, CloseButton, MoreButton } from './icon-buttons';
import { FILL_TYPES } from './theme';
import { NoOp } from '../../../utils/helpers';
import { StoryWrapper } from '../wrappers';

const asyncAction = async () => new Promise(success => setTimeout(success, 2000));

const EditableComponent = () => {
  const BUTTON_TYPES = {
    Danger: 'danger',
    Primary: 'primary',
    Secondary: 'secondary',
    Grey: 'grey',
    Submit: 'submit',
  };

  const BUTTON_SIZES = {
    SMALL: 'small',
    REGULAR: 'regular',
    LARGE: 'large',
  };

  return (
    <Box horizontal space={20} align="center">
      <Button
        onClick={NoOp}
        size={select('Button Size', BUTTON_SIZES, 'regular')}
        type={select('Button Type', BUTTON_TYPES, 'primary')}
        fill={select('Button Fill Type', FILL_TYPES)}
        disabled={boolean('Disabled', false)}
      >
        <span>{text('Button Label', 'Sample')}</span>
      </Button>
    </Box>
  );
};

const LoadingContainer = () => {
  const [isLoading, changeLoading] = useState(false);
  return (
    <Button
      loading={isLoading}
      disabled={isLoading}
      size="small"
      type="danger"
      onClick={() => {
        changeLoading(true);
        setTimeout(() => changeLoading(false), 2000);
      }}
    >
      Disconnect
    </Button>

  );
};

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Button', () => (
    <StoryWrapper p={15}>
      <Box>
        <Text isTitle>Live Example (Knobs)</Text>
        { EditableComponent() }
      </Box>
      <Box>
        <Text isTitle>Filled Button</Text>
        <Box horizontal>
          <Box secondary>
            <Text isTitle size="small">Enabled</Text>
            <Box horizontal>
              <Button size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
          <Box secondary>
            <Text isTitle size="small">Disabled</Text>
            <Box horizontal>
              <Button disabled size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button disabled onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button disabled size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
          <Box secondary>
            <Text isTitle size="small">Loading</Text>
            <Box horizontal>
              <Button loading size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button loading onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button loading size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
          <Box secondary>
            <Text isTitle size="small">Danger</Text>
            <Box horizontal>
              <Button type="danger" size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button type="danger" onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button type="danger" size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
          <Box secondary>
            <Text isTitle size="small">Danger Disabled</Text>
            <Box horizontal>
              <Button type="danger" disabled size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button type="danger" disabled onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button type="danger" disabled size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
          <Box secondary>
            <Text isTitle size="small">Danger Loading</Text>
            <Box horizontal>
              <Button type="danger" loading size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button type="danger" loading onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button type="danger" loading size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text isTitle>Outlined Button</Text>
        <Box horizontal>
          <Box secondary>
            <Text isTitle size="small">Enabled</Text>
            <Box horizontal>
              <Button fill="outlined" size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button fill="outlined" onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button fill="outlined" size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
          <Box secondary>
            <Text isTitle size="small">Disabled</Text>
            <Box horizontal>
              <Button fill="outlined" disabled size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button fill="outlined" disabled onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button fill="outlined" disabled size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
          <Box secondary>
            <Text isTitle size="small">Loading</Text>
            <Box horizontal>
              <Button fill="outlined" loading size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button fill="outlined" loading onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button fill="outlined" loading size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
          <Box secondary>
            <Text isTitle size="small">Danger</Text>
            <Box horizontal>
              <Button fill="outlined" type="danger" size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button fill="outlined" type="danger" onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button fill="outlined" type="danger" size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
          <Box secondary>
            <Text isTitle size="small">Danger Disabled</Text>
            <Box horizontal>
              <Button fill="outlined" type="danger" disabled size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button fill="outlined" type="danger" disabled onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button fill="outlined" type="danger" disabled size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
          <Box secondary>
            <Text isTitle size="small">Danger Disabled</Text>
            <Box horizontal>
              <Button loading fill="outlined" type="danger" disabled size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button loading fill="outlined" type="danger" disabled onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button loading fill="outlined" type="danger" disabled size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text isTitle>Ghost Button</Text>
        <Box horizontal>
          <Box secondary>
            <Text isTitle size="small">Enabled</Text>
            <Box horizontal>
              <Button fill="ghost" size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button fill="ghost" onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button fill="ghost" size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
          <Box secondary>
            <Text isTitle size="small">Disabled</Text>
            <Box horizontal>
              <Button fill="ghost" disabled size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button fill="ghost" disabled onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button fill="ghost" disabled size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
          <Box secondary>
            <Text isTitle size="small">Danger</Text>
            <Box horizontal>
              <Button fill="ghost" type="danger" size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button fill="ghost" type="danger" onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button fill="ghost" type="danger" size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
          <Box secondary>
            <Text isTitle size="small">Danger Disabled</Text>
            <Box horizontal>
              <Button fill="ghost" type="danger" disabled size="large" onClick={action('clicked')}>Large</Button>
            </Box>
            <Box horizontal>
              <Button fill="ghost" type="danger" disabled onClick={action('clicked')}>Regular</Button>
            </Box>
            <Box horizontal>
              <Button fill="ghost" type="danger" disabled size="small" onClick={action('clicked')}>Small</Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text isTitle>Circular Button</Text>
          <Box horizontal type="secondary">
            <Button size="small" type="primary" circular onClick={action('clicked')}>+</Button>
            <Button size="regular" type="primary" circular onClick={action('clicked')}>+</Button>
            <Button size="large" type="primary" circular onClick={action('clicked')}>+</Button>

            <Button disabled size="small" type="primary" circular onClick={action('clicked')}>+</Button>
            <Button disabled size="regular" type="primary" circular onClick={action('clicked')}>+</Button>
            <Button disabled size="large" type="primary" circular onClick={action('clicked')}>+</Button>

            <Button size="small" fill="outlined" circular onClick={action('clicked')}>+</Button>
            <Button size="regular" fill="outlined" circular onClick={action('clicked')}>+</Button>
            <Button size="large" fill="outlined" circular onClick={action('clicked')}>+</Button>

            <Button disabled size="small" fill="outlined" circular onClick={action('clicked')}>+</Button>
            <Button disabled size="regular" fill="outlined" circular onClick={action('clicked')}>+</Button>
            <Button disabled size="large" fill="outlined" circular onClick={action('clicked')}>+</Button>
          </Box>
        <Box>
          <Box horizontal space={20}>
            <Button size="small" type="danger" circular onClick={action('clicked')}>+</Button>
            <Button size="regular" type="danger" circular onClick={action('clicked')}>+</Button>
            <Button size="large" type="danger" circular onClick={action('clicked')}>+</Button>

            <Button disabled size="small" type="danger" circular onClick={action('clicked')}>+</Button>
            <Button disabled size="regular" type="danger" circular onClick={action('clicked')}>+</Button>
            <Button disabled size="large" type="danger" circular onClick={action('clicked')}>+</Button>

            <Button size="small" type="danger" fill="outlined" circular onClick={action('clicked')}>+</Button>
            <Button size="regular" type="danger" fill="outlined" circular onClick={action('clicked')}>+</Button>
            <Button size="large" type="danger" fill="outlined" circular onClick={action('clicked')}>+</Button>

            <Button disabled size="small" type="danger" fill="outlined" circular onClick={action('clicked')}>+</Button>
            <Button disabled size="regular" type="danger" fill="outlined" circular onClick={action('clicked')}>+</Button>
            <Button disabled size="large" type="danger" fill="outlined" circular onClick={action('clicked')}>+</Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text isTitle>Async Loader</Text>
        <Box horizontal space={20} align="center">
          <Button type="primary" fill="filled" onClick={asyncAction}>
            <span>Next</span>
          </Button>
          <Button type="danger" fill="outlined" onClick={asyncAction}>
            <span>Delete</span>
          </Button>
          <Button fill="filled" type="secondary" onClick={asyncAction}>
            <span>Submit</span>
          </Button>
          <Button fill="filled" type="primary" circular onClick={asyncAction}>
            <span>+</span>
          </Button>
        </Box>
      </Box>
      <Box>
        <Text isTitle>Icon Buttons</Text>
        <Box horizontal>
          <FavoriteButton />
          <FavoriteButton isFavorite />
          <CloseButton />
          <MoreButton />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
