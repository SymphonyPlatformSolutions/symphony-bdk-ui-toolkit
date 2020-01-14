import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import Info from './info.md';
import Box from '../../layout/box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import { ToasterProvider, ToasterConsumer } from './toaster-context';
import Button from '../button';

storiesOf('Misc', module)
  .addDecorator(withKnobs)
  .add('Toaster', () => (
    <StoryWrapper p={15}>
      <ToasterProvider>
        <Box>
          <Text isTitle>Toaster</Text>
          <Box horizontal space={20}>
            <ToasterConsumer>
              {context => (
                <Button onClick={() => context.showToast({ message: 'An absolute success!', type: 'success' })}>Success</Button>
              )}
            </ToasterConsumer>
            <ToasterConsumer>
              {context => (
                <Button onClick={() => context.showToast({ message: 'A resounding failure!', type: 'error' })}>Error</Button>
              )}
            </ToasterConsumer>
            <ToasterConsumer>
              {context => (
                <Button onClick={() => context.showToast({ message: 'An informative excerpt.', type: 'info' })}>Info</Button>
              )}
            </ToasterConsumer>
            <ToasterConsumer>
              {context => (
                <Button onClick={() => context.showToast({ message: 'A friendly warning...!', type: 'warning' })}>Warning</Button>
              )}
            </ToasterConsumer>
          </Box>
        </Box>
      </ToasterProvider>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
