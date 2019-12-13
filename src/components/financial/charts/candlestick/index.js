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

import ChartContainer from '../base-chart';
import { tooltipContentHelper } from '../helpers';
import { THEME_TYPES } from '../../../..';

const zoomConfig = {
  panEvent: true,
  enabled: true,
};

const CandleStickChart = ({
  loading, data, theme,
  tickSizeX, tickSizeY, hasTooltip,
  hasZoom, ...rest
}) => {
  const yExtents = useCallback(d => [d.high, d.low]);
  zoomConfig.panEvent = hasZoom;
  zoomConfig.enabled = hasZoom;
  const tooltipConfig = hasTooltip ? tooltipContentHelper : null;

  const edgeColorRed = theme.mode === THEME_TYPES.DARK ? theme.colors.error_500 : theme.colors.error_700;
  const edgeColorGreen = theme.mode === THEME_TYPES.DARK ? theme.colors.success_500 : theme.colors.success_700;
  const candleBarFill = d => (d.close > d.open ? theme.colors.success_500 : theme.colors.misc_20);
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
            ticks={tickSizeX}
            stroke={theme.colors.grey_400}
            zoomEnabled={zoomEnabled}
            {...gridCoordinates.xGrid}
          />
          <XAxis
            axisAt="top"
            orient="top"
            ticks={tickSizeX}
            stroke={theme.colors.grey_400}
            zoomEnabled={zoomEnabled}
            {...gridCoordinates.xGrid}
          />
          <YAxis
            axisAt="right"
            orient="right"
            ticks={tickSizeY}
            stroke={theme.colors.grey_400}
            zoomEnabled={zoomEnabled}
            {...gridCoordinates.yGrid}
          />
          <YAxis
            showTicks={false}
            axisAt="left"
            orient="left"
            ticks={tickSizeY}
            stroke={theme.colors.grey_400}
            zoomEnabled={zoomEnabled}
            {...gridCoordinates.yGrid}
          />
          { hasOHLCTooltip && (
          <OHLCTooltip
            textFill={theme.colors.grey_700}
            forChart={1}
            fontSize={14}
            origin={[10, 15]}
          />
          )
          }
          { hasEdgeIndicator && (
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={d => d.close}
            fill={d => (d.close > d.open ? edgeColorGreen : edgeColorRed)}
          />
          )
          }
          <CandlestickSeries opacity={1} wickStroke={theme.colors.grey_600} fill={candleBarFill} width={timeIntervalBarWidth(utcDay)} />
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
  tickSizeX: PropTypes.number.isRequired,
  tickSizeY: PropTypes.number.isRequired,
  hasTooltip: PropTypes.bool,
  hasZoom: PropTypes.bool,
  loading: PropTypes.bool,
};

export default withTheme(CandleStickChart);
