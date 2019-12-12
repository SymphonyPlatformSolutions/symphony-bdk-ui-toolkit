import React, { useCallback } from 'react';
import { Chart, ZoomButtons } from 'react-stockcharts';
import PropTypes from 'prop-types';
import {
  ScatterSeries,
  SquareMarker,
  TriangleMarker,
  CircleMarker,
  LineSeries,
} from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  MouseCoordinateX,
  MouseCoordinateY,
  EdgeIndicator,
} from 'react-stockcharts/lib/coordinates';
import {
  OHLCTooltip,
} from 'react-stockcharts/lib/tooltip';
import { numberFormat, dateFormat, tooltipContentHelper } from '../helpers';
import ChartContainer from '../components/base-chart';

const zoomConfig = {
  panEvent: true,
  enabled: true,
};

const LineChart = ({
  loading, data, theme, hasTooltip, hasZoom, ...rest
}) => {
  const yExtents = useCallback(d => [d.high, d.low, d.AAPLClose, d.GEClose]);
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
        gridCoordinates, zoomEnabled, hasEdgeIndicator, resetZoom,
      }) => (
        <Chart
          id={1}
          yExtents={yExtents}
        >
          <XAxis
            axisAt="bottom"
            orient="bottom"
            zoomEvent={zoomEnabled}
            {...gridCoordinates.xGrid}
          />
          <YAxis
            axisAt="right"
            orient="right"
            ticks={5}
            zoomEvent={zoomEnabled}
            {...gridCoordinates.yGrid}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={dateFormat('%Y-%m-%d')}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={numberFormat('.2f')}
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
          { hasEdgeIndicator
          && (
            <EdgeIndicator
              itemType="last"
              orient="right"
              edgeAt="right"
              yAccessor={d => d.close}
              fill={d => (d.close > d.open ? '#6BA583' : '#FF0000')}
            />
          )
          }
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
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  hasTooltip: PropTypes.bool,
  hasZoom: PropTypes.bool,
  loading: PropTypes.bool,
};

export default LineChart;
