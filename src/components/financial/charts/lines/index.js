import React, { useCallback } from 'react';
import { Chart, ZoomButtons } from 'react-stockcharts';
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
import { buildDateFormat, buildNumberFormat } from '../helpers';
import ChartContainer from '../base-chart';

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
    }, {
      label: '  low',
      value: price.low && numberFormat(price.low),
    },
    {
      label: '  high',
      value: price.high && numberFormat(price.high),
    },
    {
      label: '  close',
      value: price.close && numberFormat(price.close),
    });
    return acc;
  }, [])
    .filter(line => line.value),
});


const LineChart = ({
  loading, data, theme,
  hasTooltip, hasZoom, tickSizeY,
  lineColors, yAxisLabel, margin, ...rest
}) => {
  const yExtents = useCallback(d => d.prices.reduce((acc, curr) => {
    acc.push(curr.close);
    return acc;
  }, []));
  zoomConfig.panEvent = hasZoom;
  zoomConfig.enabled = hasZoom;
  const tooltipConfig = hasTooltip ? tooltipContentHelper : null;

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
        gridCoordinates, zoomEnabled, resetZoom,
      }) => (
        <Chart
          id={1}
          yExtents={yExtents}
        >
          <XAxis
            axisAt="bottom"
            orient="bottom"
            stroke={theme.colors.grey_400}
            zoomEvent={zoomEnabled}
            {...gridCoordinates.xGrid}
          />
          <XAxis
            axisAt="top"
            orient="top"
            stroke={theme.colors.grey_400}
            zoomEvent={zoomEnabled}
            {...gridCoordinates.xGrid}
          />
          <YAxis
            axisAt="left"
            orient="left"
            stroke={theme.colors.grey_400}
            ticks={tickSizeY}
            zoomEvent={zoomEnabled}
            {...gridCoordinates.yGrid}
          />
          <YAxis
            axisAt="right"
            orient="right"
            stroke={theme.colors.grey_400}
            ticks={tickSizeY}
            zoomEvent={zoomEnabled}
            {...gridCoordinates.yGrid}
          />
          { yAxisLabel
          && (
          <Label
            x={gridCoordinates.width - margin.left - 40}
            y={(gridCoordinates.height - margin.bottom) * 0.5}
            fill={theme.colors.grey_900}
            rotate={-90}
            fontSize="12"
            text={yAxisLabel}
          />
          )
          }
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
            <React.Fragment>
              <LineSeries
                highlightOnHover={true}
                yAccessor={d => d.prices[i].close}
                stroke={entry}
                strokeDasharray="Solid"
              />
              <ScatterSeries
                yAccessor={d => d.prices[i].close}
                marker={CircleMarker}
                markerProps={{ r: 3 }}
              />
            </React.Fragment>
          ))}
          { zoomEnabled && (<ZoomButtons onReset={resetZoom} />) }
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
