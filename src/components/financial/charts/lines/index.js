import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { format } from 'd3-format';

import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { scaleTime } from 'd3-scale';
import { utcDay } from 'd3-time';

import { ChartCanvas, Chart } from 'react-stockcharts';
import {
  CandlestickSeries,
  ScatterSeries,
  SquareMarker,
  TriangleMarker,
  CircleMarker,
  LineSeries,
} from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitDimensions } from 'react-stockcharts/lib/helper';
import { last, timeIntervalBarWidth } from 'react-stockcharts/lib/utils';
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates';
import { useDebouncedCallback } from 'use-debounce';
import { timeFormat } from 'd3-time-format';
import {
  OHLCTooltip,
} from 'react-stockcharts/lib/tooltip';
import Loader from '../../../base/loader';
import ChartContainer from '../components/base-chart';

const test = d => [d.high, d.low];

const LineChart = ({
  loading, data, ...rest
}) => {

  return (
    <ChartContainer loading={loading} data={data}>
      {({gridCoordinates}) => (
        <Chart
          id={1}
          yExtents={d => [d.high, d.low, d.AAPLClose, d.GEClose]}
        >
          <XAxis
            axisAt="bottom"
            orient="bottom"
            {...gridCoordinates.xGrid}
          />
          <YAxis
            axisAt="right"
            orient="right"
            ticks={5}
            {...gridCoordinates.yGrid}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat('%Y-%m-%d')}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format('.2f')}
          />

          <LineSeries
            yAccessor={d => d.AAPLClose}
            stroke="#ff7f0e"
            strokeDasharray="Dot"
          />
          <ScatterSeries
            yAccessor={d => d.AAPLClose}
            marker={SquareMarker}
            markerProps={{ width: 6, stroke: '#ff7f0e', fill: '#ff7f0e' }}
          />
          <LineSeries
            yAccessor={d => d.GEClose}
            stroke="#2ca02c"
          />
          <ScatterSeries
            yAccessor={d => d.GEClose}
            marker={TriangleMarker}
            markerProps={{ width: 8, stroke: '#2ca02c', fill: '#2ca02c' }}
          />
          <LineSeries
            yAccessor={d => d.close}
            strokeDasharray="LongDash"
          />
          <ScatterSeries
            yAccessor={d => d.close}
            marker={CircleMarker}
            markerProps={{ r: 3 }}
          />
          <OHLCTooltip forChart={1} origin={[-40, 0]} />
          <CrossHairCursor />
        </Chart>
      )}
    </ChartContainer>
  );
};

LineChart.defaultProps = {
  hasGrid: true,
};


export default LineChart;
