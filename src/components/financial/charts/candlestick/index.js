import React, {
  useCallback,
} from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { utcDay } from 'd3-time';
import { Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { last, timeIntervalBarWidth } from 'react-stockcharts/lib/utils';
import {
  EdgeIndicator,
} from 'react-stockcharts/lib/coordinates';
import {
  OHLCTooltip,
} from 'react-stockcharts/lib/tooltip';

import { darken } from 'polished';
import ChartContainer from '../base-chart';
import { tooltipContentHelper } from '../helpers';
import { ChartZoom } from '../components/chart-zoom';
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
  const yExtents = useCallback((d) => [d.high, d.low]);
  zoomConfig.panEvent = hasZoom;
  zoomConfig.enabled = hasZoom;
  const tooltipConfig = hasTooltip ? tooltipContentHelper : null;

  const edgeColorRed = theme.colors.error_700;
  const edgeColorGreen = theme.colors.success_500;
  const candleBarFill = (d) => (d.close > d.open ? theme.colors.success_500 : theme.colors.misc_20);
  const textColor = theme.mode === THEME_TYPES.DARK ? theme.colors.oldprimary_100 : darken(0.7, theme.colors.oldprimary_100);

  const xAccessor = useCallback((d) => (d ? d.date : {}));

  const xExtends = [
    xAccessor(last(data)),
    xAccessor(data[data.length]),
  ];

  return (
    <ChartContainer
      loading={loading}
      data={data}
      xAccessor={xAccessor}
      xExtends={xExtends}
      hasZoom={zoomConfig}
      tooltipContent={tooltipConfig}
      {...rest}
    >
      {({
        gridCoordinates, zoomEnabled, hasEdgeIndicator, resetZoom, hasOHLCTooltip, fontFamily,
      }) => (
        <Chart id={1} yExtents={yExtents}>
          <XAxis
            axisAt="bottom"
            orient="bottom"
            ticks={tickSizeX}
            fontFamily={fontFamily}
            stroke={theme.colors.primary_050}
            zoomEnabled={zoomEnabled}
            {...gridCoordinates.xGrid}
            tickStroke={textColor}
          />
          <XAxis
            axisAt="top"
            orient="top"
            fontFamily={fontFamily}
            ticks={tickSizeX}
            stroke={theme.colors.primary_050}
            zoomEnabled={zoomEnabled}
            {...gridCoordinates.xGrid}
            tickStroke={textColor}
          />
          <YAxis
            axisAt="right"
            orient="right"
            fontFamily={fontFamily}
            ticks={tickSizeY}
            stroke={theme.colors.primary_050}
            zoomEnabled={zoomEnabled}
            {...gridCoordinates.yGrid}
            tickStroke={textColor}
          />
          <YAxis
            showTicks={false}
            axisAt="left"
            orient="left"
            fontFamily={fontFamily}
            ticks={tickSizeY}
            stroke={theme.colors.primary_050}
            zoomEnabled={zoomEnabled}
            {...gridCoordinates.yGrid}
            tickStroke={textColor}
          />
          { hasOHLCTooltip && (
          <OHLCTooltip
            fontFamily={fontFamily}
            textFill={textColor}
            forChart={1}
            fontSize={14}
            origin={[10, 15]}
          />
          )}
          { hasEdgeIndicator && (
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            fontFamily={fontFamily}
            lineStroke={theme.colors.oldprimary_900}
            lineOpacity={0.8}
            rectWidth={55}
            arrowWidth={12}
            yAccessor={(d) => d.close}
            fill={(d) => (d.close > d.open ? edgeColorGreen : edgeColorRed)}
          />
          )}
          <CandlestickSeries
            opacity={1}
            wickStroke={theme.colors.grey_600}
            fill={candleBarFill}
            width={timeIntervalBarWidth(utcDay)}
          />
          { zoomEnabled && <ChartZoom onReset={resetZoom} /> }
        </Chart>
      )}
    </ChartContainer>
  );
};

CandleStickChart.defaultProps = {
  loading: false,
  hasTooltip: false,
  hasZoom: false,
  tickSizeY: null,
  children: [],
};

CandleStickChart.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node,
  theme: PropTypes.object.isRequired,
  tickSizeX: PropTypes.number.isRequired,
  tickSizeY: PropTypes.number,
  hasTooltip: PropTypes.bool,
  hasZoom: PropTypes.bool,
  loading: PropTypes.bool,
};

export default withTheme(CandleStickChart);
