import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';

import { storiesOf } from '@storybook/react';

import CandleStickChart from './index';
import Box from '../../../base/box';
import Text from '../../../base/text';
import { StoryWrapper } from '../../../base/wrappers';
import Info from './info.md';
import { useAutoFetch } from '../../../../utils/auto-fetch';

const autoFetchConfig = {
  endpoint: 'http://localhost:3000/chart-data',
  handleData: results => results,
};

const Example = () => {
  const {
    results, isDataLoading, error, refreshData,
  } = useAutoFetch(autoFetchConfig);

  return <CandleStickChart loading={isDataLoading} data={results} />;
};


storiesOf('Financial/Charts', module)
  .add('Candlestick', () => (
    <StoryWrapper p={15}>
      <Box type="primary">
        <Text isTitle>Candlestick Chart</Text>
        <Box style={{ width: '100%', height: '600px' }}>
          <Example />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
