import React, {
  useCallback,
} from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { utcDay } from 'd3-time';
import { Chart, ZoomButtons } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { timeIntervalBarWidth } from 'react-stockcharts/lib/utils';
import {
  EdgeIndicator,
} from 'react-stockcharts/lib/coordinates';
import {
  OHLCTooltip,
} from 'react-stockcharts/lib/tooltip';

import ChartContainer from '../components/base-chart';
import { tooltipContentHelper } from '../helpers';

const zoomConfig = {
  panEvent: true,
  enabled: true,
};

const CandleStickChart = ({
  loading, data, theme, hasTooltip, hasZoom, ...rest
}) => {
  const yExtents = useCallback(d => [d.high, d.low]);
  zoomConfig.panEvent = hasZoom;
  zoomConfig.enabled = hasZoom;
  const tooltipConfig = hasTooltip ? tooltipContentHelper : null;
  return (
    <ChartContainer
      loading={loading}
      data={data}
      hasZoom={zoomConfig}
      tooltipContent={tooltipConfig}
      {...rest}
    >
      {({
        gridCoordinates, zoomEnabled, hasEdgeIndicator, resetZoom, hasOHLCTooltip,
      }) => (
        <Chart id={1} yExtents={yExtents}>
          <XAxis
            axisAt="bottom"
            orient="bottom"
            ticks={6}
            zoomEnabled={zoomEnabled}
            {...gridCoordinates.xGrid}
          />
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            zoomEnabled={zoomEnabled}
            {...gridCoordinates.yGrid}
          />
          { hasOHLCTooltip && <OHLCTooltip forChart={1} origin={[-40, 0]} /> }
          { hasEdgeIndicator && (
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={d => d.close}
            fill={d => (d.close > d.open ? '#6BA583' : '#FF0000')}
          />
          )
          }
          <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
          { zoomEnabled && (<ZoomButtons onReset={resetZoom} />) }
        </Chart>
      )}
    </ChartContainer>
  );
};

CandleStickChart.defaultProps = {
  loading: false,
  hasTooltip: false,
  hasZoom: false,
};

CandleStickChart.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  hasTooltip: PropTypes.bool,
  hasZoom: PropTypes.bool,
  loading: PropTypes.bool,
};

export default withTheme(CandleStickChart);
