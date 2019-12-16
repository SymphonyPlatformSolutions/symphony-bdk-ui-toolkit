# Base Chart

Its a auto resizable component that renders financial charts. Its based on
https://github.com/rrag/react-stockcharts.

This component is a wrapper and is meant to be used to compose charts.

###Requirements
<hr/>

This component, requires the installation of the following dependencies into your project:

```jsx
"dependencies": {
    "react-stockcharts": "^0.7.8",
    "d3-scale": "^3.2.1",
    "d3-time": "^1.1.0",
    "d3-shape": "^1.3.7",
    "d3-time-format": "^2.2.2",
    ...
}
``` 


##Implementation

To use this component, do like so:

```jsx
   return (<ChartContainer
      loading={loading}
      data={data}
      margin={margin}
      hasZoom={zoomConfig}
      tooltipContent={tooltipConfig}
      shownWindow={10}
      {...rest}
    >
      { ({width,
        height,
        ratio,
        gridCoordinates,
        data,
        zoomEnabled,
        hasEdgeIndicator,
        resetZoom,
        hasOHLCTooltip,}) => (
        .... my chart data e.g: <Chart ....
      )}
    </ChartContainer>)
```

As you may notice, there are several properties being passed on,
use them to properly build your chart.


##Sample

```jsx
import { useAutoFetch } from '../../../../utils/auto-fetch';
import { buildDateParser } from '../helpers';
import BaseChart from './index';
import { Chart } from 'react-stockcharts';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { AreaSeries } from 'react-stockcharts/lib/series';
import { createVerticalLinearGradient, hexToRGBA } from 'react-stockcharts/lib/utils';
import { curveMonotoneX } from 'd3-shape';
const timeParser = buildDateParser();

const parseData = parse => (d) => {
  d.date = parse(d.date);
  d.open = +d.open;
  d.high = +d.high;
  d.low = +d.low;
  d.close = +d.close;
  d.volume = +d.volume;

  return d;
};


const autoFetchConfig = {
  endpoint: 'http://localhost:3000/chart-candlestick-data',
  handleData: results => results.map(parseData(timeParser)),
};

const canvasGradient = createVerticalLinearGradient([
  { stop: 0, color: hexToRGBA('#b5d0ff', 0.2) },
  { stop: 0.7, color: hexToRGBA('#6fa4fc', 0.4) },
  { stop: 1, color: hexToRGBA('#4286f4', 0.8) },
]);


const Example = withTheme(({ theme }) => {
  const {
    results, isDataLoading, error, refreshData,
  } = useAutoFetch(autoFetchConfig);
  return (
    <Box type="flat" vertical>
      <Box style={{ width: '100%', height: 'calc(100vh - 240px)' }}>
        <BaseChart
          loading={isDataLoading}
          data={results}
          margin={{
            left: 30,
            right: 0,
            top: 30,
            bottom: 30,
          }}
          hasCrosshair
          title="Area chart"
        >
          {() => (
            <Chart id={0} yExtents={d => d.close}>
              	<defs>
                <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
                  <stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
                  <stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#4286f4" stopOpacity={0.8} />
                </linearGradient>
               </defs>
              <XAxis
                axisAt="bottom"
                orient="bottom"
                ticks={10}
                stroke={theme.colors.grey_400}
                tickStroke={theme.colors.grey_900}

              />
              <YAxis
                axisAt="left"
                orient="left"
                ticks={5}
                stroke={theme.colors.grey_400}
                tickStroke={theme.colors.grey_900}
              />
              <AreaSeries
                yAccessor={d => d.close}
                fill="url(#MyGradient)"
                strokeWidth={2}
                interpolation={curveMonotoneX}
                canvasGradient={canvasGradient}
              />
            </Chart>
          )}
        </BaseChart>
      </Box>
    </Box>
  );
});

```

##Proptypes

In Addition to the base Chart proptypes, there's also 
the ChartBuilder proptypes, which is a private helper within the BaseChart.
Bare in mind that all props are spread to it, so you can override any behaviour there.

```jsx
ChartContainer.defaultProps = {
  loading: false,
  margin: {
    left: 0,
    right: 50,
    top: 30,
    bottom: 30,
  },
};

ChartContainer.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  margin: PropTypes.shape({
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
    bottom: PropTypes.number,
  }),
};

ChartBuilder.defaultProps = {
  hasGrid: false,
  hasCrossHair: false,
  hasEdgeIndicator: false,
  tooltipContent: null,
  mouseMoveEvent: true,
  hasOHLCTooltip: false,
  hasZoom: {
    panEvent: false,
    enabled: false,
  },
  clampType: null,
  margin: {
    left: 0,
    right: 50,
    top: 30,
    bottom: 30,
  },
  title: null,
  shownWindow: 100,
};

ChartBuilder.propTypes = {
  hasGrid: PropTypes.bool,
  hasCrossHair: PropTypes.bool,
  hasEdgeIndicator: PropTypes.bool,
  tooltipContent: PropTypes.func,
  mouseMoveEvent: PropTypes.bool,
  hasOHLCTooltip: PropTypes.bool,
  hasZoom: PropTypes.shape({
    panEvent: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  clampType: PropTypes.oneOf([
    'mouseBasedZoomAnchor',
    'lastVisibleItemBasedZoomAnchor',
    'rightDomainBasedZoomAnchor',
    null,
  ]),
  margin: PropTypes.shape({
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
    bottom: PropTypes.number,
  }),
  shownWindow: PropTypes.number,
  title: PropTypes.string,
};
```
