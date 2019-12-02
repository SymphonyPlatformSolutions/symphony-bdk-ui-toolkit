import React, { useEffect, useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import styled, { keyframes, withTheme } from 'styled-components';
import { UpArrow } from 'styled-icons/boxicons-solid';
import Box from '../../base/box';
import { StoryWrapper } from '../../base/wrappers';
import Info from './info.md';
import Table from '../../base/table';
import Text from '../../base/text';
import SSEventsListWrapper from './index';
import CheckBox from '../../base/checkbox';
import { RestClient } from '../../../utils';
import { Card } from '../../index';
import Button from '../../base/button';
import MessageBox from '../../base/message-box';

const StyledArrow = styled(UpArrow)`
  transform: ${props => (props.increased ? '0' : 'rotate(180deg)')};
`;

const Animation = props => keyframes`
  0%, 100% {
    background-color: initial;
  }
  50% {
    background-color: ${props.bg};
  }
`;

{ /* <Box type="flat"> */ }
{ /*
{ /*    ) } */ }

const PriceAskCell = ({ value, original }) => {
  const arrowColor = original.increasedAsk ? '#10C820' : '#DD3638';
  const hasArrow = original.animating && value;
  return (
    <StyledAnimatedPrice type="ask" animating={original.animating}>{value}</StyledAnimatedPrice>
  );
};

const PriceBidCell = ({ value, original }) => {
  const arrowColor = original.increasedBid ? '#10C820' : '#DD3638';
  const hasArrow = original.animating && value;
  return (
    <StyledAnimatedPrice type="bid" animating={original.animating}>{value}</StyledAnimatedPrice>
  );
};

const StyledLink = styled.a.attrs(({ theme, animating }) => ({
  color: animating ? theme.colors.primary_800 : theme.colors.primary_200,
}))`
  color: ${props => props.color};
`;

const StyledAnimatedPrice = styled(Text).attrs(({ theme, type, animating }) => ({
  color: type === 'ask'
    ? animating
      ? theme.colors.misc_19
      : theme.colors.error_500
    : animating
      ? theme.colors.primary_800
      : theme.colors.primary_400,
}))`
  color: ${props => props.color};
`;

const getRenderTime = (time) => {
  const date = new Date(time);
  return `${date.getHours()}:${date.getMinutes()}`;
};

const StyledText = styled(Text).attrs(({ theme, animating }) => ({
  color: animating ? theme.colors.white : null,
}))`
  color: ${props => props.color} !important;
`;

const RegularRow = ({ value, original }) => useMemo(() => (
  <StyledText {...original}>{value}</StyledText>
), [original, value]);

const SSE_EVENTS_TABLE_COLUMNS = [
  {
    Header: 'Type',
    tooltip: 'Operation type',
    accessor: 'type',
    sortable: true,
    Cell: RegularRow,
    width: 80,
  },
  {
    Header: 'Asset Class',
    tooltip: 'Asset class being traded',
    accessor: 'asset',
    sortable: false,
    Cell: RegularRow,
    width: 120,
  },
  {
    Header: 'Product',
    tooltip: 'Product being traded',
    accessor: 'product',
    sortable: false,
    Cell: RegularRow,
    width: 150,
  },
  {
    Header: 'Size',
    accessor: 'bidSize',
    Cell: RegularRow,
    width: 80,
  },
  {
    Header: 'Bid',
    accessor: 'bid',
    Cell: PriceBidCell,
    sortable: false,
    width: 50,
  },
  {
    Header: 'Ask',
    accessor: 'ask',
    sortable: false,
    Cell: PriceAskCell,
    width: 80,
  },
  {
    Header: 'Size',
    tooltip: 'The amount of equity being traded at this ask price',
    accessor: 'askSize',
    Cell: RegularRow,
    width: 50,
  },
  {
    Header: '',
    tooltip: '',
    accessor: null,
    sortable: false,
    Cell: ({ original }) => {
      const arrowColor = original.increasedBid ? '#10C820' : '#DD3638';
      const hasArrow = original.animating;
      const increased = original.increasedAsk || original.increasedBid;
      return hasArrow && (
      <StyledArrow
        color={arrowColor}
        size={24}
        increased={increased}
      />
      );
    },
    width: 100,
  },
  {
    Header: 'Time',
    tooltip: 'last time updated',
    accessor: 'time',
    sortable: true,
    Cell: ({ value, original }) => useMemo(() => (
      <StyledText {...original}>{getRenderTime(value)}</StyledText>
    ), [value]),
    width: 80,

  },
  {
    Header: 'Dealer',
    tooltip: 'The contact',
    accessor: 'dealer',
    Cell: ({ original }) => useMemo(() => (original.dealer.link ? (
      <StyledLink animating={original.animating} href={original.dealer.link}>{original.dealer.name}</StyledLink>
    ) : (
      <StyledText {...original}>{original.dealer.name}</StyledText>
    )), [original]),
    sortable: true,
    width: 120,
  },
  {
    Header: 'Comment',
    tooltip: 'The person picture',
    accessor: 'comment',
    sortable: false,
    Cell: RegularRow,
  },
];

const autoFetchConfig = {
  endpoint: 'http://localhost:3000/financial-demo',
  params: {},
  handleData: results => results,
};

const StyledRow = styled.td.attrs(({ theme, increased, animating }) => ({
  bg: animating ? increased ? theme.colors.misc_18 : theme.colors.error_400 : 'initial',
}))`
  animation-iteration-count: 2;
  opacity: 0.8;
  width: 100%;
  background-color: ${props => props.bg};
  color: ${({ theme }) => theme.colors.grey_900};
`;

const postDemo = async (action, isAuto = null, interval = null) => {
  try {
    await RestClient.post('http://localhost:3000/financial-demo',
      { action, isAuto, interval },
      {},
      false);
  } catch (e) {
    console.error(e);
  }
};

const SSEEventsSample = ({
  data,
  loading,
  error,
  refreshData,
  theme,
  eventType,
}) => {
  const [tableData, setTableData] = useState(data);
  const [autoPilot, setAutoPilot] = useState(false);

  useEffect(() => {
    if (eventType === 'fetch') {
      setTableData(data);
    } else if (data && data.length && tableData && tableData.length > 0) {
      const newData = Array.from(data);

      newData.forEach((element) => {
        if (element.updated) {
          const mData = tableData.find(e => e.id === element.id);
          element.increasedAsk = mData.ask <= element.ask;
          element.increasedBid = mData.bid <= element.bid;

          if (!mData.animating) {
            element.animating = setTimeout(() => {
              setTableData((prevState) => {
                const index = prevState.findIndex(el => el.id === mData.id);
                if (index !== -1) {
                  const newState = Array.from(prevState);
                  newState[index].animating = null;
                  return newState;
                }
                return prevState;
              });
            }, 10000);
          }
        }
      });
      setTableData(Array.from(newData));
    } else {
      setTableData(Array.from(data));
    }
  }, [data]);

  const handleAutoPilot = async (e) => {
    const isChecked = e.target.checked;
    setAutoPilot(isChecked);
    postDemo('auto', isChecked);
  };

  const onRefresh = () => {
    setTableData([]);
    refreshData();
  };

  return (
    <Box type="flat" vertical>
      <Box>
        <MessageBox type="info">{`Last Message: ${eventType}`}</MessageBox>
      </Box>
      <Box align="end">
        <Card>
          <Box horizontal justify="space-between">
            <Box>
              <Button
                onClick={onRefresh}
              >
                Refresh
              </Button>
            </Box>
            <Box horizontal justify="flex-end">
              <Button
                disabled={autoPilot}
                onClick={() => postDemo('create')}
              >
                Add data
              </Button>
              <Button
                disabled={autoPilot || !tableData.length}
                onClick={() => postDemo('update')}
              >
                Update Data
              </Button>
              <Button
                disabled={autoPilot || !tableData.length}
                type="danger"
                onClick={() => postDemo('remove')}
              >
                Remove Data
              </Button>
              <CheckBox
                checked={autoPilot}
                onChange={handleAutoPilot}
              >
                Auto Pilot
              </CheckBox>
            </Box>
          </Box>
        </Card>
      </Box>
      <Box>
        <Table
          data={tableData}
          loading={loading}
          columns={SSE_EVENTS_TABLE_COLUMNS}
          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              const original = rowInfo.row._original;
              const increased = original.increasedAsk || original.increasedBid;
              return {
                style: {
                  height: '38px',
                  transition: 'background-color 0.5s cubic-bezier(1,.02,.41,.37)',
                  backgroundColor: original.animating ? increased ? theme.colors.misc_18 : theme.colors.error_400 : null,
                },
              };
            }
            return {};
          }
      }
        />
      </Box>
    </Box>
  );
};

const ThemedSample = withTheme(SSEEventsSample);

storiesOf('Helpers', module)
  .addDecorator(withKnobs)
  .add('SSE Events', () => (
    <StoryWrapper p={15}>
      <Text isTitle size="small">SSEventsListWrapper with table</Text>
      <Box p={15}>
        <Box vertical>
          <Text>This is an example implementation of SSEEventsListWrapper within a table</Text>
          <ul>
            <Text><li>The mock server sends an event every 2 seconds</li></Text>
            <Text><li>The events are always coming in this order: update, create, remove and then restart</li></Text>
          </ul>
        </Box>
        <SSEventsListWrapper
          sseEndpoint="http://localhost:3000/sse-events"
          autoFetchConfig={autoFetchConfig}
        >
          <ThemedSample />
        </SSEventsListWrapper>
      </Box>
    </StoryWrapper>
  ),
  {
    notes: {
      markdown: Info,
    },
  });
