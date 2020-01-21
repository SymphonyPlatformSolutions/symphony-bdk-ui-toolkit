import React, { useEffect, useState } from 'react';
import Faker from 'faker';
import DynamicTabs from '../index';
import Box from '../../box';
import Text from '../../../misc/text';
import Button from '../../../misc/button';
import Card from '../../card';
import CheckBox from '../../../inputs/checkbox';
import InputField from '../../../inputs/input-field';
import { AreaChartExample } from '../../../financial/charts/base-chart/stories';
import DiscontinousCandleStick from '../../../financial/charts/discontinous-candlestick';
import { useAutoFetch } from '../../../../utils/auto-fetch';
import { buildDateParser } from '../../../financial/charts/helpers';

const timeParser = buildDateParser();

const parseData = parse => d => {
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

const DiscontinousChart = () => {
  const { results, isDataLoading } = useAutoFetch(autoFetchConfig);
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
    body: <AreaChartExample offset={350} />,
  },
  {
    title: 'MSFT Intraday',
    body: <DiscontinousChart />,
  },
];

const getTabs = () => dynamicTabs.map((tab, index) => ({
  title: tab.title,
  getContent: () => tab.body,
  key: index,
}));

const ControlPanel = props => {
  const {
    responsiveBreakpoint,
    setResponsiveBreakpoint,
    activeTab,
    handleActiveTab,
    isResponsive,
    setIsResponsive,
    isWrappingTabs,
    setIsWrappingTabs,
    isShowingTabIndicator,
    setIsShowingTabIndicator,
    setAreTabsRemovable,
    areTabsRemovable,
    onAddElement,
  } = props;
  return (
    <Box align="end">
      <Card>
        <Box horizontal justify="space-evenly">
          <Box justify="space-evenly" style={{ paddingTop: '8px' }}>
            <Box horizontal>
              <InputField
                type="number"
                label="Responsive Breakpoint"
                placeholder="1400"
                value={responsiveBreakpoint}
                onChange={({ target }) => setResponsiveBreakpoint(parseInt(target.value, 10))}
              />
              <InputField
                type="number"
                label="Active Tabs"
                placeholder="0"
                value={activeTab}
                onChange={handleActiveTab}
              />
            </Box>
          </Box>
          <Box type="flat" justify="center" style={{ flexWrap: 'wrap', width: '270px', height: '75px' }}>
            <CheckBox
              onChange={() => setIsResponsive(!isResponsive)}
              checked={isResponsive}
            >
              Responsive
            </CheckBox>
            <CheckBox
              onChange={() => setIsWrappingTabs(!isWrappingTabs)}
              checked={isWrappingTabs}
            >
              WrapTabs
            </CheckBox>
            <CheckBox
              onChange={() => setIsShowingTabIndicator(!isShowingTabIndicator)}
              checked={isShowingTabIndicator}
            >
              Tab Indicator
            </CheckBox>
            <CheckBox
              onChange={() => setAreTabsRemovable(!areTabsRemovable)}
              checked={areTabsRemovable}
            >
              Removable Tabs
            </CheckBox>
          </Box>
          <Box justify="center">
            <Button onClick={onAddElement}>Add Item</Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export const DynamicTabsSample = () => {
  const [data, setData] = useState(getTabs());

  const [activeTab, setActiveTab] = useState(0);
  const [responsiveBreakpoint, setResponsiveBreakpoint] = useState(1400);
  const [isResponsive, setIsResponsive] = useState(false);
  const [isWrappingTabs, setIsWrappingTabs] = useState(true);
  const [isShowingTabIndicator, setIsShowingTabIndicator] = useState(false);
  const [areTabsRemovable, setAreTabsRemovable] = useState(true);

  const onAddElement = () => {
    dynamicTabs.push({ title: 'Example Tab', body: <ExampleTab /> });
    setData(getTabs());
  };

  const handleRemove = index => {
    dynamicTabs.splice(index, 1);
    setData(getTabs());
  };

  useEffect(() => {
    setData(getTabs());
  }, [
    activeTab,
    isResponsive,
    isWrappingTabs,
    isShowingTabIndicator,
    areTabsRemovable,
    responsiveBreakpoint,
  ]);

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
    <Box vertical space={30} style={{ width: '100%', padding: '0 30px' }}>
      <ControlPanel
        responsiveBreakpoint={responsiveBreakpoint}
        setResponsiveBreakpoint={setResponsiveBreakpoint}
        activeTab={activeTab}
        handleActiveTab={handleActiveTab}
        isResponsive={isResponsive}
        setIsResponsive={setIsResponsive}
        isWrappingTabs={isWrappingTabs}
        setIsWrappingTabs={setIsWrappingTabs}
        isShowingTabIndicator={isShowingTabIndicator}
        setIsShowingTabIndicator={setIsShowingTabIndicator}
        setAreTabsRemovable={setAreTabsRemovable}
        areTabsRemovable={areTabsRemovable}
        onAddElement={onAddElement}
      />
      <Box type="flat">
        <DynamicTabs
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
