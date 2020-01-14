#Dynamic Tabs
Dynamic Tabs component, able to handle multiple tabs.
 - Add tabs Dynamically
 - Remove tabs Dynamically
 - Rename tabs Dynamically

##Sample

```jsx　
const timeParser = buildDateParser();

const parseData = (parse) => (d) => {
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
  handleData: (results) => results.map(parseData(timeParser)),
};


const DiscontinousChart = () => {
  const {
    results, isDataLoading,
  } = useAutoFetch(autoFetchConfig);
  return (
    <Box style={{ width: '100%', height: 'calc(100vh - 350px)' }}>
      <DiscontinousCandleStick
        tickSizeX={5}
        tickSizeY={10}
        loading={isDataLoading}
        data={results}
        title="MFST Intraday"
        hasGrid
        hasOHLCTooltip
        hasTooltip
        hasZoom
        hasEdgeIndicator
      />
    </Box>
  );
};


const ExampleTab = () => (
  <Box horizontal style={{ height: '400px' }}>
    <Box>
      <Text title>This is a Sample Panel</Text>
      <Text>{Faker.lorem.paragraph()}</Text>
      <img alt="sample image" src={Faker.image.imageUrl(400, 400)} />
    </Box>
  </Box>
);


const dynamicTabs = [
  {
    title: 'MSFT Area chart',
    body: (<AreaChartExample offset={350} />),
  },
  {
    title: 'MSFT Intraday',
    body: (<DiscontinousChart />),
  },
];

const getTabs = () => dynamicTabs.map((tab, index) => ({
  title: tab.title,
  getContent: () => tab.body,
  key: index,
}));

const DynamicPanelSample = () => {
  const [data, setData] = useState(getTabs());

  const [activeTab, setActiveTab] = useState(0);
  const [responsiveBreakpoint, setResponsiveBreakpoint] = useState(1400);
  const [isResponsive, setIsResponsive] = useState(false);
  const [isWrappingTabs, setIsWrappingTabs] = useState(true);
  const [isShowingTabIndicator, setIsShowingTabIndicator] = useState(false);
  const [areTabsRemovable, setAreTabsRemovable] = useState(true);


  const onAddElement = () => {
    dynamicTabs.push(
      { title: 'Example Tab', body: (<ExampleTab />) },
    );
    setData(getTabs());
  };

  const handleRemove = (index) => {
    dynamicTabs.splice(index, 1);
    setData(getTabs());
  };

  useEffect(() => {
    setData(getTabs());
  }, [activeTab,
    isResponsive,
    isWrappingTabs,
    isShowingTabIndicator,
    areTabsRemovable,
    responsiveBreakpoint]);

  const handleActiveTab = ({ target }) => {
    const value = parseInt(target.value, 10);
    if (value <= 0) {
      setActiveTab(0);
    } else if (value >= data.length) {
      setActiveTab(data.length - 1);
    } else {
      setActiveTab(value);
    }
  };

  return (
    <Box vertical space={60}>
      <Box align="end">
        <Card>
          <Box horizontal justify="flex-end" align="center">
            <InputField
              type="number"
              label="Responsive Breakpoint"
              placeholder="1400"
              value={responsiveBreakpoint}
              onChange={({ target }) => setResponsiveBreakpoint(parseInt(target.value, 10))}
            />
            <InputField
              type="number"
              label="activeTabs"
              placeholder="0"
              value={activeTab}
              onChange={handleActiveTab}
            />
            <CheckBox
              onChange={() => setIsResponsive(!isResponsive)}
              checked={isResponsive}
            >Responsive
            </CheckBox>
            <CheckBox
              onChange={() => setIsWrappingTabs(!isWrappingTabs)}
              checked={isWrappingTabs}
            >WrapTabs
            </CheckBox>
            <CheckBox
              onChange={() => setIsShowingTabIndicator(!isShowingTabIndicator)}
              checked={isShowingTabIndicator}
            >TabIndicator
            </CheckBox>
            <CheckBox
              onChange={() => setAreTabsRemovable(!areTabsRemovable)}
              checked={areTabsRemovable}
            >Removable Tabs
            </CheckBox>

            <Box>
              <Button onClick={onAddElement}>Add Item</Button>
            </Box>
          </Box>
        </Card>
      </Box>
      <Box type="flat">
        <DynamicPanel
          tabs={data}
          onRemove={handleRemove}
          responsiveBreakpoint={responsiveBreakpoint}
          isResponsive={isResponsive}
          wrapTabs={isWrappingTabs}
          showSelectedTabIndicator={isShowingTabIndicator}
          tabsRemovable={areTabsRemovable}
          activeTab={activeTab}
        />
      </Box>
    </Box>
  );
};
```


##Proptypes
```jsx
DynamicPanel.propTypes = {
  theme: PropTypes.shape({
    mode: PropTypes.string,
    colors: arrayOf(PropTypes.object),
  }).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
    getContent: PropTypes.func,
    key: PropTypes.number,
  })),
  onRemove: PropTypes.func,
  isResponsive: PropTypes.bool,
  responsiveBreakpoint: PropTypes.number,
  wrapTabs: PropTypes.bool,
  showSelectedTabIndicator: PropTypes.bool,
  tabsRemovable: PropTypes.bool,
  activeTab: PropTypes.number,
};

DynamicPanel.defaultProps = {
  tabs: [],
  onRemove: NoOp,
  isResponsive: false,
  responsiveBreakpoint: 1400,
  wrapTabs: true,
  showSelectedTabIndicator: false,
  tabsRemovable: false,
  activeTab: 0,
};

```
