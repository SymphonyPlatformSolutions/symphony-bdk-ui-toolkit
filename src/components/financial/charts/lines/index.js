import React, { useCallback } from 'react';
import { Chart } from 'react-stockcharts';
import PropTypes from 'prop-types';
import {
  LineSeries, ScatterSeries, CircleMarker,
} from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates';
import { withTheme } from 'styled-components';
import { Label } from 'react-stockcharts/lib/annotation';
import { darken } from 'polished';
import { buildDateFormat, buildNumberFormat } from '../helpers';
import ChartContainer from '../base-chart';
import { LineChartLegend } from '../components/line-legend';
import { ChartZoom } from '../components/chart-zoom';
import { THEME_TYPES } from '../../../..';

const zoomConfig = {
  panEvent: true,
  enabled: true,
};

const numberFormat = buildNumberFormat();
const dateFormat = buildDateFormat('%b %d, %Y');

const tooltipContentHelper = ({ currentItem, xAccessor }) => ({
  x: dateFormat(xAccessor(currentItem)),
  y: currentItem.prices.reduce((acc, price) => {
    acc.push({
      label: `${price.label}`,
      value: ' ',
    },
    {
      label: '  close',
      value: price.close && numberFormat(price.close),
    });
    return acc;
  }, [])
    .filter((line) => line.value),
});


const LineChart = ({
  loading, data, theme,
  hasTooltip, hasZoom, tickSizeY,
  lineColors, yAxisLabel, margin, ...rest
}) => {
  const yExtents = useCallback((d) => d.prices.reduce((acc, curr) => {
    acc.push(curr.close);
    return acc;
  }, []));
  zoomConfig.panEvent = hasZoom;
  zoomConfig.enabled = hasZoom;
  const tooltipConfig = hasTooltip ? tooltipContentHelper : null;
  const textColor = theme.mode === THEME_TYPES.DARK ? theme.colors.oldprimary_100 : darken(0.7, theme.colors.oldprimary_100);

  return (
    <ChartContainer
      loading={loading}
      data={data}
      margin={margin}
      hasZoom={zoomConfig}
      tooltipContent={tooltipConfig}
      shownWindow={10}
      {...rest}
    >
      {({
        gridCoordinates, zoomEnabled, resetZoom, height, fontFamily,
      }) => (
        <Chart
          id={1}
          yExtents={yExtents}
        >
          <XAxis
            axisAt="bottom"
            orient="bottom"
            fontFamily={fontFamily}
            stroke={theme.colors.primary_050}
            zoomEvent={zoomEnabled}
            {...gridCoordinates.xGrid}
            tickStroke={textColor}

          />
          <XAxis
            axisAt="top"
            orient="top"
            fontFamily={fontFamily}
            stroke={theme.colors.primary_050}
            zoomEvent={zoomEnabled}
            {...gridCoordinates.xGrid}
            tickStroke={textColor}

          />
          <YAxis
            axisAt="left"
            orient="left"
            fontFamily={fontFamily}
            stroke={theme.colors.primary_050}
            ticks={tickSizeY}
            zoomEvent={zoomEnabled}
            {...gridCoordinates.yGrid}
            tickStroke={textColor}
          />
          <YAxis
            axisAt="right"
            orient="right"
            fontFamily={fontFamily}
            stroke={theme.colors.primary_050}
            ticks={tickSizeY}
            zoomEvent={zoomEnabled}
            {...gridCoordinates.yGrid}
            tickStroke={textColor}
          />
          { yAxisLabel
          && (
          <Label
            x={gridCoordinates.width - margin.left - 40}
            y={(gridCoordinates.height - margin.bottom) * 0.5}
            fontFamily={fontFamily}
            fill={theme.colors.grey_900}
            rotate={-90}
            fontSize="12"
            text={yAxisLabel}
          />
          )}
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={dateFormat}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={numberFormat}
          />

          { lineColors.map((entry, i) => (
            <>
              <LineSeries
                highlightOnHover
                yAccessor={(d) => d.prices[i].close}
                stroke={entry}
                strokeWidth={3}
                strokeDasharray="Solid"
              />
              <ScatterSeries
                yAccessor={(d) => d.prices[i].close}
                marker={CircleMarker}
                markerProps={{ r: 3 }}
              />
            </>
          ))}
          { zoomEnabled && (<ChartZoom onReset={resetZoom} />) }
          <LineChartLegend
            fontFamily={fontFamily}
            containerHeight={height}
            margin={margin}
            lineColors={lineColors}
            data={data[0]}
          />
        </Chart>
      )}
    </ChartContainer>
  );
};

LineChart.defaultProps = {
  loading: false,
  hasTooltip: false,
  hasZoom: false,
  yAxisLabel: null,
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  tickSizeX: PropTypes.number.isRequired,
  tickSizeY: PropTypes.number.isRequired,
  lineColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasTooltip: PropTypes.bool,
  hasZoom: PropTypes.bool,
  loading: PropTypes.bool,
  yAxisLabel: PropTypes.string,
};

export default withTheme(LineChart);
