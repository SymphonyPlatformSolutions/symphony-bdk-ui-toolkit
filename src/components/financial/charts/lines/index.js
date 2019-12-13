import React, { useCallback, useEffect, useState } from 'react';
import { Chart, ZoomButtons } from 'react-stockcharts';
import PropTypes from 'prop-types';
import {
  LineSeries,
} from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates';
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
  loading, data, theme, hasTooltip, hasZoom, ...rest
}) => {
  const [lines, setNumberOfLines] = useState([]);

  const yExtents = useCallback(d => d.prices.reduce((acc, curr) => {
    acc.push(curr.close);
    return acc;
  }, []));
  zoomConfig.panEvent = hasZoom;
  zoomConfig.enabled = hasZoom;
  const tooltipConfig = hasTooltip ? tooltipContentHelper : null;

  useEffect(() => {
    if (data.length) {
      setNumberOfLines(Array(data[0].prices.length).fill(null));
    }
  }, [data]);


  return (
    <ChartContainer
      loading={loading}
      data={data}
      hasZoom={zoomConfig}
      tooltipContent={tooltipConfig}
      shownWindow={10}
      {...rest}
    >
      {({
        gridCoordinates, zoomEnabled, resetZoom,
      }) => (
        <Chart
          fill="0000"
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
            displayFormat={dateFormat}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={numberFormat}
          />

          { lines.map((entry, i) => (
            <React.Fragment>
              <LineSeries
                yAccessor={d => d.prices[i].close}
                stroke="#ff7f0e"
                strokeDasharray="Solid"
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
