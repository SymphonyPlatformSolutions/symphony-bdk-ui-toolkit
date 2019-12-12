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

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.grey_100};
`;

const test = d => [d.high, d.low];

const ChartBuilder = ({
  data, width, height, ratio = 1,
}) => {
  const xAccessor = d => d.date;

  const xExtends = [
    xAccessor(last(data)),
    xAccessor(data[data.length - 100]),
  ];

  return (
    <ChartCanvas
      ratio={ratio}
      height={height}
      width={width}
      margin={{
        left: 50,
        right: 50,
        top: 10,
        bottom: 30,
      }}
      type="hybrid"
      seriesName="MSFT"
      data={data}
      xAccessor={xAccessor}
      xScale={scaleTime()}
      xExtents={xExtends}
    >
      <Chart id={1} yExtents={test}>
        <XAxis axisAt="bottom" orient="bottom" ticks={6} />
        <YAxis axisAt="left" orient="left" ticks={5} />
        <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
      </Chart>
      <CrossHairCursor />
    </ChartCanvas>
  );
};


const CandleStickChart = ({
  loading, data, ...rest
}) => {
  const mRef = useRef();
  const [size, setSize] = useState(null);

  const [setDimensions] = useDebouncedCallback(
    () => {
      if (mRef.current) {
        setSize({
          width: mRef.current.offsetWidth,
          height: mRef.current.offsetHeight,
        });
      }
    },
    // delay in ms
    100,
  );

  useEffect(() => {
    setDimensions();
    window.addEventListener('resize', setDimensions);
    return () => window.removeEventListener('resize', setDimensions);
  }, [mRef.current]);

  const Memoized = useMemo(() => {
    if (loading || !data || !data.length || !size) {
      return (
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      );
    }
    return (
      <ChartBuilder data={data} width={size.width} height={size.height} />
    );
  }, [data, loading, size, mRef]);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={mRef}>
      {Memoized}
    </div>
  );
};

export default CandleStickChart;

