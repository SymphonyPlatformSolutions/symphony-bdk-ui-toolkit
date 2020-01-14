import React from 'react';

import { storiesOf } from '@storybook/react';

import DealerTag from './index';
import Box from '../../layout/box';
import Text from '../../misc/text';
import { StoryWrapper } from '../../misc/wrappers';
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
