# Discontinous Candlestick Chart

Its a auto resizable component that renders financial charts. Its based on
https://github.com/rrag/react-stockcharts.

It utilizes the [base-chart](/story/financial-charts--base-chart) component.


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


##Data
In order to have this component working, a **contract** must be met, the data attribute 
is expecting a data structure following this:

```jsx
[
  {
    "date": "2010-01-04",
    "open": 25.436282332605284,
    "high": 25.835021381744056,
    "low": 25.411360259406774,
    "close": 25.710416,
    "volume": 38409100,
    "split": "",
    "dividend": ""
  },
....
```

please note that data types here **matter**. Please make so that the dates are in that format
Y-M-D and that the other properties are numbers, just like shown above.

Sample:



```jsx　
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
  endpoint: 'http://localhost:9999/chart-candlestick-data',
  handleData: results => results.map(parseData(timeParser)),
};


const Example = () => {
  const {
    results, isDataLoading, error, refreshData,
  } = useAutoFetch(autoFetchConfig);

  return (
    <Box style={{ width: '100%', height: 'calc(100vh - 190px)' }}>
       <DiscontinousCandlestick
          tickSizeX={5}
          tickSizeY={10}
          loading={isDataLoading}
          data={results}
          title="MFST"
          hasGrid={hasGrid}
          hasCrossHair={hasCrossHair}
          hasOHLCTooltip={hasOHLCTooltip}
          hasTooltip={hasTooltip}
          hasZoom={hasZoom}
          hasEdgeIndicator={hasEdgeIndicator}
        />
    </Box>
  );
};
```

##Proptypes
```jsx
DiscontinousCandleStick.defaultProps = {
  loading: false,
  hasTooltip: false,
  hasZoom: false,
  yPadding: { top: 2, bottom: 2 },
  xPadding: { right: 50, left: 0 },
  shownWindow: 150,
};

DiscontinousCandleStick.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
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
```
