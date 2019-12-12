import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { timeParse } from 'd3-time-format';

import { storiesOf } from '@storybook/react';

import CandleStickChart from './index';
import Box from '../../../base/box';
import Text from '../../../base/text';
import { StoryWrapper } from '../../../base/wrappers';
import Info from './info.md';
import { useAutoFetch } from '../../../../utils/auto-fetch';

function parseData(parse) {
  return function (d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
}

const parseDate = timeParse('%Y-%m-%d');

const autoFetchConfig = {
  endpoint: 'http://localhost:3000/chart-data',
  handleData: results => results.map(parseData(parseDate)),
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
        <Box style={{ width: '100%', height: 'calc(100vh - 100px)' }}>
          <Example />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  }).add('Line ', () => (
    <StoryWrapper p={15}>
      <Box type="primary">
        <Text isTitle>Candlestick Chart</Text>
        <Box style={{ width: '100%', height: 'calc(100vh - 100px)' }}>
          <Example />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
