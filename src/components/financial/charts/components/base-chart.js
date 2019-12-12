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


const ChartBuilder = ({
  data, width, height, ratio = 1, hasGrid, children,
}) => {

  const [gridCoordinates, setGridCoordinates] = useState({ xGrid: {}, yGrid: {} });
  const xAccessor = d => d.date;

  const xExtends = [
    xAccessor(last(data)),
    xAccessor(data[data.length - 100]),
  ];

  useEffect(() => {
    if (hasGrid) {
      setGridCoordinates({
        xGrid: {
          innerTickSize: -1 * height,
          tickStrokeOpacity: 0.1,
        },
        yGrid: {
          innerTickSize: -1 * width,
          tickStrokeOpacity: 0.1,
        },
      });
    }
  }, [width, height]);

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
      {children({
        width, height, ratio, gridCoordinates, data,
      })}
    </ChartCanvas>
  );
};

ChartBuilder.defaultProps = {
  hasGrid: true,
};


const ChartContainer = ({
  loading, data, children, ...rest
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
      <ChartBuilder data={data} width={size.width} height={size.height}>
        {children}
      </ChartBuilder>
    );
  }, [data, loading, size, mRef, children]);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={mRef}>
      {Memoized}
    </div>
  );
};

export default ChartContainer;
