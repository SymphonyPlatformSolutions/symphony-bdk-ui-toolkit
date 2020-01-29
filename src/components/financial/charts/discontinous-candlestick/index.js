import React, {
  useCallback,
} from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { last } from 'react-stockcharts/lib/utils';
import {
  EdgeIndicator,
} from 'react-stockcharts/lib/coordinates';
import {
  OHLCTooltip,
} from 'react-stockcharts/lib/tooltip';

import { darken } from 'polished';
import { format } from 'd3-format';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import ChartContainer from '../base-chart';
import { tooltipContentHelper } from '../helpers';
import { ChartZoom } from '../components/chart-zoom';
import { THEME_TYPES } from '../../../..';

const zoomConfig = {
  panEvent: true,
  enabled: true,
};

const DiscontinousCandleStick = ({
  loading, data: results, theme,
  tickSizeX, yPadding, xPadding,
  tickSizeY, hasTooltip, shownWindow,
  hasZoom, ...rest
}) => {
  const yExtents = useCallback((d) => [(d.high + yPadding.top), (d.low - yPadding.bottom)]);
  zoomConfig.panEvent = hasZoom;
  zoomConfig.enabled = hasZoom;
  const tooltipConfig = hasTooltip ? tooltipContentHelper : null;

  const edgeColorRed = theme.colors.error_700;
  const edgeColorGreen = theme.colors.success_500;
  const candleBarFill = (d) => (d.close > d.open ? theme.colors.success_500 : theme.colors.misc_20);
  const textColor = theme.mode === THEME_TYPES.DARK ? theme.colors.oldprimary_100 : darken(0.7, theme.colors.oldprimary_100);

  const xScaleProvider = discontinuousTimeScaleProvider
    .inputDateAccessor((d) => d.date);
  const {
    data,
    xScale,
    xAccessor,
    displayXAccessor,
  } = xScaleProvider(results);


  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - shownWindow)]);
  const xExtents = [start, end];


  return (
    <ChartContainer
      loading={loading}
      xPadding={xPadding}
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
      displayXAccessor={displayXAccessor}
      data={data}
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
            showTicks={false}
            ticks={360}
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
            ticks={12}
            stroke={theme.colors.primary_050}
            zoomEnabled={zoomEnabled}
            {...gridCoordinates.xGrid}
            tickStroke={textColor}
          />
          <YAxis
            outerTickSize={10}
            axisAt="right"
            orient="right"
            tickFormat={format('.4s')}
            displayFormat={format('.4f')}
            fontFamily={fontFamily}
            ticks={20}
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
            ticks={10}
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
            displayFormat={format('.2f')}
            yAccessor={(d) => d.close}
            fill={(d) => (d.close > d.open ? edgeColorGreen : edgeColorRed)}
          />
          )}
          <CandlestickSeries
            opacity={1}
            wickStroke={theme.colors.grey_600}
            fill={candleBarFill}
          />
          { zoomEnabled && <ChartZoom onReset={resetZoom} /> }
        </Chart>
      )}
    </ChartContainer>
  );
};

DiscontinousCandleStick.defaultProps = {
  loading: false,
  hasTooltip: false,
  hasZoom: false,
  yPadding: { top: 2, bottom: 2 },
  xPadding: { right: 50, left: 0 },
  shownWindow: 150,
  children: [],
};

DiscontinousCandleStick.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node,
  theme: PropTypes.object.isRequired,
  tickSizeX: PropTypes.number.isRequired,
  tickSizeY: PropTypes.number.isRequired,
  hasTooltip: PropTypes.bool,
  hasZoom: PropTypes.bool,
  loading: PropTypes.bool,
  shownWindow: PropTypes.number,
  yPadding: PropTypes.object,
  xPadding: PropTypes.object,
};

export default withTheme(DiscontinousCandleStick);
