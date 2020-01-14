import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import Info from './info.md';
import MessageBox from './index';
import Box from '../../layout/box';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import { NoOp } from '../../../utils/helpers';

storiesOf('Misc', module)
  .addDecorator(withKnobs)
  .add('Message Box', () => (
    <StoryWrapper p={15}>
      <Box>
        <Text isTitle size="large">Message Box</Text>
        <Box>
          <Text isTitle>Success</Text>
          <MessageBox type="success">Success!!</MessageBox>
          <Box horizontal>
            <MessageBox hasButton buttonHandler={NoOp} type="success">Success!!</MessageBox>
          </Box>
        </Box>
        <Box>
          <Text isTitle>Info</Text>
          <MessageBox type="info">Relevant information</MessageBox>
          <Box horizontal>
            <MessageBox hasButton buttonHandler={NoOp} type="info">Relevant information</MessageBox>
          </Box>
        </Box>
        <Box>
          <Text isTitle>Error</Text>
          <MessageBox type="error">Uh oh, something's wrong.</MessageBox>
          <Box horizontal>
            <MessageBox hasButton buttonHandler={NoOp} type="error">Uh oh, something's wrong.</MessageBox>
          </Box>
        </Box>
        <Box>
          <Text isTitle>Warning</Text>
          <MessageBox type="warning">Careful with whatever you're doing.</MessageBox>
          <Box horizontal>
            <MessageBox hasButton buttonHandler={NoOp} type="warning">Careful with whatever you're doing.</MessageBox>
          </Box>
        </Box>
        <Box>
          <Text isTitle>Big text</Text>
          <div style={{ width: '350px' }}>
            <MessageBox type="success">An incredibly large text to be put inside a message box. Usually, the box would be used for small snippets of information, but sometimes this would be needed. Gnarly.</MessageBox>
          </div>
          <div style={{ width: '350px' }}>
            <MessageBox hasButton buttonHandler={NoOp} type="success">An incredibly large text to be put inside a message box. Usually, the box would be used for small snippets of information, but sometimes this would be needed. Gnarly.</MessageBox>
          </div>

        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
