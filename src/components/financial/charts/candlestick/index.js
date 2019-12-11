import React, {
  forwardRef,
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { scaleTime } from 'd3-scale';
import { utcDay } from 'd3-time';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last, timeIntervalBarWidth } from 'react-stockcharts/lib/utils';
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

const xAccessor = d => d.date;
const ChartBuilder = fitWidth(({
  data, width, ratio, height,
}) => {
  // const [chartData, setChartData] = useState([]);
  // const [xExtends, setXExtends] = useState();
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
      <Chart id={1} yExtents={d => [d.high, d.low]}>
        <XAxis axisAt="bottom" orient="bottom" ticks={6} />
        <YAxis axisAt="left" orient="left" ticks={5} />
        <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
      </Chart>
    </ChartCanvas>
  );
});


const CandleStickChart = ({
  loading, data, ...rest
}) => {
  const [height, setHeight] = useState(null);
  const container = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const Memoized = useMemo(() => {
    if (loading || !data || !data.length) {
      return (
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      );
    }
    return (<ChartBuilder data={data} height={height} />);
  }, [data, loading, height]);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={container}>
      {Memoized}
    </div>
  );
};

export default CandleStickChart;
