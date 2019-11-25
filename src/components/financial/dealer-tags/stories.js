import React from 'react';

import { storiesOf } from '@storybook/react';

import DealerTag from './index';
import Box from '../../base/box';
import Text from '../../base/text';
import { StoryWrapper } from '../../base/wrappers';
import Info from './info.md';


storiesOf('Financial', module)
  .add('Dealer Tag', () => (
    <StoryWrapper p={15}>
      <Box type="primary" style={{ margin: '0px 100px' }}>
        <Text isTitle>Dealer Tag</Text>
        <DealerTag subText="Client One with Dealer Two">Bank name</DealerTag>
        <DealerTag>Simple Bank name</DealerTag>
        <DealerTag closeHandler={() => {}} subText="Client One with Dealer Two">Bank name</DealerTag>
        <DealerTag closeHandler={() => {}}>Simple Bank name</DealerTag>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
