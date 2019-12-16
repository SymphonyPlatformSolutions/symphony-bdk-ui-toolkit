import React from 'react';

import { storiesOf } from '@storybook/react';
import { withTheme } from 'styled-components';

import { Chart } from 'react-stockcharts';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { AreaSeries } from 'react-stockcharts/lib/series';
import { createVerticalLinearGradient, hexToRGBA } from 'react-stockcharts/lib/utils';
import { curveMonotoneX } from 'd3-shape';
import Box from '../../../base/box';
import Text from '../../../base/text';
import { StoryWrapper } from '../../../base/wrappers';
import Info from './info.md';
import { useAutoFetch } from '../../../../utils/auto-fetch';
import { buildDateParser } from '../helpers';
import BaseChart from './index';

const timeParser = buildDateParser();

const parseData = parse => (d) => {
  d.date = parse(d.date);
  d.open = +d.open;
  d.high = +d.high;
  d.low = +d.low;
  d.close = +d.close;
  d.volume = +d.volume;

  return d;
};


const autoFetchConfig = {
  endpoint: 'http://localhost:9999/chart-candlestick-data',
  handleData: results => results.map(parseData(timeParser)),
};

const canvasGradient = createVerticalLinearGradient([
  { stop: 0, color: hexToRGBA('#b5d0ff', 0.2) },
  { stop: 0.7, color: hexToRGBA('#6fa4fc', 0.4) },
  { stop: 1, color: hexToRGBA('#4286f4', 0.8) },
]);


const Example = withTheme(({ theme }) => {
  const {
    results, isDataLoading, error, refreshData,
  } = useAutoFetch(autoFetchConfig);
  return (
    <Box type="flat" vertical>
      <Box style={{ width: '100%', height: 'calc(100vh - 240px)' }}>
        <BaseChart
          loading={isDataLoading}
          data={results}
          margin={{
            left: 30,
            right: 0,
            top: 30,
            bottom: 30,
          }}
          hasCrosshair
          title="Area chart"
        >
          {() => (
            <Chart id={0} yExtents={d => d.close}>
              	<defs>
                <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
                  <stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
                  <stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#4286f4" stopOpacity={0.8} />
                </linearGradient>
               </defs>
              <XAxis
                axisAt="bottom"
                orient="bottom"
                ticks={10}
                stroke={theme.colors.grey_400}
                tickStroke={theme.colors.grey_900}

              />
              <YAxis
                axisAt="left"
                orient="left"
                ticks={5}
                stroke={theme.colors.grey_400}
                tickStroke={theme.colors.grey_900}
              />
              <AreaSeries
                yAccessor={d => d.close}
                fill="url(#MyGradient)"
                strokeWidth={2}
                interpolation={curveMonotoneX}
                canvasGradient={canvasGradient}
              />
            </Chart>
          )}
        </BaseChart>
      </Box>
    </Box>
  );
});

storiesOf('Financial/Charts', module)
  .add('Base Chart', () => (
    <StoryWrapper p={15}>
      <Box type="primary">
        <Text isTitle>Base Chart</Text>
        <Box vertical>
          <Text>
            This is an Wrapper of React stockcharts. it is meant to help you creating charts rapidly
            with no or very little friction.
            These are the charts supported:
          </Text>
          <ul>
            <Text><li>Area</li></Text>
            <Text><li>Line</li></Text>
            <Text><li>Candlestick</li></Text>
            <Text><li>and many more, see here: https://github.com/rrag/react-stockcharts</li></Text>
          </ul>
        </Box>
        <Box style={{ width: '100%', height: 'calc(100vh - 27a5px)' }}>
          <Example />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
