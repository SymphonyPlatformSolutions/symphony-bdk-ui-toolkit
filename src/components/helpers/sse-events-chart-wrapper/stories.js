import React, { useEffect, useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withTheme } from 'styled-components';
import Box from '../../base/box';
import { StoryWrapper } from '../../base/wrappers';
import Info from './info.md';
import Text from '../../base/text';
import SSEventsListWrapper from './index';
import { RestClient } from '../../../utils';
import { Card } from '../../index';
import Button from '../../base/button';
import MessageBox from '../../base/message-box';
import Toggle from '../../base/toggle';
import { buildDateParser } from '../../financial/charts/helpers';
import CandleStickChart from '../../financial/charts/candlestick';

const timeParser = buildDateParser('%Y-%m-%d');

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
  endpoint: 'http://localhost:9999/intraday-chart-demo',
  params: {},
  handleData: (results) => results.map(parseData(timeParser)),
};

const postDemo = async (action, isAuto = null, interval = null) => {
  try {
    await RestClient.post(
      'http://localhost:9999/intraday-chart-demo',
      { action, isAuto, interval },
      {},
      false,
    );
  } catch (e) {
    console.error(e);
  }
};

const SSEEventsIntradayChartSample = ({
  data, loading, refreshData, eventType,
}) => {
  const [chartData, setChartData] = useState(data);
  const [autoPilot, setAutoPilot] = useState(false);

  useEffect(() => {
    if (eventType === 'fetch') {
      setChartData(data);
    } else {
      setChartData(Array.from(data));
    }
  }, [data]);

  const handleAutoPilot = async (toggled) => {
    setAutoPilot(toggled);
    postDemo('auto', toggled);
  };

  const onRefresh = () => {
    setChartData([]);
    refreshData();
  };

  const ChartRenderer = useMemo(() => (
    <CandleStickChart
      tickSizeX={5}
      tickSizeY={10}
      loading={loading}
      data={data}
      title="MSFT"
      chartMarginY={2}
      hasGrid
      hasCrossHair
      hasOHLCTooltip
      hasTooltip
      hasZoom
      hasEdgeIndicator
    />
  ), [chartData, loading]);


  return useMemo(() => (
    <Box type="flat" vertical>
      <Box>
        <MessageBox type="info">{`Last Message: ${eventType}`}</MessageBox>
      </Box>
      <Box align="end">
        <Card>
          <Box horizontal justify="space-between" align="center">
            <Box>
              <Button onClick={onRefresh}>Refresh</Button>
            </Box>
            <Box horizontal justify="flex-end" align="center">
              <Button disabled={autoPilot} onClick={() => postDemo('create')}>
                    Add data
              </Button>
              <Button
                disabled={autoPilot || !chartData.length}
                onClick={() => postDemo('update')}
              >
                    Update Data
              </Button>
              <Box vertical align="center" type="flat">
                <Text>Auto Pilot</Text>
                <Toggle toggled={autoPilot} onChange={handleAutoPilot} />
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
      <div style={{ width: '100%', height: 'calc(100vh - 150px)' }}>
        {ChartRenderer}
      </div>
    </Box>
  ), [autoPilot, chartData, loading]);
};

const ThemedSample = withTheme(SSEEventsIntradayChartSample);

storiesOf('Helpers', module)
  .addDecorator(withKnobs)
  .add(
    'SSE Intraday Chart',
    () => (
      <Box style={{ margin: '20px 20px 0px 20px' }}>
        <SSEventsListWrapper
          style={{ height: '100%' }}
          sseEndpoint="http://localhost:9999/sse-chart-events"
          autoFetchConfig={autoFetchConfig}
        >
          <ThemedSample />
        </SSEventsListWrapper>
      </Box>
    ),
    {
      notes: {
        markdown: Info,
      },
    },
  );
