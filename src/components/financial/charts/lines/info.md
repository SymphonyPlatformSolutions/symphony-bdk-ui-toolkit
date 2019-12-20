# Candlestick Chart

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

```jsx****
[
  {
    "date": "Dec 13, 2019",
    "prices": [
      {
        "label": "2 YR",
        "high": 1.683,
        "low": 1.63,
        "close": 1.63
      },
      {
        "label": "5 YR",
        "high": 1.771,
        "low": 1.706,
        "close": 1.706
      },
      {
        "label": "10 YR",
        "high": 1.941,
        "low": 1.878,
        "close": 1.878
      },
      {
        "label": "30 YR",
        "high": 2.362,
        "low": 2.296,
        "close": 2.299
      }
    ]
  },
....
```

please note that data types here **matter**. Please make so that the dates are in that format
M d, Y and that the other properties are proper numbers, just like shown above.

<hr/>

Please also note that for every line series being displayed, you'll add one entry to the prices array.
in the above example, there will be 4 lines being drawn.


Sample:


```jsx　
const timeParser = buildDateParser('%b %d, %Y');

const parseData = parser => (d) => {
  d.date = parser(d.date);
  return d;
};

const autoFetchConfig = {
  endpoint: 'http://localhost:9999/chart-lines-data',
  handleData: results => results.map(parseData(timeParser)).sort(sortByDateAscending),
};


const Example = withTheme(({ theme }) => {
  const {
    results, isDataLoading, error, refreshData,
  } = useAutoFetch(autoFetchConfig);

  const lineColors = [
    '#990099',
    '#009900',
    '#009999',
    '#990000',
  ];

  return (
      <Box style={{ width: '100%', height: 'calc(100vh - 190px)' }}>
         <LineChart
          loading={isDataLoading}
          data={results}
          lineColors={lineColors}
          tickSizeX={5}
          tickSizeY={10}
          hasGrid={hasGrid}
          hasCrossHair={hasCrossHair}
          hasTooltip={hasTooltip}
          margin={{
            left: 1,
            right: 50,
            top: 30,
            bottom: 30,
          }}
          title="US Treasury Yield"
          hasZoom={hasZoom}
        />
      </Box>
  );
});

```

##Proptypes
```jsx
LineChart.defaultProps = {
  loading: false,
  hasTooltip: false,
  hasZoom: false,
  yAxisLabel: null,
  yPadding: { top: 1, bottom: 1 },
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  tickSizeX: PropTypes.number.isRequired,
  tickSizeY: PropTypes.number.isRequired,
  lineColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  yPadding: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
  }),
  hasTooltip: PropTypes.bool,
  hasZoom: PropTypes.bool,
  loading: PropTypes.bool,
  yAxisLabel: PropTypes.string,
};
```
