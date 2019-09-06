import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import Info from './info.md';
import MessageBox from '.';
import Box from '../box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Message Box', () => (
    <StoryWrapper p={15}>
      <Box>
        <Text isTitle size="large">Message Box</Text>
        <Box>
          <Text size="small">Success</Text>
          <MessageBox type="success">Success!!</MessageBox>
        </Box>
        <Box>
          <Text size="small">Info</Text>
          <MessageBox type="info">Relevant information</MessageBox>
        </Box>
        <Box>
          <Text size="small">Error</Text>
          <MessageBox type="error">Uh oh, something's wrong.</MessageBox>
        </Box>
        <Box>
          <Text size="small">Warning</Text>
          <MessageBox type="warning">Careful with whatever you're doing.</MessageBox>
        </Box>
        <Box>
          <Text size="small">Big text</Text>
          <div style={{ width: '350px' }}>
            <MessageBox type="success">An incredibly large text to be put inside a message box. Usually, the box would be used for small snippets of information, but sometimes this would be needed. Gnarly.</MessageBox>
          </div>
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
