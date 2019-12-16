import React, {
  useState,
} from 'react';

import { storiesOf } from '@storybook/react';
import { withTheme } from 'styled-components';
import LineChart from './index';
import Box from '../../../base/box';
import Text from '../../../base/text';
import { StoryWrapper } from '../../../base/wrappers';
import Info from './info.md';
import { useAutoFetch } from '../../../../utils/auto-fetch';
import CheckBox from '../../../base/checkbox';
import Card from '../../../base/card/index';
import { sortByDateAscending } from '../../../../utils/helpers';
import { buildDateParser } from '../helpers';


const timeParser = buildDateParser('%b %d, %Y');

const parseData = parser => (d) => {
  d.date = parser(d.date);
  return d;
};

const autoFetchConfig = {
  endpoint: 'http://localhost:3000/chart-lines-data',
  handleData: results => results.map(parseData(timeParser)).sort(sortByDateAscending),
};


const Example = withTheme(({ theme }) => {
  const {
    results, isDataLoading, error, refreshData,
  } = useAutoFetch(autoFetchConfig);

  const [hasGrid, setHasGrid] = useState(true);
  const [hasCrossHair, setCrossHair] = useState(true);
  const [hasZoom, setZoom] = useState(true);
  const [hasTooltip, setTooltip] = useState(true);
  const lineColors = [
    '#990099',
    '#009900',
    '#009999',
    '#990000',
  ];

  return (
    <Box type="flat" vertical>
      <Card>
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
              onChange={({ target: { checked } }) => setZoom(checked)}
              checked={hasZoom}
            >Zoom
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
      </Card>
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
    </Box>
  );
});

storiesOf('Financial/Charts', module)
  .add('Lines', () => (
    <StoryWrapper p={15}>
      <Box type="primary">
        <Text isTitle>Line Series Chart</Text>
        <Box style={{ width: '100%', height: 'calc(100vh - 100px)' }}>
          <Example />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
