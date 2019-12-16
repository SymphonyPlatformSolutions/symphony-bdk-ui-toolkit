import React, {
  useState,
} from 'react';
import { storiesOf } from '@storybook/react';

import CandleStickChart from './index';
import Box from '../../../base/box';
import Text from '../../../base/text';
import { StoryWrapper } from '../../../base/wrappers';
import Info from './info.md';
import { useAutoFetch } from '../../../../utils/auto-fetch';
import CheckBox from '../../../base/checkbox';
import Card from '../../../base/card/index';
import { buildDateParser } from '../helpers';

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


const Example = () => {
  const {
    results, isDataLoading, error, refreshData,
  } = useAutoFetch(autoFetchConfig);

  const [hasGrid, setHasGrid] = useState(true);
  const [hasCrossHair, setCrossHair] = useState(true);
  const [hasOHLCTooltip, setHLCTooltip] = useState(true);
  const [hasZoom, setZoom] = useState(true);
  const [hasEdgeIndicator, setEdgeIndicator] = useState(true);
  const [hasTooltip, setTooltip] = useState(true);


  return (
    <Box type="flat" vertical>
      <Card>
        <Box horizontal justify="space-between" align="center">
          <Box horizontal justify="flex-start" align="center" />
          <Box horizontal justify="flex-end" align="center">
            <Box type="flat">
              <CheckBox
                onChange={({ target: { checked } }) => setHasGrid(checked)}
                checked={hasGrid}
              >Grid
              </CheckBox>
            </Box>
            <Box type="flat">
              <CheckBox
                onChange={({ target: { checked } }) => setCrossHair(checked)}
                checked={hasCrossHair}
              >CrossHair
              </CheckBox>
            </Box>
            <Box type="flat">
              <CheckBox
                onChange={({ target: { checked } }) => setHLCTooltip(checked)}
                checked={hasOHLCTooltip}
              >OHLCTooltip
              </CheckBox>
            </Box>
            <Box type="flat">
              <CheckBox
                onChange={({ target: { checked } }) => setZoom(checked)}
                checked={hasZoom}
              >Zoom
              </CheckBox>
            </Box>
            <Box type="flat">
              <CheckBox
                onChange={({ target: { checked } }) => setEdgeIndicator(checked)}
                checked={hasEdgeIndicator}
              >Edge Indicator
              </CheckBox>
            </Box>
            <Box type="flat">
              <CheckBox
                onChange={({ target: { checked } }) => setTooltip(checked)}
                checked={hasTooltip}
              >Tooltip
              </CheckBox>
            </Box>
          </Box>
        </Box>
      </Card>
      <Box style={{ width: '100%', height: 'calc(100vh - 190px)' }}>
        <CandleStickChart
          tickSizeX={10}
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
    </Box>
  );
};

storiesOf('Financial/Charts', module)
  .add('Candlestick', () => (
    <StoryWrapper p={15}>
      <Box type="primary">
        <Text isTitle>Candlestick Chart</Text>
        <Box style={{ width: '100%', height: '100vh - 100px' }}>
          <Example />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
