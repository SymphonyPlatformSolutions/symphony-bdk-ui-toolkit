import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { scaleTime } from 'd3-scale';
import { utcDay } from 'd3-time';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitDimensions } from 'react-stockcharts/lib/helper';
import { last, timeIntervalBarWidth } from 'react-stockcharts/lib/utils';
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates';
import { useDebouncedCallback } from 'use-debounce';
import Loader from '../../../base/loader';
import ChartContainer from '../components/base-chart';

const test = d => [d.high, d.low];

const CandleStickChart = ({
  loading, data, ...rest
}) => (
  <ChartContainer loading={loading} data={data}>
    {({ gridCoordinates }) => (
      <Chart id={1} yExtents={test}>
        <XAxis
          axisAt="bottom"
          orient="bottom"
          ticks={6}
          {...gridCoordinates.xGrid}
        />
        <YAxis
          axisAt="left"
          orient="left"
          ticks={5}
          {...gridCoordinates.yGrid}
        />
        <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
        <CrossHairCursor />
      </Chart>
    )}
  </ChartContainer>
);

export default CandleStickChart;
